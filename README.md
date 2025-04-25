# Gym Management Web Application

This is a full-stack web application for managing a gym, developed using **Angular** for the frontend, **Node.js** with **Express** for the backend, and **MongoDB** for the database.

The platform provides features for **admins**, **coaches**, and **clients** (adherents), allowing each role to interact with the system according to their responsibilities.

---

## Features

### Client (Adherent)
- Register and log in
- Book group classes or request private coaching sessions
- View subscription status and get renewal alerts
- Track personal performance
- Receive notifications for upcoming classes

### Coach
- Automatically activated account
- View and respond to private coaching requests

### Admin
- Manage subscriptions, courses, coaches, and clients
- Validate new client accounts
- Add or remove coaches and group classes

---

## Technologies Used

### Frontend
- Angular

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Containerization
- Docker (Docker images for frontend and backend)
- Docker Compose for orchestration

---

## Class Diagram

![Class Diagram](https://github.com/user-attachments/assets/89bfc084-5d0f-404a-985c-27b3d4315e1d)

---

## Use Case Diagram

![Use Case Diagram](https://github.com/user-attachments/assets/5030cc20-fe5e-48cb-ba8e-1eca4e332fe5)

---

## Screenshots

> Add screenshots of the web application UI here (e.g., dashboard, booking page, admin panel, etc.)

---

## Installation & Setup

### Prerequisites
- Node.js and npm
- Angular CLI
- MongoDB
- Docker and Docker Compose

### Running with Docker

1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

2. Start the containers

```bash
docker-compose up --build
```

The frontend will be available on `http://localhost:4200`, and the backend on `http://localhost:3000` (or as configured).

### Running Locally Without Docker

#### Backend

```bash
cd backend
npm install
npm start
```

#### Frontend

```bash
cd frontend
npm install
ng serve
```

---

## License

This project is licensed under the [MIT License](LICENSE).
