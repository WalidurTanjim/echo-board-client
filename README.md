# EchoBoard - MERN Stack Forum

## Overview

**EchoBoard** is a full-stack forum website built with the MERN stack (MongoDB, Express, React, Node.js) designed for users to engage in discussions, share posts, and interact with other users. The platform allows users to sign up, sign in, create, delete, like, and comment on posts. It also supports social media sharing, real-time notifications, and media storage through Cloudinary.

With a clean and modern UI powered by **React** and **Tailwind CSS**, **EchoBoard** offers a seamless user experience on both desktop and mobile devices.

## Live Demo

Check out the live demo of **EchoBoard**: [https://your-live-website-link.com](https://your-live-website-link.com)


### Features

#### 1. **User Authentication & Authorization**
   - **Sign Up**: Users can create a new account with their email and password.
   - **Sign In**: Users can log in using their credentials and access their dashboard.
   - **JWT Authentication**: Secure user authentication using JSON Web Tokens (JWT).
   - **Password Reset**: Users can reset their password if they forget it.

#### 2. **Post Management**
   - **Create Posts**: Users can create new posts with text and images.
   - **Edit Posts**: Users can edit their posts after creation.
   - **Delete Posts**: Users can delete their own posts.

#### 3. **Post Interactions**
   - **Like / Dislike**: Users can like or dislike posts to show their approval or disapproval.
   - **Comment on Posts**: Users can comment on posts to engage in discussions.
   - **Share Posts**: Posts can be shared on Facebook using the `react-share` library.
   - **Report Inappropriate Content**: Users can flag posts or comments for moderation.

#### 4. **Cloudinary Media Management**
   - **Image Upload**: Users can upload images to Cloudinary for use in their posts.
   - **Image Display**: Images are displayed within posts using the Cloudinary React SDK.

#### 5. **Notifications**
   - **Real-Time Notifications**: Users are notified of post likes, comments, and replies.

#### 6. **Admin Features (Optional)**
   - **User Management**: Admins can view, edit, or delete user accounts.
   - **Content Moderation**: Admins can moderate posts and comments, removing inappropriate content.

#### 7. **Stripe Integration (Optional)**
   - **Premium Features**: Users can pay for premium features or memberships using Stripe.

#### 8. **Responsive Design**
   - **Mobile-Friendly**: The application is fully responsive, ensuring a smooth experience on all devices.

## Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces, used to build the interactive components of the forum.
- **Vite**: A modern, fast build tool for React applications, providing a faster development experience.
- **Tailwind CSS**: A utility-first CSS framework that makes styling fast and easy.
- **React Router DOM**: For handling routing and navigation between different pages.
- **Cloudinary**: For uploading and displaying images in posts.
- **React Query**: A data-fetching library that helps manage server state in React applications.
- **React Hook Form**: For managing forms and validation in the frontend.
- **React Share**: To enable social media sharing of posts (e.g., Facebook).
- **Lottie React**: For adding animations to the UI.
- **Moment.js**: For formatting and manipulating dates and times.
- **Preline**: A UI component library to speed up development.
- **SweetAlert2**: For displaying beautiful and customizable alerts.

### Backend

- **Node.js**: A JavaScript runtime environment for building the backend of the application.
- **Express**: A fast, unopinionated web framework for Node.js used to build the server-side API.
- **MongoDB**: A NoSQL database used to store user data, posts, comments, and other forum-related information.
- **JWT (JSON Web Token)**: For secure authentication and authorization.
- **Stripe**: For processing payments for premium features or memberships.
- **Cloudinary**: For handling image uploads and storage.
- **Cookie Parser**: For parsing cookies and managing sessions.
- **CORS**: For handling cross-origin requests between the frontend and backend.
- **Dotenv**: For managing environment variables securely.

## Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (for local development or MongoDB Atlas for cloud database)
- **Stripe Account** (if you plan to use payment features)
- **Cloudinary Account** (for image management)
- **Firebase Account** (if you plan to use Firebase authentication or other Firebase services)

