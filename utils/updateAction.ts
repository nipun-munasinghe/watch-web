"use server";

import { connectDB } from "@/app/api/db/connectDB";
import cloudinary from "./cloudinary";
import Product from "@/app/api/models/product.model";

export async function updateAction(formData: FormData, id: string) {
    try {
        const image = formData.get('image') as File;
        const name = formData.get('name') as string;
        const price = formData.get('price') as string;
        const link = formData.get('link') as string;
        const description = formData.get('description') as string;

        if(!image || !name || !price || !link || !description) {
            console.error("All fields are required");

            return {
                error: "All fields are required"
            };
        }

        await connectDB();

        const product = await Product.findById(id);

        if (!product) {
            return {
                error: "Product not found"
            };
        }

        if(image.size === 0) {
          //update without changing the image
          await Product.findByIdAndUpdate(id, {
            name,
            price,
            link,
            description,
          });

          return {
            success: "Product updated successfully",
          };
        } else {
          // delete the old image first from cloudinary
          const parts = product.image.split('/');
          const fileName = parts[parts.length - 1];
          const imageId = fileName.split('.')[0];

          cloudinary.uploader.destroy(`watch-web/${imageId}`).then((result) => console.log("Result: ", result));

          //Image processes
          const arrayBuffer = await image.arrayBuffer();
          const buffer = new Uint8Array(arrayBuffer);
          const imageResponse: any = await new Promise((resolve, reject) => {
            cloudinary.uploader
              .upload_stream(
                {
                  resource_type: "auto",
                  folder: "watch-web",
                },
                async (error, result) => {
                  if (error) {
                    return reject(error.message);
                  }
                  return resolve(result);
                }
              )
              .end(buffer);
          });
          console.log("Image response: ", imageResponse);

          //Store in DB
          await Product.findByIdAndUpdate(id, {
              image: imageResponse.secure_url,
              name,
              price,
              link,
              description,
          });

          return {
              success: "Product updated successfully",
          };
        }
    } catch (error) {
        error: "Something went wrong!";
    }
}