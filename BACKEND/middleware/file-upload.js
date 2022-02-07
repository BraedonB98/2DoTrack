const multer = require("multer");
const { v1: uuid } = require("uuid");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/svg": "svg",
};

const fileUpload = multer({
  limit: 500000, //500kb max file size
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "/data/uploads/images");
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuid() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid mime type"); //if valid then no error else error= invalid mime type
    cb(error, isValid);
  },
});

module.exports = fileUpload;
