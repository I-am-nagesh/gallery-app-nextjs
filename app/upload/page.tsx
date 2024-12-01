'use client';

import { useState } from 'react';

const UploadPage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [uploaderName, setUploaderName] = useState('');
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);
    formData.append('uploaderName', uploaderName);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setMessage(data.success ? 'Image uploaded successfully!' : data.error);
  };

  return (
    <div>
      <h1>Upload an Image</h1>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />
      <input
        type="text"
        placeholder="Your Name"
        value={uploaderName}
        onChange={(e) => setUploaderName(e.target.value)}
      />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadPage;
