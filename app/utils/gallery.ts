import fs from 'fs';
import path from 'path';

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export function getEventGalleryImages(eventSlug: string, eventTitle: string): GalleryImage[] {
  const galleryPath = path.join(process.cwd(), 'public', 'events', eventSlug, 'gallery');
  
  try {
    const files = fs.readdirSync(galleryPath);
    return files
      .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .map((file, index) => ({
        src: `/events/${eventSlug}/gallery/${file}`,
        alt: `${eventTitle} - Image ${index + 1}`,
        // Default dimensions - these should be adjusted based on your actual images
        width: 1920,
        height: 1080
      }));
  } catch (error) {
    console.warn(`No gallery found for event: ${eventSlug}`);
    return [];
  }
} 