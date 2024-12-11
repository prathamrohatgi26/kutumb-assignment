"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { apiService } from "@/services/api";
import ImageUploader from "@/components/ImageUploader";

interface QuoteForm {
  text: string;
}

export default function CreateQuotePage() {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteForm>();

  const handleImageUpload = (file: File) => {
    setImageFile(file);
  };

  const onSubmit = async (data: QuoteForm) => {
    // Validate image upload
    if (!imageFile) {
      setError("Please upload an image for your quote");
      return;
    }

    try {
      setUploading(true);
      setError("");

      // Get token from cookies
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      // Upload media first
      // console.log("imageFile", imageFile);
      // console.log("token", token);
      const mediaUrl = await apiService.uploadMedia(imageFile);

      // console.log("mediaUrl", mediaUrl);

      // Create quote with media URL
      await apiService.createQuote(data.text, mediaUrl, token);

      // Redirect to quotes page
      router.push("/quotes");
      setUploading(false);
      alert("Quote created successfully");
      // eslint-disable-next-line
    } catch (err: any) {
      setError(err.message || "Failed to create quote");
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl font-bold mb-8 text-gray-900 text-center">
          Create Quote
        </h2>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-md">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <textarea
              placeholder="Write your quote here..."
              className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 
                focus:ring-blue-500 focus:border-blue-500 h-32 resize-none 
                placeholder-gray-400 transition-colors"
              {...register("text", {
                required: "Quote text is required",
                maxLength: {
                  value: 250,
                  message: "Quote must be less than 250 characters",
                },
              })}
            />
            {errors.text && (
              <p className="text-red-500 text-sm mt-2">{errors.text.message}</p>
            )}
          </div>

          <ImageUploader onImageUpload={handleImageUpload} className="mb-6" />

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium
              hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:ring-offset-2 transition-colors duration-200
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? "Creating Quote..." : "Create Quote"}
          </button>
        </form>
      </div>
    </div>
  );
}
