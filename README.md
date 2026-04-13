# Aman Kaushal - MERN Stack Portfolio

A full-stack, visually dynamic portfolio built using the **MERN Stack** (MongoDB, Express, React, Node.js). Designed to showcase projects, achievements, and technical skills while providing a unique user experience. The application features an OS-themed terminal UI, custom animations, dark/light mode toggle, and seamless deployment on Vercel and Render.

## 🚀 Features

- **OS-Themed Terminal Experience:** A unique interface featuring typewriter effects, auto-scrolling terminal logs, and system boot-like visuals.
- **Dynamic Projects Section:** A clean 2x2 grid of scrollable flip cards, revealing details, technical badges, and action links (GitHub & Live Demo) on hover.
- **Dark/Light Mode:** Seamless theme toggling for enhanced user accessibility and modern aesthetics.
- **Contact Form with Database Binding:** A robust functional contact form storing submissions directly in MongoDB Atlas and utilizing Nodemailer for notifications.
- **Micro-animations & Fluid Navigation:** Leveraging `framer-motion` and `aos` for smooth page transitions and glitch effects.
- **Robust Routing System**: Ensured clean and reliable routing with fallback redirects out-of-the-box using React Router DOM.

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 powered by Vite for blazingly fast development and builds.
- **Styling:** Tailwind CSS (Vanilla design system implementation).
- **Animations:** Framer Motion, AOS (Animate On Scroll).
- **Routing:** React Router v7.
- **Deployment:** Vercel.

### Backend
- **Runtime:** Node.js.
- **Framework:** Express.js.
- **Database:** MongoDB Atlas (Mongoose ORM).
- **Mailing:** Nodemailer.
- **Middleware:** CORS, Morgan, dotenv.
- **Deployment:** Render.

## 📂 Project Structure

```bash
Aman_Kaushal_MERN_Portfolio/
├── client/                     # Frontend built with React + Vite
│   ├── src/                    
│   │   ├── components/         # Reusable React components (Flip cards, forms, etc.)
│   │   ├── ...                 
│   ├── package.json            
│   └── vite.config.js          
└── server/                     # Backend API built with Express + Node
    ├── routes/                 # Express routing lines (e.g. contact.js)
    ├── index.js                # App entry point
    └── package.json            
```

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
- [Node.js](https://nodejs.org/en/) installed on your local machine.
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster for the database connection.

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/aman_portfolio.git
   cd Aman_Kaushal_MERN_Portfolio
   ```

2. **Setup Backend (`server`)**
   ```sh
   cd server
   npm install
   ```
   Create a `.env` file inside the `/server` directory and configure the environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   NODE_ENV=development
   ```
   *Optional configuration for Nodemailer if applicable.*

3. **Setup Frontend (`client`)**
   ```sh
   cd ../client
   npm install
   ```
   Create a `.env` file inside the `/client` directory and map your API properly (compatible with Vite):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Running Locally

1. **Start the Express Backend Server**
   ```sh
   cd server
   npm run dev
   ```

2. **Start the Vite Frontend Development Server**
   ```sh
   cd client
   npm run dev
   ```

Your app will be available on `http://localhost:5173/`.

## 🚢 Deployment Insights

The backend relies on Render, adapting correctly to `$PORT` via dynamic environment variables, mitigating CORS policy mismatches commonly seen when bridging local dev servers.
The frontend connects cleanly using Vercel.

## 👤 Author

**Aman Kaushal**
- LinkedIn: [Aman Kaushal LinkedIn Profile](https://www.linkedin.com/in/aman-kaushal-889b072a7?utm_source=share_via&utm_content=profile&utm_medium=member_android)
- GitHub: [Aman Kaushal GitHub](https://github.com/Aman018-gif)

---

> _This README was generated to provide structured technical details on this dynamic MERN Stack build._
