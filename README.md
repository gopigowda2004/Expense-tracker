# Expense-tracker

# 💸 Expense Tracker

A full-stack web application to manage your personal expenses — built using **Spring Boot (Java)**, **PostgreSQL**, and **React**.

---

## 🚀 Tech Stack

- Java 21
- Spring Boot 3.2.5
- Spring Security + JWT
- PostgreSQL
- JPA (Hibernate)
- Maven
- React.js
- Postman – API testing
- Git & GitHub – Version control
- VS Code

---

## 📦 Features

- 🔐 User registration and login (JWT Authentication)
- ➕ Add, edit, delete expenses
- 📊 View categorized expenses
- 📅 Filter by date or category
- 📈 Monthly expense overview (upcoming)
- 📬 Secure API endpoints using Spring Security

---

## 🧑‍💻 How it Works

1. **User Authentication**:
   - Register and login endpoints secured using JWT.
   - Auth token must be included in headers for protected routes.

2. **Expense Management**:
   - Authenticated users can add, update, delete, and view their own expenses.
   - Each expense is associated with a user in the database.

3. **Database**:
   - PostgreSQL stores user and expense data.
   - JPA handles object-relational mapping.

---

## 🛣️ API Endpoints

| Method | Endpoint                | Description              |
|--------|-------------------------|--------------------------|
| POST   | `/auth/register`        | Register new user        |
| POST   | `/auth/login`           | Login and get JWT token  |
| GET    | `/expenses`             | List all expenses (auth) |
| POST   | `/expenses`             | Add expense (auth)       |
| PUT    | `/expenses/{id}`        | Update expense (auth)    |
| DELETE | `/expenses/{id}`        | Delete expense (auth)    |

