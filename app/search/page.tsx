"use client";
import axios from 'axios';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const SearchPage = () => {
    const [products, setProducts] = useState([]);
    const searchParams = useSearchParams();

    useEffect(() => {
        const searchTermFromUrl = searchParams.get('searchTerm');
        if (searchTermFromUrl) {
            axios
            .get(`/api/search?searchTerm=${searchTermFromUrl}`)
            .then((response) => setProducts(response.data.products))
            .catch((error) => console.log("Error fetching search products:", error));
            console.log(`Searching for: ${searchTermFromUrl}`);
        } 
    }, [searchParams]);
  return (
    <div>SearchPage</div>
  )
}

export default SearchPage