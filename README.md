# Redesign Unelma Platforms

A full-stack web application for blogs, products, and services with authentication, favorites, reviews, and Stripe payments. Fully responsive with light/dark theme support.

> **School Project** - This project was developed as part of a school course to practice full‑stack web development using React and Laravel, from 26.10.2025-19.12.2025

## Demo

- Image:
- Video:

## Team Members

- Binyam Angamo: UI Lead; contributed to frontend and backend
- Hoa Lu: Frontend Lead; contributed to UI, mobile responsiveness, and backend
- Elias Tekle: Backend Co-Lead; contributed to payment system on frontend
- Basudev Pokharel: Backend Co-Lead; contributed to ThemeContext, service payment, and Career page on frontend
- Mahfuz Shihab: created team email and footer content

## Website Navigation

- **Home**: Landing page and highlights
- **About**: Project and platform information
- **Products**: Product listing, details, cart, reviews, Stripe payment
- **Blogs**: Blog listing, filtering, favorites, comments
- **Services**: Service listing and Stripe payment
- **Contact**: Contact information and send message form
- **Favorites**: User’s saved blogs, products, and services
- **User**: Login/Register, profile, purchases, subscriptions

## Table of Contents

- [Features](#features)
- [Backend Overview](#backend-overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Assets & Credits](#assets--credits)

## Features

### General

- User authentication (login/register)
- Responsive design (small, medium, large screens)
- Light/Dark theme toggle
- Pagination on blogs and services

### Blogs

- SEO-friendly URLs (ID + slug)
- Filter by category
- Sort by newest, oldest, most favorited
- Checkbox to show only user's own favorites
- Blog detail page:
  - Comment section
  - Suggested blogs (responsive count: 1 for small, 2 for medium, 3 for large screens)
- Favorite toggle with total count
- Tags and category navigation

### Products

- Add to cart
- Favorite toggle with total count
- Stripe payment integration
- Suggested products on detail page
- Rating and review system:
  - Sort and filter reviews by oldest, newest, or star rating
  - Write a review: visible to users who are logged in and have made the purchase
  - Edit/delete: visible to the review's author

### Services

- Favorite toggle with count
- Stripe payment integration
- Suggested services on detail page

### Contact

- Contact information: email, phone, open hours, location, map view
- Message form: messages must be at least 10 characters; sent to backend in _Manage/Messages_

### Favorites page and button

- Favorite button: displays total favorites across all users
- Favorites page:
  - Lists favorited blogs, products, and services for logged-in users
  - Clicking favorite button removes the item from the list
  - Clicking a favorite item navigates to its detail page

### User Page

- Login/Register
- Private user data after login:
  - One-time purchases and subscriptions
  - Profile information

### Unelma mail subscription

- Users can subscribe to the Unelma newsletter from the website footer
- A confirmation email is sent after successful subscription
- Duplicate email subscriptions are prevented
- Admins can manage subscribers in _Manage / Newsletter Subscribers_

## Backend Overview

The backend is built with **Laravel** and handles:

- User authentication and authorization
- Managing blogs, products, and services via a content management system
- Storing and retrieving favorites, comments, and reviews
- Handling Stripe payment processing for products and services
- Sending confirmation emails for newsletter subscriptions
- Serving API endpoints consumed by the React frontend

## Tech Stack

- **Frontend:** React, Redux, Material UI
- **Backend:** Laravel
- **Database:** SQL
- **Payment Integration:** Stripe

## Getting Started

### Prerequisites

- Node.js & npm
- PHP & Composer
- SQL Database
- Optional: phpMyAdmin

### Backend setup

1. Clone backend repository and start the server:

   ```bash
   git clone https://github.com/Basudev-Pokharel/unelma-laravel-backend.git
   cd unelma-laravel-backend
   composer install
   cp .env.example .env
   # edit .env to set your database credentials
   php artisan key:generate
   # run migrations and seed sample data
   php artisan migrate:fresh --seed
   # start the server
   php artisan serve


   _Test login:_

   - username: admin@example.com
   - password: password

   ```

2. Users can create extra databases and manage them in _Manage/ContentManagement_ for Blogs, Services, Products

### Frontend setup

1. Clone the frontend repository and install dependencies:
   ```bash
   git clone https://github.com/Hoa28686/unelma-react-frontend.git
   cd unelma-react-frontend
   npm install
   npm run dev
   ```
2. Create `.env`:
   ```bash
   VITE_API_BASE_URL=http://127.0.0.1:8000/api
   ```
3. Start the app
   ```bash
   npm run dev
   ```
4. Test login
   - username: admin@example.com
   - password: password

## Assets & Credits

- **Unelma logo** used for default avatar and platform images
- All images and branding are for educational purposes only
