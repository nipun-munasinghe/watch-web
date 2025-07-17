"use client";
import ProductList from "@/components/ProductList";
import axios from "axios";
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Product {
  image: string;
  _id: string;
  name: string;
  price: number;
  link: string;
  description: string;
}

const ProductPage = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const params = useParams();
  const [product, setProduct] = useState<Product>();

  const handleDelete = async () => {
    const response = await axios.delete(`/api/product/${params.productId}`);
    toast.success(response.data.message);
    router.push("/");
  };

  useEffect(() => {
    axios.get(`/api/product/${params.productId}`).then((response) => setProduct(response.data.product));
  }, [params.productId]);

  if (!product) {
    return <p className="text-center py-36 text-lg text-gray-600">Loading...</p>;
  }

  return (
    <div className="px-4 md:px-16 bg-[#F8F9FA] py-20">
      <button
        className="mb-6 text-gray-600 flex items-center gap-2 hover:text-gray-900 transition"
        onClick={() => router.back()}
      >
        <span className="text-2xl">&larr;</span> Back
      </button>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:space-x-14 bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="md:w-1/2 flex justify-center items-center">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-xl object-cover object-center"
          />
        </div>
        <div className="md:w-1/2 py-8 flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
                title="More actions"
              >
                <Ellipsis className="w-7 h-7 text-gray-500" />
              </button>
              {open && (
                <div className="absolute bg-white shadow-lg py-2 px-6 text-base font-normal right-0 mt-2 rounded-md ring-1 ring-gray-200 z-20">
                  <Link href={`/product/${product._id}/update`}>
                    <p className="mb-2 pb-2 border-b border-gray-200 hover:text-blue-700 transition cursor-pointer">
                      Update
                    </p>
                  </Link>
                  <button
                    className="text-red-600 hover:text-red-800 transition cursor-pointer"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-gray-700 mt-2">Rs. {product.price.toLocaleString()}</h3>
          <Link href={product.link} target="_blank" rel="noopener">
            <button className="mt-8 w-full bg-gray-900 hover:bg-gray-800 text-white px-4 py-3 rounded-lg font-bold transition">
              Contact Seller
            </button>
          </Link>
          <div className="mt-8">
            <p className="font-semibold text-lg text-gray-900 mb-2">Description</p>
            <p className="text-gray-700">{product.description}</p>
          </div>
        </div>
      </div>

      <h2 className="w-full text-2xl font-bold pt-20 mb-8 text-gray-900">You might also like</h2>
      <ProductList />
    </div>
  );
};

export default ProductPage;