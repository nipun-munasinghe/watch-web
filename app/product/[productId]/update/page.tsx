"use client";
import UpdateForm from "@/components/UpdateForm";
import { useParams } from "next/navigation";
import React from "react";

const UpdateProductPage = () => {
  const params = useParams();
  return (
    <div className="px-4 md:px-12 bg-[#f8f9fa] pb-8 pt-28">
      <h2 className="text-center font-bold pt-8 text-2xl md:text-3xl w-full max-w-xl mx-auto mb-8">
        Update product
      </h2>
      <UpdateForm productId={params.productId as string} />
    </div>
  );
};

export default UpdateProductPage;