import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance

# Canvas dimensions for WhatsApp / Open Graph (1200x630)
W, H = 1200, 630

# Create base canvas with deep royal midnight navy
canvas = Image.new('RGB', (W, H), color='#070E1A')
draw = ImageDraw.Draw(canvas)

# Create subtle radial / linear gradient effect
overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
overlay_draw = ImageDraw.Draw(overlay)

for y in range(H):
    # gradient from #0C1E38 at top-left to #060B14 at bottom
    ratio = y / H
    r = int(12 * (1 - ratio) + 6 * ratio)
    g = int(30 * (1 - ratio) + 11 * ratio)
    b = int(56 * (1 - ratio) + 20 * ratio)
    overlay_draw.line([(0, y), (W, y)], fill=(r, g, b, 255))

canvas = Image.alpha_composite(canvas.convert('RGBA'), overlay).convert('RGB')
draw = ImageDraw.Draw(canvas)

# Ornate dual golden outer borders
gold_primary = (212, 175, 55)
gold_light = (248, 222, 126)
gold_muted = (181, 150, 90)

draw.rectangle([(16, 16), (W - 17, H - 17)], outline=gold_primary, width=3)
draw.rectangle([(26, 26), (W - 27, H - 27)], outline=gold_muted, width=1)

# Corner decorative diamond accents
corner_size = 12
for cx, cy in [(26, 26), (W - 27, 26), (26, H - 27), (W - 27, H - 27)]:
    draw.polygon([(cx, cy - corner_size), (cx + corner_size, cy), (cx, cy + corner_size), (cx - corner_size, cy)], fill=gold_light)

# ----------------- LEFT SIDE: COUPLE PHOTO IN GOLD FRAME -----------------
photo_path = r'public/images/gallery/gallery_real_1.jpg'
if not os.path.exists(photo_path):
    photo_path = r'C:\Users\choud\Downloads\ashi@deep\WhatsApp Image 2026-11-13 at 16.01.55.jpeg'

if os.path.exists(photo_path):
    photo = Image.open(photo_path).convert('RGB')
    
    # Enhance warmth and contrast
    enhancer_col = ImageEnhance.Color(photo)
    photo = enhancer_col.enhance(1.08)
    enhancer_con = ImageEnhance.Contrast(photo)
    photo = enhancer_con.enhance(1.05)
    
    # Frame target area
    fw, fh = 460, 520
    fx, fy = 50, 55
    
    # Crop & scale to fit frame proportionally
    pw, ph = photo.size
    target_ratio = fw / fh
    current_ratio = pw / ph
    
    if current_ratio > target_ratio:
        new_w = int(ph * target_ratio)
        offset = (pw - new_w) // 2
        photo = photo.crop((offset, 0, offset + new_w, ph))
    else:
        new_h = int(pw / target_ratio)
        offset = int((ph - new_h) * 0.15) # slightly higher crop to keep heads visible
        photo = photo.crop((0, offset, pw, offset + new_h))
        
    photo = photo.resize((fw, fh), Image.Resampling.LANCZOS)
    
    # Create rounded corner mask
    mask = Image.new('L', (fw, fh), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([(0, 0), (fw, fh)], radius=24, fill=255)
    
    # Paste photo onto canvas with rounded corners
    canvas.paste(photo, (fx, fy), mask)
    
    # Draw double golden arch / border around the photo
    draw.rounded_rectangle([(fx, fy), (fx + fw, fy + fh)], radius=24, outline=gold_primary, width=3)
    draw.rounded_rectangle([(fx + 6, fy + 6), (fx + fw - 6, fy + fh - 6)], radius=20, outline=gold_light, width=1)
    
    # Small romantic subtitle under photo inside the frame
    ribbon_y = fy + fh - 40
    # Semi-transparent dark ribbon at bottom of photo
    ribbon = Image.new('RGBA', (fw - 12, 34), (0, 0, 0, 180))
    canvas.paste(ribbon, (fx + 6, ribbon_y), ribbon)

# ----------------- RIGHT SIDE: ROYAL INVITATION DETAILS -----------------
rx = 540
rw = W - rx - 50 # width of text area
cx = rx + rw // 2 # center x for text alignment

# Fonts
font_serif_huge = ImageFont.truetype('georgiab.ttf', 48)
font_serif_large = ImageFont.truetype('georgiab.ttf', 30)
font_serif_med = ImageFont.truetype('georgia.ttf', 20)
font_serif_italic = ImageFont.truetype('georgiai.ttf', 18)
font_sans_bold = ImageFont.truetype('arialbd.ttf', 14)
font_sans_small = ImageFont.truetype('arial.ttf', 13)

# 1. Gurmukhi Symbol ੴ
try:
    font_symbol = ImageFont.truetype(r'C:\Windows\Fonts\Nirmala.ttc', 52)
    draw.text((cx, 85), "ੴ", font=font_symbol, fill=gold_light, anchor='mm')
except Exception:
    draw.text((cx, 85), "ੴ", font=font_serif_huge, fill=gold_light, anchor='mm')

# 2. Satnam Waheguru
draw.text((cx, 125), "SATNAM WAHEGURU", font=font_sans_bold, fill=gold_primary, anchor='mm')

# Small divider with diamond
draw.line([(cx - 100, 145), (cx + 100, 145)], fill=gold_muted, width=1)
draw.polygon([(cx, 142), (cx + 4, 145), (cx, 148), (cx - 4, 145)], fill=gold_light)

# 3. Invitation Subheading
draw.text((cx, 172), "WITH THE CELESTIAL BLESSINGS OF WAHEGURU", font=font_sans_small, fill=(200, 220, 240), anchor='mm')
draw.text((cx, 198), "We warmly invite you to the Wedding Celebrations of", font=font_serif_italic, fill=(230, 235, 245), anchor='mm')

# 4. Main Couple Heading
draw.text((cx, 255), "Deep  &  Ashi", font=font_serif_huge, fill=(255, 248, 235), anchor='mm')

# 5. Ceremony Tagline
draw.text((cx, 310), "THE BLISSFUL UNION • ANAND KARAJ", font=font_serif_large, fill=gold_light, anchor='mm')

# Divider
draw.line([(cx - 140, 338), (cx + 140, 338)], fill=gold_muted, width=1)

# 6. Date & Day (Bold and Prominent)
draw.text((cx, 370), "Thursday, 17th December 2026", font=font_serif_large, fill=(255, 255, 255), anchor='mm')
draw.text((cx, 408), "Holy Laavan at 11:00 AM (Followed by Lunch)", font=font_serif_italic, fill=(180, 215, 240), anchor='mm')

# 7. Venue
draw.text((cx, 445), "SHRI GURU NANAK GURUDWARA", font=font_sans_bold, fill=gold_primary, anchor='mm')
draw.text((cx, 470), "Asansol, West Bengal", font=font_sans_small, fill=(220, 230, 245), anchor='mm')

# 8. Interactive Call-To-Action Pill Button at the bottom
btn_w, btn_h = 320, 42
bx = cx - btn_w // 2
by = 515

draw.rounded_rectangle([(bx, by), (bx + btn_w, by + btn_h)], radius=21, fill=(2, 132, 199), outline=gold_light, width=2)
draw.text((cx, by + btn_h // 2), "* TAP TO VIEW INVITATION *", font=font_sans_bold, fill=(255, 255, 255), anchor='mm')

# Save to public directory
output_path = r'public/og-image.jpg'
canvas.save(output_path, 'JPEG', quality=88, optimize=True)

# Also save to public/images/og-image.jpg
os.makedirs('public/images', exist_ok=True)
canvas.save(r'public/images/og-image.jpg', 'JPEG', quality=88, optimize=True)

size_kb = os.path.getsize(output_path) / 1024
print(f"Generated {output_path} successfully! Size: {size_kb:.2f} KB")
