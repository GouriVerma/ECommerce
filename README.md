# MERN E-Commerce Website

## Overview

This is a full-stack E-Commerce web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The platform allows users to browse products, add them to the cart, and proceed to checkout. Admins can manage products, orders, and users.

## Features

### User Features:

- User authentication (Sign up, Login, Logout) using JWT
- Browse and search for products
- View product details
- Add/remove products from the cart
- Place orders and track order status
- Payment integration
- Rate products and write reviews

### Admin Features (Implemented via API Only):

- Add, edit, and delete products
- Manage orders and update order statuses
- Manage users (view, edit, delete accounts)

## Workflow

1. **User Registration/Login**
   - Users sign up and log in using JWT-based authentication.
   - Passwords are securely hashed before storage.
2. **Product Browsing & Management**
   - Users can search and filter products.
   - Admins can manage product inventory.
3. **Shopping Cart & Checkout**
   - Users can add products to their cart and proceed to checkout.
   - Orders are stored in the database and linked to users.
4. **Order Management**
   - Users can view order history.
   - Admins can update order statuses (Pending, Shipped, Delivered, etc.).
5. **Product Rating & Reviews**
   - Users can rate products and write reviews to help other customers.

## Installation & Setup

### Prerequisites:

- Node.js
- MongoDB
- npm or yarn

### Steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/mern-ecommerce.git
   cd mern-ecommerce
   ```
2. Install dependencies for both backend and frontend:
   ```sh
   cd server
   npm install
   cd ../client
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the server directory with database connection details and JWT secret.
4. Start the development servers:
   ```sh
   cd server
   npm start
   ```
   ```sh
   cd client
   npm start
   ```

## Technologies Used

- **Frontend**: React.js, Redux, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT
- **State Management**: Redux

## Folder Structure

```
ECommerce-main/
│── client/    # Frontend React application
│── server/    # Backend Node.js API
│── models/    # Database models
│── routes/    # API routes
│── controllers/ # Business logic
│── config/    # Configuration files
```



