"use server";

import { connectDB } from "@/app/api/db/connectDB";
import { error } from "console";

export async function addAction(formData: FormData) {
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
    } catch (error) {
        
    }
}