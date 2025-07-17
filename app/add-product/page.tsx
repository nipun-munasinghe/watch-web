import AddForm from "@/components/AddForm";
import React from "react";

const AddProductPage = () => (
  <div className="px-4 md:px-12 bg-[#f8f9fa] pb-8 pt-28">
    <h2 className="text-center font-bold pt-8 text-2xl md:text-3xl w-full max-w-xl mx-auto mb-8">
      Add a new product
    </h2>
    <AddForm />
  </div>
);

export default AddProductPage;