import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { uploadImage } from "../utils/upload.js";

cloudinary.config({
  secure: true,
  api_key: process.env.CLOUNDINARY_API_KEY,
  api_secret: process.env.CLOUNDINARY_API_SECRET,
  cloud_name: process.env.CLOUNDINARY_CLOUD_NAME,
});
export const uploadImageController = async (req, res, next) => {
  const fileName = req.files;
  const filePaths = fileName.map((fileName) => fileName.path);
  console.log("filepath",filePaths)
  const result = await Promise.all(
    filePaths.map((filePaths) =>  uploadImage(filePaths))
  );
  console.log("result",result);
  const image = result.map((item) => item.secure_url);
  filePaths.forEach((filePath) => fs.unlinkSync(filePath));
  return res.json({
    message: 'Image uploaded successfully',
    result: 
        image
  });
};
