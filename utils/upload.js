import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("upload/image"));
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + "-" + file.originalname;
    const filePath = path.resolve(`upload/image/${fileName}`);
    req.filePath = filePath;
    cb(null, fileName);
  },
});

export const upload = multer({ storage: storage });
