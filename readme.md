# Showcase Your Creative Vision Media Sharing Platform - Full Stack Project
Join thousands of artists sharing their digital masterpieces. From digital paintings to photography, showcase your talent to a global audience.

Frontend: https://creativeshowcaseforartist-1.onrender.com
<br>
Backend: https://creativeshowcaseforartist.onrender.com

### Features
-- User Authentication (Register/Login)
<br>
-- Image Upload & Gallery View
<br>
-- Photo Upload (up to 5MB)
<br>
-- Masonry Grid Layout
<br>
-- Responsive Design
<br>
-- Animated Transitions
<br>
-- Profile Management
<br>
-- JWT Authentication
<br>
-- Persistent Login

>**Frontend:** React (Vite), Tailwind CSS, Framer Motion, Axios, React Router, Context API  
>**Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT Auth, Cloudinary, Multer, Bcrypt

# Project Structure
```bash
media-sharing-app/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AnimatedComponent.jsx
│   │   │   ├── AnimatedRoutes.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ImageCard.jsx
│   │   │   ├── ImageUpload.jsx
│   │   │   ├── MasonryGrid.jsx
│   │   │   ├── Navbar.jsx
│   │   │   
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── imageService.js
│   │   │   └── videoService.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    ├── config/
    │   ├── db.js
    │   └── cloudinary.js
    ├── controllers/
    │   ├── authController.js
    │   ├── imageController.js
    │   └── mediaController.js
    ├── models/
    │   ├── User.js
    │   └── Media.js
    ├── routes/
    │   ├── authRoutes.js
    │   └── mediaRoutes.js
    ├── middleware/
    │   ├── authMiddleware.js
    │   ├── uploadMiddleware.js
    │   └── errorMiddleware.js
    ├── utils/
    │   └── generateToken.js
    ├── .env
    ├── package.json
    └── server.js
```
# Setup Instructions
### 1. Prerequisites
--Node.js (v16 or higher)

--MongoDB Atlas account

--Cloudinary account

--Git
### 2. Clone Repository
```
git clone https://github.com/goutamdebugs/CreativeShowcaseForArtist.git
cd CreativeShowcaseForArtist
```
### 3. Backend Setup
```
cd backend
npm install
```
### 4. Create .env file: for Backend
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv:.... // enter your url mongoDB


JWT_SECRET= Software_Engineering_is_the_only_career_where_interview_is_harder_than_the_job
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```
### 5. Start Backend:
```
npm run dev
# Server runs on http://localhost:5000
```
## 6. Frontend Setup
```
cd frontend
npm install
```
### 7. Create .env file:
```

VITE_API_BASE_URL= your backend hosting url


VITE_APP_NAME=Creative Showcase
VITE_APP_VERSION=1.0.0

VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG_MODE=true


VITE_API_TIMEOUT=30000

```
### 8. Start Frontend:
```
npm run dev
```
# Support
### goutam.debugs@gmail.com
Made with ❤️ by Goutam Maity

##  Getting Started Checklist
Clone repository
<br>
Set up MongoDB Atlas
<br>
Create Cloudinary account
<br>
Configure environment variables
<br>
Install dependencies
<br>
Run backend server
<br>
Run frontend dev server
<br>
Register first user
<br>
Upload first image/video
<br>
Test on mobile
