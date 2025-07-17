"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

interface Product {
  _id: string;
  image: string;
  name: string;
  price: number;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get("/api/fetch-products").then((response) => setProducts(response.data.products));
  }, []);

  return (
    <section id="products" className="px-6 md:px-12 py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/product/${product._id}`}
            className="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-4 group"
          >
            <div className="overflow-hidden rounded-lg aspect-w-1 aspect-h-1 bg-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                width={350}
                height={250}
                className="w-full h-60 object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="mt-4 flex-1">
              <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
              <p className="font-medium text-sm text-gray-700 mt-1">Rs. {product.price.toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductList;