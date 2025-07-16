"use client";
import { Search } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { ChangeEvent } from 'react'

const Navbar = () => {

    const router = useRouter();
    const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', e.target.value);

        const searchQuery = urlParams.toString();

        router.push(`/search?${searchQuery}`); // Redirect to search results page
    }
  return (
    <nav className='px-4 md:px-12 py-4 md:py-6 bg-white text-black'>
        <div className='flex items-center justify-between'>
            <Link href={"/"} className='hidden md:inline-block text-lg font-semibold'>Watch Web</Link>
            <div className='relative max-w-[300px] md:max-w-[400px]'>
                <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                    <Search className='w-4 h-4' />
                </div>
                <input type="text" placeholder='Search' onChange={handleSearch}
                    className='h-[36px] relative pl-10 border-[1px] border-black/[0.7] text-sm rounded-[8px] 
                                w-full py-2 px-3 focus:outline-none bg-transparent'/>
            </div>

            <Link href={"/add-product"}>
                <button className='bg-[#212529] text-white px-3 py-2 rounded-md cursor-pointer'>Add Product</button>
            </Link>
        </div>
    </nav>
  )
}

export default Navbar