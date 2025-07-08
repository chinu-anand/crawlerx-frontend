# CrawlerX - Modern Web Crawler Dashboard

<div align="center">

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.0-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.11-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

</div>

## 📋 Overview

CrawlerX is a modern, user-friendly web application for managing and executing web crawling tasks. With its intuitive interface, you can easily submit URLs for crawling, monitor job status in real-time, and export the results in various formats.

## ✨ Features

- **Simple URL Submission**: Enter any website URL to start crawling
- **Real-time Job Monitoring**: WebSocket integration for live status updates
- **Dark/Light Mode**: Automatic theme detection with manual toggle option
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Search & Filter**: Easily find and filter crawl jobs by URL or status
- **Export Options**: Download crawl results in JSON or CSV formats
- **Modern UI**: Beautiful interface built with TailwindCSS

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/crawlerx-frontend.git
   cd crawlerx-frontend
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the project root with your API configuration
   ```
   VITE_API_URL=http://your-backend-api-url
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 🔧 Configuration

The application can be configured through environment variables:

| Variable | Description | Default |
|----------|-------------|--------|
| `VITE_API_URL` | Backend API URL | `http://localhost:8080` |

## 🏗️ Project Structure

```
crawlerx-frontend/
├── public/            # Static files
├── src/
│   ├── components/    # React components
│   │   ├── JobForm.jsx    # URL submission form
│   │   └── JobList.jsx    # Job listing and management
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Application entry point
├── .env              # Environment variables
├── index.html        # HTML template
├── package.json      # Project dependencies
├── vite.config.js    # Vite configuration
└── tailwind.config.js # TailwindCSS configuration
```

## 🔄 API Integration

CrawlerX frontend communicates with a backend API through these endpoints:

- `POST /crawl` - Submit a new URL for crawling
- `GET /jobs` - Retrieve all crawl jobs
- `GET /jobs/export/{id}?format=[json|csv]` - Export job results
- WebSocket connection at `ws://{API_URL}/api/v1/ws` for real-time updates

## 🎨 Customization

The application uses TailwindCSS for styling. You can customize the appearance by modifying the `tailwind.config.js` file.

## 🧪 Testing

Run tests with:

```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e
```

## 📦 Building for Production

Create a production build with:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## 🔍 Preview Production Build

```bash
npm run preview
# or
yarn preview
```



---

Built with ❤️ using React, Vite, and TailwindCSS.
