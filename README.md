# 💬 Realtime Group Chat Application

A full-stack real-time group chat application built with **React + TypeScript** for the frontend and **Node.js + Express + Socket.IO** for the backend. The application enables multiple users to join a chat room, send and receive messages instantly, and view typing indicators.

## 🚀 Tech Stack
<img width="1536" height="695" alt="Screenshot 2026-07-13 121841" src="https://github.com/user-attachments/assets/747304b4-ea2f-4ed3-868b-42b7108ea90d" />


### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Socket.IO Client
* React Hot Toast
* Lucide React

### Backend

* Node.js
* Express.js
* TypeScript
* Socket.IO
* MongoDB
* Mongoose
* CORS
* Dotenv

---

# Features

* Real-time group chat using Socket.IO
* Username-based login (Dummy Authentication)
* Join chat without creating an account
* Typing indicator
* Responsive modern chat UI
* Display online users
* Auto scroll to latest messages
* MongoDB message storage
* Socket disconnection handling

---
<img width="1521" height="692" alt="Screenshot 2026-07-13 121910" src="https://github.com/user-attachments/assets/80d43ea0-f715-40d1-967a-68c45b35d0d8" />

# Project Structure

```
Chat/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
└── README.md
```

---

# Prerequisites

Before running the project, install:

* Node.js (v18 or later)
* npm
* MongoDB (Local or MongoDB Atlas)

---

# Frontend Setup

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

# Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file.

Start the development server:

```bash
npm run dev
```

Backend will run on:

```
http://localhost:3000
```

---

# Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string
```

Example:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/groupchat
```

If using MongoDB Atlas:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/groupchat
```

---

# Running the Application

### Terminal 1

```bash
cd backend
npm run dev
```

### Terminal 2

```bash
cd frontend
npm install
npm run dev
```

Open:

```
http://localhost:5173
```

Open another browser tab or window to simulate multiple users.

---

# Design Decisions

* React with TypeScript was chosen for type safety and maintainability.
* Socket.IO was used because it provides reliable real-time bidirectional communication.
* MongoDB stores chat messages for persistence.
* Dummy username authentication keeps the application simple while satisfying assignment requirements.
* Tailwind CSS was used for a responsive and clean user interface.
* Components were separated for better scalability and code organization.

---

# Assumptions Made

* Users enter only a username to join the chat.
* No passwords or user registration are required.
* All users participate in a single shared group chat room.
* Usernames are not guaranteed to be unique.
* Internet connectivity is assumed during chat usage.

---

# Bonus Features Implemented

* Username-based login (Dummy Authentication)
* Typing Indicator
* Online User Status
* MongoDB Message Storage
* Responsive UI

---

# Future Improvements

* Private messaging
* Authentication using JWT
* Read and delivered message status
* Emoji support
* Image and file sharing
* Multiple chat rooms
* User avatars
* Message search
* Notifications

# GitHub Repository

```
https://github.com/tulsishuka/Chat-Application
```


# Author

**Tulasi Shukla**

Full Stack MERN Developer

GitHub:
https://github.com/tulsishuka
