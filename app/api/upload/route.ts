import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { db } from '@/db';
import { images } from '@/db/schema/images';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('image') as Blob | null;
    const uploaderName = formData.get('uploaderName') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const uploadToCloudinary = (): Promise<{ secure_url: string }> =>
      new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'uploads' },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            if (result) {
              resolve(result);
            }
          }
        );

        uploadStream.end(fileBuffer);
      });

    const uploadResult = await uploadToCloudinary();

    await db.insert(images).values({
      url: uploadResult.secure_url,
      uploaderName,
    });

    return NextResponse.json({ success: true, url: uploadResult.secure_url });
  } catch (error) {
    console.error('Upload failed:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

