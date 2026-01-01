# SHOPORA

Shopora is a comprehensive full-stack e-commerce platform designed to provide users with a seamless shopping experience. Built with modern technologies including Node.js, Express, React, and MongoDB, Shopora enables customers to browse products by category, manage their shopping cart, and securely process orders. The platform features robust user authentication, an intuitive dashboard for order tracking, and an admin panel for efficient inventory management.

## Features

- **User Authentication** - Secure login and registration with JWT-based authentication
- **Product Catalog** - Browse and filter products by categories
- **Shopping Cart** - Add, remove, and manage items with real-time updates
- **Order Management** - Place orders and track order history from user dashboard
- **Responsive Design** - Optimized for desktop and mobile devices

## Tech Stack

**Backend**: Node.js, Express.js, JWT, Bcrypt  
**Frontend**: React, Vite, Context API, CSS  
**Database**: MongoDB 
**Additional**: CORS,Cookie Parser

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/itaayush/Shopora.git
cd Shopora
```

### Install Dependencies

Install backend dependencies:
```bash
npm install
```

Install frontend dependencies:
```bash
cd client
npm install
```

### Setup Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
PORT=5000
MONGO_URL=mongodb://localhost:27017/shopora
JWT_SECRET=your_secret_key_here
```

### Run Development Servers

Start both backend and frontend servers concurrently:

```bash
npm run dev
```

The backend will run on `http://localhost:5000` and the frontend on `http://localhost:5173`
