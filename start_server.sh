#!/bin/bash
# Simple script to start a local web server for the Hyundai Delivery Guide

echo "Starting Hyundai Delivery Guide..."
echo "-----------------------------------"
echo "1.  Open your browser to: http://localhost:8000"
echo "2.  To view on your phone:"
echo "    - Ensure your phone and computer are on the same Wi-Fi."
echo "    - Find your computer's IP address (System Settings > Wi-Fi > Details)."
echo "    - On your phone, visit: http://YOUR_IP_ADDRESS:8000"
echo "-----------------------------------"
echo "Press Ctrl+C to stop the server."

# Change to the public directory where index.html is
cd public

# Start Python simple HTTP server
python3 -m http.server 8000
