from PIL import Image
import numpy as np

# Load the image
img = Image.open('/home/z/my-project/public/vth-logo.jpg').convert('RGBA')
data = np.array(img)

# Find white/near-white pixels and make them transparent
# White is (255, 255, 255) - we'll use a threshold
rgb = data[:, :, :3]
white_mask = (
    (rgb[:, :, 0] > 230) &
    (rgb[:, :, 1] > 230) &
    (rgb[:, :, 2] > 230)
)

# Set alpha to 0 for white pixels
data[white_mask, 3] = 0

# Create the transparent image
result = Image.fromarray(data)
result.save('/home/z/my-project/public/vth-logo.png', 'PNG')
print(f"Saved transparent PNG: {result.size}")

# Also verify some pixels
result2 = Image.open('/home/z/my-project/public/vth-logo.png')
print(f"Mode: {result2.mode}, Size: {result2.size}")
# Check a few non-white pixels to make sure they're kept
# Sample some pixels from the middle area
w, h = result2.size
for y in range(0, h, h//5):
    for x in range(0, w, w//5):
        px = result2.getpixel((x, y))
        if px[3] > 0:
            print(f"  Non-transparent pixel at ({x},{y}): RGBA{px}")