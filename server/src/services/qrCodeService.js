const qr = require("qr-image");

exports.generateQRCode = (link) => {
    return qr.imageSync(link, { type: "png" });
};
