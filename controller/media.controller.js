import fs from 'fs';
import {v2 as cloundinary} from "cloudinary";


cloundinary.config({
    secure: true,
    api_key: process.env.CLOUNDINARY_API_KEY,
    api_secret: process.env.CLOUNDINARY_API_SECRET,
    cloud_name: process.env.CLOUNDINARY_CLOUD_NAME,


})
export const uploadImageController = async (req, res, next) => {
    const imagePath= req.filePath;
    const options = {
        user_filename: true,
        unique_filename: false,
        overwrite: true,
    }
    try{
        const result = await cloundinary.uploader.upload(imagePath, options);
        console.log(result)
    }catch(err){
        console.error(err)
    }
   return res.json({})
}