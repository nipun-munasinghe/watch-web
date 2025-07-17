"use client";
import { addAction } from "@/utils/addAction";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

const AddForm = () => {
  const router = useRouter();
  const [imageURL, setImageURL] = useState("");

  async function clientAddAction(formData: FormData) {
    const result = await addAction(formData);

    if (result?.error) {
      toast.error(result.error);
    }

    if (result?.success) {
      toast.success(result.success);
      router.push("/");
      setImageURL("");
    }
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileSize = file.size;
      if (Math.round(fileSize / 1024) > 1024) {
        toast.error("Image size should not exceed 1MB");
        e.target.value = "";
      } else {
        setImageURL(URL.createObjectURL(file));
      }
    }
  };

  return (
    <form
      action={clientAddAction}
      className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-xl px-8 py-8 flex flex-col gap-6 mt-6"
    >
      {imageURL && (
        <div className="flex justify-center mb-6">
          <Image
            src={imageURL}
            alt="Preview"
            width={250}
            height={250}
            className="rounded-lg shadow-md h-56 w-auto object-cover object-center"
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label className="font-medium text-gray-700">Product Image</label>
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleImageChange}
          className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-gray-900"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter the product name"
          className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-gray-900"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-medium text-gray-700">Price</label>
        <input
          type="number"
          name="price"
          placeholder="Enter the product price"
          className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-gray-900"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-medium text-gray-700">Seller's Link</label>
        <input
          type="text"
          name="link"
          placeholder="Link to where buyers can find you"
          className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-gray-900"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          placeholder="Enter the product description"
          rows={4}
          className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-gray-900 resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-shadow shadow focus:ring-2 focus:ring-gray-900"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddForm;