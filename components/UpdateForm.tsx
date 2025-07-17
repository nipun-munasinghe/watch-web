"use client";

import { updateAction } from '@/utils/updateAction';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

interface Product {
  image: string;
  _id: string;
  name: string;
  price: number;
  link: string;
  description: string;
}

const UpdateForm = ({productId}: {productId: string}) => {
    const router = useRouter();
    const [imageURL, setImageURL] = useState('');
    const [product, setProduct] = useState<Product>();

    useEffect(() => {
        axios
        .get(`/api/product/${productId}`)
        .then((response) => setProduct(response.data.product));
    }, []);

    useEffect(() => {
        if(product) {
            setImageURL(product.image); // Set the initial image URL for preview
        }
    }, [product]);

    async function clientAddAction(formData: FormData) {
        const result = await updateAction(formData, productId);

        if(result?.error) {
            // Toast error notification
            toast.error(result.error);
        }

        if(result?.success) {
            // Toast success notification
            toast.success(result.success);

            router.push('/'); // Redirect to home page
            setImageURL(''); // Clear the image URL
        }
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file) {
            const fileSize = file.size; // Convert to MB
            if(Math.round(fileSize / 1024) > 1024 ) {
                toast.error('Image size should not exceed 1MB');
                e.target.value = ''; // Clear the input
            } else {
                setImageURL(URL.createObjectURL(file)); // Set the image URL for preview
            }
        }
    }
  return (
    <form action={clientAddAction} className='w-full max-w-xl mx-auto flex flex-col justify-center items-center space-y-4 mt-3 md:mt-5'>
        {imageURL && (<Image src={imageURL} alt="img" width={1000} height={1000} 
            className="max-w-full max-h-72 object-cover object-center rounded-lg" />
        )}
        <div className='flex flex-col w-full'>
            <label>Product Image: </label>
            <input type="file" accept='image/*' name='image' onChange={handleImageChange}
                className='w-full py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500' />
        </div>
        <div className='flex flex-col w-full'>
            <label>Name: </label>
            <input type="text" placeholder='Enter the product name' name='name' defaultValue={product?.name}
                className='w-full py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500' />
        </div>
        <div className='flex flex-col w-full'>
            <label>Price: </label>
            <input type="number" placeholder='Enter the product price' name='price' defaultValue={product?.price}
                className='w-full py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500' />
        </div>
        <div className='flex flex-col w-full'>
            <label>Seller's Link: </label>
            <input type="text" placeholder='Link to where buyers can find you' name='link' defaultValue={product?.link}
                className='w-full py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500' />
        </div>
        <div className='flex flex-col w-full'>
            <label>Description: </label>
            <textarea placeholder='Enter the product description' name='description' rows={4} defaultValue={product?.description}
                className='w-full py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500'></textarea>
        </div>

        <button type='submit' className='w-full bg-[#212529] rounded-md text-white py-2 px-3 cursor-pointer'>Update Product</button>
    </form>
  )
}

export default UpdateForm