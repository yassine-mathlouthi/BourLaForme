# 🏋️‍♀️ Gym Management Web Application

This is a full-stack web application for managing a gym, developed using **Angular** for the frontend, **Node.js** with **Express** for the backend, and **MongoDB** for the database.

The platform provides features for **admins**, **coaches**, and **clients** (adherents), allowing each role to interact with the system according to their responsibilities.

---

## 🚀 Features

### 👤 Client (Adherent)
- Register and log in
- Book group classes or request private coaching sessions
- View subscription status and get renewal alerts
- Track personal performance
- Receive notifications for upcoming classes

### 🧑‍🏫 Coach
- Automatically activated account
- View and respond to private coaching requests

### 🛠️ Admin
- Manage subscriptions, courses, coaches, and clients
- Validate new client accounts
- Add or remove coaches and group classes

---

## 🧱 Technologies Used

### Frontend
- Angular

### Backend
- Node.js
- Express.js

### Database
- MongoDB

---

## 🔐 User Roles

| Role   | Account Validation | Subscription | Can Book Classes | Can Request Private Coaching |
|--------|--------------------|--------------|------------------|------------------------------|
| Admin  | Auto-active        | ❌           | ❌               | ❌                           |
| Coach  | Auto-active        | ❌           | ❌               | ✅                           |
| Client | Requires validation| ✅           | ✅               | ✅                           |

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js and npm
- Angular CLI
- MongoDB

### Backend
```bash
cd backend
npm install
npm start

### FrontEnd
```bash
cd frontend
npm install
ng serve

## 📄 License

This project is licensed under the [MIT License](LICENSE).




