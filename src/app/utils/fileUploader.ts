import multer from 'multer';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import config from '../../config';
import fs from 'fs';


const uploadPath = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const uploadToCloudinary = async (file: Express.Multer.File) => {
    cloudinary.config({
        cloud_name: config.cloudinary.cloudName!,
        api_key: config.cloudinary.apiKey!,
        api_secret: config.cloudinary.apiSecret!
    });

    try {
        const fileNameWithoutExt = path.parse(file.filename).name;
        const uploadResult = await cloudinary.uploader
            .upload(
                file.path, {
                public_id: fileNameWithoutExt,
                folder: "M30BACKEND"
            })

        if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }

        console.log("Cloudinary Upload successful.. ")

        return uploadResult
    } catch (error) {
        console.log("Cloudinary Upload Error: ", error)
        return null;
    }
}

export const fileUploader = {
    upload,
    uploadToCloudinary
}