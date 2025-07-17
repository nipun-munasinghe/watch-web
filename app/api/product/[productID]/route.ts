import cloudinary from "@/utils/cloudinary";
import { connectDB } from "../../db/connectDB";
import Product from "../../models/product.model";

export async function GET(request: Request, {params}: {params: Promise<{productId: string}>}
) {
    await connectDB();
    const { productId } = await params;

    try {
        const product = await Product.findById(productId);
        if(!product) {
            return Response.json({message: "Product not found"}, {status: 404});
        }

        return Response.json({product}, {status: 200});
    } catch (error: any) {
        return Response.json({message: error.message}, {status: 500});
    }
}

export async function DELETE(request: Request, {params}: {params: Promise<{productId: string}>}
) {
    await connectDB();
    const productId = (await params).productId;

    try {
        const product = await Product.findById(productId);
        if(!product) {
            return Response.json({message: "Product not found"}, {status: 404});
        }

        //first, delete the image in cloudinary
        const parts = product.image.split('/');
        const fileName = parts[parts.length - 1];
        const imageId = fileName.split('.')[0];
        
        cloudinary.uploader.destroy(`watch-web/${imageId}`).then((result) => console.log("Result: ", result));

        //then delete the product from the database
        await Product.findByIdAndDelete(productId);

        return Response.json({message: "Product deleted successfully"}, {status: 200});
    } catch (error: any) {
        return Response.json({message: error.message}, {status: 500});
    }
}