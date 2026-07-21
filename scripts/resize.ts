import sharp from 'sharp';
import fs from 'fs';

async function resize() {
  await sharp('/home/z/my-project/upload/WhatsApp Image 2026-07-20 at 7.41.55 PM.jpeg')
    .resize(1200, null, { withoutEnlargement: true })
    .jpeg({ quality: 70 })
    .toFile('/home/z/my-project/upload/design-small.jpg');
  const stat = fs.statSync('/home/z/my-project/upload/design-small.jpg');
  console.log('Resized to:', stat.size, 'bytes');
}

resize().catch(console.error);