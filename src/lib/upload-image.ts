import { v2 as cloudinary } from "cloudinary";
import { Buffer } from "buffer";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (image: File) => {
    let imagePath = "";
    if (image && image.size > 0) {
        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult: any = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        tags: ["ideahub-upload"],
                        upload_preset: "ideahub",
                    },
                    function (error, result) {
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve(result);
                    },
                )
                .end(buffer);
        });

        imagePath = uploadResult.secure_url;
    }
    return imagePath;
};
