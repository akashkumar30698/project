# HD Notes - MERN Note-Taking Application

A modern, full-stack **MERN** note-taking application with authentication, OTP login, and real-time synchronization.  

---

## ✨ Features  

- **Authentication**: Email/OTP and Google sign-in  
- **Note Management**: Create, view, update, and delete notes  
- **Real-time Sync**: Notes sync instantly across devices (Socket.IO)  
- **Responsive Design**: Works on mobile, tablet, and desktop  
- **Secure**: JWT-based authentication with role-based access  

---

## 🛠 Tech Stack  

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite  
- **Backend**: Node.js, Express.js, TypeScript  
- **Database**: MongoDB with Mongoose  
- **Authentication**: JWT + OTP (Email) + Google OAuth  
- **Real-time**: Socket.IO (WebSockets)  
- **Icons**: Lucide React  

---

## 🚀 Getting Started  

### Prerequisites  

- Node.js 18+  
- npm or yarn  
- MongoDB Atlas (or local MongoDB)  
- Google OAuth credentials (optional, for Google login)  

---

### 🔧 Installation  

1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/hd-notes.git
   cd hd-notes
   ```

2. Install dependencies:  
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```

3. Create environment files:  

   **Backend (`backend/.env`)**  
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=http://localhost:5173
   EMAIL_HOST=smtp.yourmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_password
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

   **Frontend (`frontend/.env.local`)**  
   ```env
   VITE_API_URL=http://localhost:5000
   ```

---

### 🗄 Database Schema (Mongoose)  

**User Model**  
```ts
{
  name: String,
  email: String,
  password: String,
  role: { type: String, default: "USER" },
  dateOfBirth: Date,
  profileImageURL: String,
  tokenVersion: { type: Number, default: 0 }
}
```

**Note Model**  
```ts
{
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

---

### ▶ Development  

#### Backend  
```bash
cd backend
npm run dev
```

Backend will run at: [http://localhost:5000](http://localhost:5000)  

#### Frontend  
```bash
cd frontend
npm run dev
```

Frontend will run at: [http://localhost:5173](http://localhost:5173)  

---

### 📦 Build for Production  

**Frontend**  
```bash
npm run build
```
Output will be in the `dist` folder.  

**Backend**  
Deploy with Node.js hosting (Render, Railway, or VPS).  

---

## 📂 Project Structure  

```
frontend/
├── src/
│   ├── components/          # React components
│   ├── contexts/            # React contexts (Auth, Notes)
│   ├── lib/                 # Utilities & API configs
│   ├── App.tsx              # Main app
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles

backend/
├── src/
│   ├── config/              # DB connection, env setup
│   ├── models/              # Mongoose schemas
│   ├── routes/              # Express routes (auth, notes)
│   ├── middlewares/         # JWT, rate-limit, error handling
│   ├── controllers/         # Route logic
│   ├── utils/               # OTP, email, JWT helpers
│   └── server.ts            # Express app entry
```

---

## 🔐 Features  

### Authentication  
- Email/OTP login  
- Google OAuth login  
- JWT access + refresh tokens  
- Keep-me-logged-in option  

### Notes  
- Create, view, update, and delete notes  
- Real-time sync across devices (Socket.IO)  
- Responsive grid layout  

### Security  
- JWT authentication  
- Password hashing (bcrypt)  
- Role-based access control  
- Rate limiting  

---

## 🚀 Deployment  

- **Frontend**: Vercel, Netlify, Cloudflare Pages  
- **Backend**: Render, Railway, Vercel (Serverless), or VPS  
- **Database**: MongoDB Atlas  

Make sure to add all environment variables in your hosting platform.  

---

## 🤝 Contributing  

1. Fork the repository  
2. Create a new feature branch  
3. Make your changes  
4. Test thoroughly  
5. Submit a PR  

---

## 📜 License  

This project is open source under the [MIT License](LICENSE).  
