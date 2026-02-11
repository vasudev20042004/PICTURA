# Pictura Creations Ltd. Website

A premium, cinematic website for a creative media company.

## Features
- **Cinematic Design**: Full-screen hero sections, glassmorphism, and smooth animations.
- **Topographical Texture**: Subtle background patterns for a unique brand identity.
- **Responsive**: Fully optimized for mobile, tablet, and desktop.
- **Interactive**: Hover effects, gallery filtering, and lightbox.

## How to Run

You can view the website by running a local server.

### Using Python (Recommended)
If you have Python installed, run:
```bash
python -m http.server 8000
```
Then open your browser to: `http://localhost:8000`

### Using Node.js (npx)
If you have Node.js installed, you can use:
```bash
npx serve .
```

## Structure
- `index.html`: Home page
- `about.html`: About Us page
- `services.html`: Services page
- `gallery.html`: Portfolio gallery with filtering
- `contact.html`: Contact form and map
- `css/style.css`: Main stylesheet
- `js/main.js`: Interactivity scripts
- `assets/`: Directory for images (currently using Unsplash placeholders)

## Customization
- **Colors**: Edit CSS variables in `css/style.css` under `:root`.
- **Images**: Replace Unsplash URLs with your own assets in the HTML files.
