'use client';

import { useEffect, useState } from 'react';

type Image = {
  id: number;
  url: string;
  uploaderName: string | null;
};

const UploadedPage = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/uploaded');
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        setImages(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Uploaded Images</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.length > 0 ? (
          images.map((image) => (
            <div
              key={image.id}
              className="border rounded-lg p-4 shadow-md text-center"
            >
              <img
                src={image.url}
                alt={`Uploaded by ${image.uploaderName || 'Anonymous'}`}
                className="rounded-lg max-h-40 mx-auto"
              />
              <p className="mt-2 text-sm font-semibold">
                {image.uploaderName || 'Anonymous'}
              </p>
            </div>
          ))
        ) : (
          <p>No images found.</p>
        )}
      </div>
    </div>
  );
};

export default UploadedPage;
