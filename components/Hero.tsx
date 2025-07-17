import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => (
  <section className="min-h-[70vh] md:min-h-[60vh] lg:min-h-[100vh] flex flex-col md:flex-row items-center justify-between bg-white px-4 md:px-24 pt-36 md:pt-24 pb-10">
    <div className="max-w-2xl flex flex-col gap-6">
      <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-gray-900">
        Enduring Style <br /> Meets Your Wrist
      </h1>
      <p className="text-lg text-gray-700 max-w-lg">
        Explore our handpicked range of luxury timepieces, designed for connoisseurs of elegance and accuracy.
      </p>
      <Link href="#products">
        <button className="inline-block border-2 border-gray-900 py-2 px-6 rounded-md bg-gray-900 
                text-white font-semibold shadow-md hover:bg-white hover:text-gray-900 
                hover:border-gray-900 transition-colors">
          Shop the collection
        </button>
      </Link>
    </div>
    <div className="mt-10 md:mt-0">
      <Image src="/hero-img.png" alt="hero image of a watch" width={420} height={420} className="rounded-2xl" />
    </div>
  </section>
);

export default Hero;