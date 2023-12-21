import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("upload/image"));
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + "-" + file.originalname;
    const filePath = path.resolve(`upload/image/${fileName}`);
    console.log(filePath);
    req.filePath = filePath;
    cb(null, fileName);
  },
});

export const upload = multer({ storage: storage });

export const uploadImage = async (imagePath) => {
  const options = {
    user_filename: true,
    unique_filename: false,
    overwrite: true,
  };
  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result;
  } catch (err) {
    console.error(err);
  }
}
