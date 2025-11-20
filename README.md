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

## How to Run (Easiest Way)

1.  **Open Terminal** in this folder.
2.  Run the start script:
    ```bash
    ./start_server.sh
    ```
3.  **On Computer**: Open [http://localhost:8000](http://localhost:8000) in Chrome or Safari.
4.  **On Phone**:
    *   Make sure your phone and computer are on the **same Wi-Fi network**.
    *   Find your computer's local IP address:
        *   **Mac**: Go to **System Settings > Wi-Fi**, click "Details" next to your network, and look for "IP Address" (e.g., `192.168.1.5`).
    *   Open your phone's browser and type that IP followed by `:8000` (e.g., `http://192.168.1.5:8000`).
    *   **Add to Home Screen**: Tap the Share button (iOS) or Menu (Android) and select "Add to Home Screen" to install it as an app.

## Deployment (Optional)

To put this online for everyone to use without your computer:
1.  Upload this entire folder to GitHub.
2.  Connect your GitHub repo to **Netlify** or **Vercel**.
3.  Set the **Publish Directory** to `public`.

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
