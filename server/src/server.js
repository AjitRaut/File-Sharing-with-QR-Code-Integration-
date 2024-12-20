const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileRoutes = require("./routes/fileroutes");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/files", fileRoutes);

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
