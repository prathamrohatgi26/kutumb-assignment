# Quote Creation App

A responsive web application for creating and viewing quotes with images. Built with Next.js, this application allows users to login, view quotes from other users, and create their own quotes with images.

## 🌟 Features

- User authentication with OTP
- Paginated quote listing
- Image upload functionality
- Quote creation with text overlay on images
- Responsive design optimized for mobile devices
- Real-time updates

## 🚀 Live Demo

[Visit the live application](#) <!-- Add your deployed application URL here -->

## 🛠️ Tech Stack

- **Frontend Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **Authentication:** Custom JWT
- **Image Handling:** Next.js Image Component
- **State Management:** React Context API
- **API Integration:** Axios

## 📋 Prerequisites

Before you begin, ensure you have installed:

- Node.js (v18 or higher)
- npm or yarn or pnpm

## ⚙️ Installation

1. Clone the repository

```bash
git clone https://github.com/prathamrohatgi26/kutumb-assignment.git
```

2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

## 🚀 Running the Application

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📱 Application Pages

### 1. Login Page (`/`)

- Username input
- OTP input (default: 1234)
- Submit button

### 2. Quote List Page (`/quotes`)

- list of quotes
- Floating action button for quote creation
- Image with text overlay
- User information display
- Infinite scroll pagination

### 3. Quote Creation Page (`/quotes/create`)

- Text input for quote
- Image upload functionality
- Preview functionality
- Submit button
