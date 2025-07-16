import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='px-4 md:px-12 py-4 md:py-6 bg-white text-black'>
        <div className='flex items-center justify-between'>
            <Link href={"/"} className='hidden md:inline-block text-lg font-semibold'>Watch Web</Link>
            <div>
                <div>{/*Search Icon*/}</div>
                <input type="text" placeholder='Search'/>
            </div>

            <Link href={"/add-product"}>
                <button>Add Product</button>
            </Link>
        </div>
    </nav>
  )
}

export default Navbar