const multer = require("multer");
const path = require("path");

module.exports.storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public"));
  },
  filename: function (req, file, cb) {
    cb(null, `/image/uploaded_files/${Date.now()}-${file.originalname}`);
  },
});
