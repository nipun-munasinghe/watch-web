import { addAction } from '@/utils/addAction'
import { useRouter } from 'next/router';
import React from 'react'
import toast from 'react-hot-toast';

const AddForm = () => {
    const router = useRouter();
    async function clientAddAction(formData: FormData) {
        const result = await addAction(formData);

        if(result?.error) {
            // Toast error notification
            toast.error(result.error);
        }

        if(result?.success) {
            // Toast success notification
            toast.success(result.success);

            router.push('/'); // Redirect to home page
        }
    }
  return (
    <form action={clientAddAction} className='w-full max-w-xl mx-auto flex flex-col justify-center items-center space-y-4 mt-3 md:mt-5'>
        <div className='flex flex-col w-full'>
            <label>Product Image: </label>
            <input type="file" accept='image/*' name='image' 
                className='w-full py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500' />
        </div>
        <div className='flex flex-col w-full'>
            <label>Name: </label>
            <input type="text" placeholder='Enter the product name' name='name'
                className='w-full py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500' />
        </div>
        <div className='flex flex-col w-full'>
            <label>Price: </label>
            <input type="number" placeholder='Enter the product price' name='price'
                className='w-full py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500' />
        </div>
        <div className='flex flex-col w-full'>
            <label>Seller's Link: </label>
            <input type="text" placeholder='Link to where buyers can find you' name='link'
                className='w-full py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500' />
        </div>
        <div className='flex flex-col w-full'>
            <label>Description: </label>
            <textarea placeholder='Enter the product description' name='description' rows={4}
                className='w-full py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500'></textarea>
        </div>

        <button type='submit' className='w-full bg-[#212529] rounded-md text-white py-2 px-3 cursor-pointer'>Add Product</button>
    </form>
  )
}

export default AddForm