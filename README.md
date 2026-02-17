# 🩺 DocSpot

🆔 *Team ID:* LTVIP2026TMIDS81521

## 🏥 Overview

DocSpot is a modern, full-stack web application for seamless and secure management of doctor appointments.  
Built with the MERN stack, DocSpot simplifies healthcare appointment scheduling and management for patients, doctors, and administrators.  
The system is designed with a responsive, user-friendly interface and robust backend APIs to deliver an efficient digital healthcare experience.

---

## ✨ Key Features

### 👤 Patient Portal
- Secure patient registration and login
- Search doctors by specialization and location
- Book, cancel, or reschedule appointments
- View appointment history and receive notifications

### 🩺 Doctor Portal
- Doctor registration and profile management
- Manage availability and appointment slots
- View and update appointment statuses
- Access patient information

### 🛡 Admin Portal
- Approve or reject doctor applications
- View all appointments in the system

### 🔐 General System Features
- JWT-based authentication and role-based authorization
- Responsive and mobile-friendly UI
- Real-time feedback and notifications

---

## 🛠 Technology Stack

| Layer      | Technologies                                   |
|------------|-----------------------------------------------|
| Frontend   | React.js, Axios, Ant Design, Bootstrap        |
| Backend    | Node.js, Express.js                           |
| Database   | MongoDB                                       |
| Auth       | JWT, bcrypt                                   |

---

## 📦 Project Structure


/
├── frontend/    # React SPA (User, Doctor, Admin portals)
├── backend/     # Express.js backend (APIs, controllers, models)
└── ...          # Configs, documentation, etc.


---

## 🛠 Getting Started

### Frontend

The frontend is powered by [Create React App](https://github.com/facebook/create-react-app).

#### Available Scripts

Inside the frontend/ directory, you can run:

- npm start — Run app in development (http://localhost:3000)
- npm test — Start interactive test runner
- npm run build — Build for production
- npm run eject — Eject configuration (irreversible)

For more, see [Create React App docs](https://facebook.github.io/create-react-app/docs/getting-started).

---
## ⚙ Installation & Setup

1. *Clone the repository:*
   bash
   git clone https://github.com/rohithchennuri/DocSpot-Doctor-Appointment-Booking
   
2. *Install dependencies:*
   - For backend:
     bash
     cd backend
     npm install
     
   - For frontend:
     bash
     cd ../frontend
     npm install
     
3. *Set up environment variables:*  
   Create a .env file in the backend/ directory.  
   Configure MongoDB connection, JWT secret, and other required settings.

4. *Start development servers:*
   - Backend:
     bash
     npm start
     
   - Frontend (in a new terminal):
     bash
     npm start
     

---
## 🚀 Usage

- Visit http://localhost:3000 in your browser.
- Register or log in as a Patient or Doctor.
- Admin can log in via the admin dashboard.
- Explore appointment booking, doctor application, management, and more.

---
## 📚 Learn More

- [React documentation](https://reactjs.org/)
- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.  
Check out the [issues page](https://github.com/rohithchennuri/DocSpot-Doctor-Appointment-Booking/issues) to get started.

---

## 📝 License

Currently unlicensed.  
Open an issue to discuss licensing if you wish to use this project.

---

## 👤 Author

- [Chennuri Rohith Venkat](https://github.com/rohithchennuri)

---

> DocSpot: Making healthcare appointment management seamless for everyone.

---

*[View more or contribute on GitHub →](https://github.com/rohithchennuri/DocSpot-Doctor-Appointment-Booking)*