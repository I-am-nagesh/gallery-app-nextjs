"use client";

import { useState } from "react";

const UploadPage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [uploaderName, setUploaderName] = useState("");
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("uploaderName", uploaderName);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setMessage(data.success ? "Image uploaded successfully!" : data.error);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="max-w-sm w-full bg-white shadow-lg rounded-lg p-6">
    <h1 className="text-2xl font-semibold text-center mb-4">
      Upload an Image
    </h1>
    <div className="mb-4">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
    <div className="mb-4">
      <input
        type="text"
        placeholder="Your Name"
        value={uploaderName}
        onChange={(e) => setUploaderName(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
    <div className="text-center">
      <button
        onClick={handleUpload}
        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Upload
      </button>
    </div>
    {message && <p className="text-center text-green-600 mt-4">{message}</p>}
  </div>
</div>
  )
};

export default UploadPage;
