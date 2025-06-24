# serendip-spices

SerendipSpices is a full‑stack MERN web application that brings the authentic flavors of Ceylon spices right to your doorstep. Buyers can explore, filter, and purchase premium Sri Lankan spices, while sellers manage their product listings and orders through an intuitive dashboard.

## Features

* **User Roles**: Buyer, Seller, Admin with role-based access control
* **Product Catalog**: Browse spices like Ceylon cinnamon, pepper, cardamom, and more with rich images and descriptions
* **Search & Filters**: Filter by spice type, price range, and origin district
* **Shopping Cart & Checkout**: Secure checkout in LKR with PayHere or Stripe integration
* **Seller Dashboard**: CRUD operations on products, view order history
* **Admin Panel**: Moderate users/products and view analytics
* **Extras**: Ratings & reviews, real-time order notifications, multi-language support (Sinhala/Tamil)

## Tech Stack

* **Frontend**: React, React Router, Axios, Tailwind CSS
* **Backend**: Node.js, Express, JWT authentication
* **Database**: MongoDB Atlas
* **Payment**: PayHere (local) or Stripe (global)
* **Real-Time**: Socket.io for live order updates

##  Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/serendip-spices.git
   cd serendip-spices
   ```
2. **Backend setup**

   ```bash
   cd backend
   npm install
   ```
3. **Frontend setup**

   ```bash
   cd ../frontend
   npm install
   ```
4. **Environment Variables**
   Create a `.env` file in `backend/` with the following keys:

   ```env
   MONGO_URI=mongodb_connection_string
   JWT_SECRET=jwt_secret
   ```
5. **Run locally**

   * Start backend: `npm run dev` (nodemon)
   * Start frontend: `npm start`
   * Visit `http://localhost:3000`

## Deployment

* **Backend**: Deploy to Heroku, Railway, or DigitalOcean App Platform
* **Frontend**: Deploy to Vercel or Netlify
* **Database**: Hosted on MongoDB Atlas
