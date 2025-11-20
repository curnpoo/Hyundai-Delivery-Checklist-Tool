# Hyundai Delivery Guide

A mobile-first, responsive web application for Hyundai sales consultants to assist with vehicle delivery.

## Features

- **Dynamic Filtering**: Shows relevant features based on selected Model and Trim.
- **Glassmorphism UI**: Premium dark-mode design with blur effects and smooth animations.
- **PWA Ready**: Installable on mobile devices via "Add to Home Screen".
- **Offline Support**: Basic caching via Service Worker.

## Project Structure

```
/public
  index.html       # Entry point
  manifest.json    # PWA manifest
  service-worker.js # Offline caching
  /icons           # App icons
/src
  /styles          # CSS files
  /components      # JS Components (FeatureCard, Selector, etc.)
  /scripts         # Main logic (App, Navigation, DataLoader)
  /data            # Data files (CSV, JSON)
```

## Setup & Deployment

1.  **Local Development**:
    -   Serve the project root using a simple HTTP server (e.g., `python3 -m http.server` or VS Code Live Server).
    -   Open `http://localhost:8000/public/index.html` (or equivalent).

2.  **Deployment (Netlify/Vercel/GitHub Pages)**:
    -   **Root Directory**: Set the publish directory to the project root (or `/public` if you move assets there).
    -   Ensure `index.html` is accessible.
    -   For GitHub Pages, you might need to move `index.html` to the root or configure the source to `/public`.

3.  **Adding New Models**:
    -   Edit `src/data/models_trims_2025_2026.csv`.
    -   Add a new row with the Model Year, Model, Trim, etc.
    -   Ensure the `trim_name` matches standard naming conventions used in `src/scripts/featureMapper.js` for automatic feature assignment.

4.  **Adding New Features**:
    -   Edit `src/data/features.json`.
    -   Add a new key-value pair with the feature details (Title, Overview, Steps).
    -   Update `src/scripts/featureMapper.js` to assign this new feature key to the relevant trims.

## Customization

-   **Styles**: Edit `src/styles/main.css` to change colors (e.g., `--hyundai-blue`) or glass effects.
-   **Icons**: Replace `public/icons/icon.svg` with your own brand assets.

## License

Internal Use Only.
