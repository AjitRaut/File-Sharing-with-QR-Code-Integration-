const multer = require("multer");
const QRCode = require("qrcode");
const jwt = require("jsonwebtoken");
const File = require("../models/File");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

exports.uploadFile = [
  upload.single("file"),
  async (req, res) => {
    try {
      const { filename } = req.file;
      const { recipientEmail } = req.body;
      const expiration = new Date(Date.now() + 24 * 60 * 60 * 1000);

      const token = jwt.sign({ filename }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      const url = `http://localhost:5000/files/download/${token}`;

      const file = new File({ filename, url, expiration, recipientEmail });
      await file.save();

      const qrCode = await QRCode.toDataURL(url);

      res
        .status(200)
        .json({ url, qrCode, message: "File uploaded successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to upload file" });
    }
  },
];

exports.downloadFile = async (req, res) => {
  const { token } = req.params;
  try {
    const { filename } = jwt.verify(token, process.env.JWT_SECRET);

    const file = await File.findOne({ filename });
    if (!file) return res.status(404).json({ message: "File not found" });
    if (new Date() > file.expiration) {
      await file.deleteOne();
      return res.status(400).json({ message: "Link expired" });
    }

    res.download(`uploads/${filename}`);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid token" });
  }
};
