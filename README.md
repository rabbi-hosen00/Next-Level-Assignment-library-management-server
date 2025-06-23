# 📚 Library Management System API

A feature-rich RESTful API for managing library operations, developed using **Express.js**, **TypeScript**, and **MongoDB** with Mongoose. The system enables book inventory management and secure borrowing with proper validation, filtering, and aggregation logic.

---

## 🚀 Live Demo

🔗 **Live URL**: [Deploy Link Here](https://your-deployment-url.com)

🎥 **Video Walkthrough**: [Watch Here](https://your-video-link.com)

---

## 📦 Tech Stack

- **Backend Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (with Mongoose ODM)
- **Dev Tools**: ts-node-dev, dotenv, ESLint, Prettier

---


---

## ✅ Features

- 📘 **Book Management** – Create, Read, Update, Delete (CRUD)
- 📦 **Borrowing System** – Controlled by availability logic
- 🔎 **Filtering & Sorting** – Filter by genre, sort by any field
- 📊 **Aggregation Pipeline** – View total borrowed quantities per book
- 🔐 **Validation** – Schema validation with Mongoose
- 🔄 **Mongoose Middleware** – `pre` and `post` hooks
- 🧠 **Static/Instance Methods** – Update availability intelligently
- ⚠️ **Robust Error Handling** – Standardized responses for all errors

---

## 🛠️ Getting Started

### 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/library-management-api.git
   cd library-management-api

### API Endpoints

| Method | Endpoint             | Description                |
| ------ | -------------------- | -------------------------- |
| POST   | `/api/books`         | Create a new book          |
| GET    | `/api/books`         | Get all books (with query) |
| GET    | `/api/books/:bookId` | Get book by ID             |
| PUT    | `/api/books/:bookId` | Update book details        |
| DELETE | `/api/books/:bookId` | Delete a book              |


### Sample Create Book Request
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}

### Successful Response:

{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "60f123abc456def789012345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2025-06-23T10:00:00.000Z",
    "updatedAt": "2025-06-23T10:00:00.000Z"
  }
}


