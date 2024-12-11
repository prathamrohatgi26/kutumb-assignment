"use client";

import { useState, useRef } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  className?: string;
}

export default function ImageUploader({
  onImageUpload,
  className = "",
}: ImageUploaderProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type and size
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        alert("Please upload a valid image (JPEG, PNG, GIF)");
        return;
      }

      if (file.size > maxSize) {
        alert("Image size should be less than 5MB");
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Trigger upload callback
      onImageUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files?.[0];
    if (file) {
      // Same validation as handleFileChange
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        alert("Please upload a valid image (JPEG, PNG, GIF)");
        return;
      }

      if (file.size > maxSize) {
        alert("Image size should be less than 5MB");
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Trigger upload callback
      onImageUpload(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const clearImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-6 text-center 
      ${
        imagePreview
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:border-blue-500 hover:bg-blue-50"
      } 
      ${className}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/gif"
        className="hidden"
      />

      {imagePreview ? (
        <div className="relative">
          {/* eslint-disable-next-line */}
          <img
            src={imagePreview}
            alt="Uploaded"
            className="max-h-64 mx-auto rounded-lg object-cover"
          />
          <div className="absolute top-2 right-2 flex space-x-2">
            <button
              type="button"
              onClick={triggerFileInput}
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={clearImage}
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={triggerFileInput}
          className="cursor-pointer flex flex-col items-center justify-center"
        >
          <PhotoIcon className="h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600">
            Drag and drop an image or click to upload
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Supports: JPEG, PNG, GIF (Max 5MB)
          </p>
        </div>
      )}
    </div>
  );
}
