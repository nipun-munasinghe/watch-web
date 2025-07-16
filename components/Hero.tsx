import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <div className='min-h-[70vh] md:min-h-[60vh] lg:min-h-[90vh] flex flex-col md:flex-row justify-center items-center bg-white px-4 md:px-12'>
        <div className="max-w-2xl">
            <h1 className='text-5xl pt-6 md:pt-0 md:text-7xl leading-tight font-semibold'>Enduring Style Meets Your Wrist</h1>
            <p className='text-[#495057] mt-4'>Explore our handpicked range of luxury timepieces, designed for connoisseurs of elegance and accuracy.</p>
            <Link href='#products'>
                <button className='cursor-pointer mt-8 bg-[#212529] text-white rounded-md px-3 py-2'>Shop the collection</button>
            </Link>
        </div>
        <div>
            <Image src="/hero-img.png" alt='hero image of a watch' width={500} height={500} />
        </div>
    </div>
  )
}

export default Hero