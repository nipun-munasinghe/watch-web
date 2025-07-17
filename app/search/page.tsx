"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

interface Product {
  _id: string;
  image: string;
  name: string;
  price: number;
}

const SearchComponent = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchTermFromUrl = searchParams.get("searchTerm");
    if (searchTermFromUrl) {
      axios
        .get(`/api/search?searchTerm=${searchTermFromUrl}`)
        .then((response) => setProducts(response.data.products))
        .catch((error) => console.error("Error fetching search products:", error));
    }
  }, [searchParams]);

  return (
    <section className="px-6 md:px-12 py-10 flex justify-center items-center min-h-[60vh] bg-gray-50">
      <div className="max-w-7xl w-full">
        {products.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No products found.</p>
        ) : (
          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <Link
                href={`/product/${product._id}`}
                key={product._id}
                className="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-4 group"
              >
                <div className="overflow-hidden rounded-lg aspect-w-1 aspect-h-1 bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={350}
                    height={250}
                    className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="mt-4 flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
                  <p className="font-medium text-sm text-gray-700 mt-1">
                    Rs. {product.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const SearchPage = () => (
  <Suspense fallback={<div className="text-center py-40 text-gray-500">Loading...</div>}>
    <SearchComponent />
  </Suspense>
);

export default SearchPage;