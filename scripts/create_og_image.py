from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1200, 630

# Create background - forest green gradient
img = Image.new("RGB", (W, H), "#054906")
draw = ImageDraw.Draw(img)

# Draw a subtle gradient overlay
for y in range(H):
    ratio = y / H
    r = int(5 + ratio * 10)
    g = int(73 + ratio * 20)
    b = int(6 + ratio * 15)
    draw.line([(0, y), (W, y)], fill=(r, g, b))

# Add a decorative gold accent line
line_y = 380
draw.rectangle([(0, line_y), (W, line_y + 4)], fill="#F59E0B")

# Add subtle pattern dots
for x in range(0, W, 40):
    for y in range(0, line_y, 40):
        draw.ellipse([(x+18, y+18), (x+22, y+22)], fill=(255, 255, 255, 8))

# Load fonts
font_paths = [
    "/usr/share/fonts/truetype/chinese/NotoSansSC-Regular.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/truetype/english/Tinos-Bold.ttf",
]

# Try to load a good bold font
bold_font = None
for fp in font_paths:
    if os.path.exists(fp):
        try:
            bold_font = ImageFont.truetype(fp, 52)
            break
        except:
            continue
if not bold_font:
    bold_font = ImageFont.load_default()

# Title text
title_text = "Volta Tourism Hub"
subtitle_text = "Discover Ghana's Volta Region"

# Draw title
title_bbox = draw.textbbox((0, 0), title_text, font=bold_font)
title_w = title_bbox[2] - title_bbox[0]
title_x = (W - title_w) // 2
title_y = 420

# Draw text shadow
draw.text((title_x + 2, title_y + 2), title_text, fill="#022A03", font=bold_font)
draw.text((title_x, title_y), title_text, fill="#FFFFFF", font=bold_font)

# Subtitle font (smaller)
sub_font = None
for fp in font_paths:
    if os.path.exists(fp):
        try:
            sub_font = ImageFont.truetype(fp, 30)
            break
        except:
            continue
if not sub_font:
    sub_font = ImageFont.load_default()

sub_text = "Culture. Nature. Adventure. One Extraordinary Region."
sub_bbox = draw.textbbox((0, 0), sub_text, font=sub_font)
sub_w = sub_bbox[2] - sub_bbox[0]
sub_x = (W - sub_w) // 2
draw.text((sub_x, 490), sub_text, fill="#F59E0B", font=sub_font)

# Load and paste logo
logo_path = "/home/z/my-project/public/vth-logo.png"
if os.path.exists(logo_path):
    try:
        logo = Image.open(logo_path).convert("RGBA")
        # Resize logo to fit nicely in top portion
        logo_h = 280
        ratio = logo_h / logo.height
        logo_w = int(logo.width * ratio)
        # Cap width
        if logo_w > 500:
            logo_w = 500
            ratio = 500 / logo.width
            logo_h = int(logo.height * ratio)
        logo = logo.resize((logo_w, logo_h), Image.LANCZOS)
        
        # Center logo in top area
        logo_x = (W - logo_w) // 2
        logo_y = (line_y - logo_h) // 2
        
        # Create a new image for compositing
        img_rgba = img.convert("RGBA")
        img_rgba.paste(logo, (logo_x, logo_y), logo)
        img = img_rgba.convert("RGB")
    except Exception as e:
        print(f"Logo paste error: {e}")

# Save
out_path = "/home/z/my-project/public/og-image.jpg"
img.save(out_path, "JPEG", quality=92)
print(f"OG image saved: {out_path} ({img.size})")