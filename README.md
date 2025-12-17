# Wise Payments Frontend

A React frontend for a fintech-style payments system, inspired by Wise-like money movement flows.  
This application connects to a live Spring Boot backend and demonstrates real-world account management, transfers, and transaction history with a clean, interactive UI.

---

## 🌍 Live Demo

- **Frontend**: https://payment-system-frontend-17jm.onrender.com  
- **Backend API**: https://wise-payments-microservice.onrender.com  
- **Backend Repository**: https://github.com/chais09/wise-payments-microservice/

---

## ✨ Features

- Create multi-currency accounts
- Deposit and withdraw funds
- Transfer money between accounts
- View real-time account balances
- View transaction history per account
- Delete accounts with business validation (balance must be zero)
- Interactive UI with hover and selection states
- Fully integrated with a live backend API

---

## 🧠 Key Concepts Demonstrated

- Explicit state management with React hooks (`useState`, `useEffect`)
- Parent → child communication via callbacks
- Dependency-driven data refresh patterns
- Fintech-style UX cues (hover, selection, confirmation)
- Safe handling of destructive actions (delete confirmation)
- Clear separation of concerns between UI and API logic

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- JavaScript (ES6+)
- Axios
- CSS (custom, interaction-focused)

### Backend (separate repository)
- Java 17
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Docker
- Render (cloud deployment)

---

## 📂 Project Structure
src/
├─ api/
│ └─ api.js # Axios API client
├─ components/
│ ├─ AccountList.jsx
│ ├─ BalanceActionForm.jsx
│ ├─ CreateAccountForm.jsx
│ ├─ TransferForm.jsx
│ └─ TransactionList.jsx
├─ App.jsx
├─ main.jsx
└─ index.css

---

## 🔌 API Integration

The frontend communicates with the backend via REST APIs:

- GET /api/v1/accounts
- POST /api/v1/accounts
- POST /api/v1/accounts/{id}/deposit
- POST /api/v1/accounts/{id}/withdraw
- DELETE /api/v1/accounts/{id}
- POST /api/v1/transfers
- GET /api/v1/accounts/{id}/transactions

---

## 🎨 UI & UX Notes

- Account cards respond to hover and click to clearly indicate interactivity
- Selected account is visually highlighted to show active context
- Subtle animations improve discoverability without distraction
- Designed to resemble real fintech dashboards rather than demo UIs

---

## 📈 Possible Improvements

- Authentication & authorization
- Pagination for transaction history
- Multi-currency FX conversion
- Enhanced form validation
- UI framework integration (e.g. Tailwind or component library)
- Unit and integration tests

---

## 🧑‍💻 Author

Built by Chai Seng Loi as a full-stack fintech learning project, focusing on correctness, clarity, and real-world design patterns.