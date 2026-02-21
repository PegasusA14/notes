# 📝 NotesApi

A RESTful Notes API built with **ASP.NET Core 9** and **PostgreSQL** as a hands-on .NET learning project.  
Covers JWT authentication, EF Core migrations, and relational data — built step by step from scratch.

---

## 🧠 Purpose

This project is a personal **.NET refreshment exercise** to learn:
- ASP.NET Core 9 Web API structure
- Entity Framework Core with PostgreSQL
- Custom JWT authentication (no OAuth)
- REST API design with relational data

---

## 🛠️ Tech Stack

| Layer         | Technology                |
|---------------|---------------------------|
| Runtime       | .NET 9                    |
| Framework     | ASP.NET Core 9 Web API    |
| ORM           | Entity Framework Core 9   |
| Database      | PostgreSQL 17             |
| Auth          | Custom JWT (JwtBearer)    |
| Password Hash | BCrypt.Net-Next           |
| Platform      | Ubuntu 25 / Linux         |

---

## 📁 Project Structure

```
NotesApi/
├── Controllers/     # Route handlers (Auth, Notes, Folders)
├── Data/            # AppDbContext — EF Core database context
├── DTOs/            # Request & Response shapes
├── Models/          # Database entities (User, Note, Folder)
├── Services/        # Business logic (JWT, Auth)
├── Migrations/      # EF Core auto-generated migrations
├── appsettings.json # App configuration
└── Program.cs       # Entry point & middleware registration
```

---

## 🗄️ Data Models

```
User
 ├── Id, Name, Email, PasswordHash, CreatedAt
 ├── has many Notes
 └── has many Folders

Folder
 ├── Id, Name, CreatedAt
 ├── belongs to User
 └── has many Notes

Note
 ├── Id, Title, Content, CreatedAt, UpdatedAt
 ├── belongs to User
 └── optionally belongs to Folder
```

---

## 🔐 API Endpoints

### Auth
| Method | Endpoint         | Description       | Auth |
|--------|------------------|-------------------|------|
| POST   | `/auth/register` | Register new user | ❌   |
| POST   | `/auth/login`    | Login, get JWT    | ❌   |

### Notes
| Method | Endpoint       | Description     | Auth |
|--------|----------------|-----------------|------|
| GET    | `/notes`       | Get all notes   | ✅   |
| GET    | `/notes/{id}`  | Get single note | ✅   |
| POST   | `/notes`       | Create note     | ✅   |
| PUT    | `/notes/{id}`  | Update note     | ✅   |
| DELETE | `/notes/{id}`  | Delete note     | ✅   |

### Folders
| Method | Endpoint          | Description      | Auth |
|--------|-------------------|------------------|------|
| GET    | `/folders`        | Get all folders  | ✅   |
| POST   | `/folders`        | Create folder    | ✅   |
| DELETE | `/folders/{id}`   | Delete folder    | ✅   |

---

## ⚙️ Local Setup

### Prerequisites
- .NET 9 SDK
- PostgreSQL 17

### Steps

```bash
# Clone the repo
git clone https://github.com/yourusername/NotesApi.git
cd NotesApi/backend/NotesApi

# Restore packages
dotnet restore

# Set your DB password in appsettings.json
# "Default": "Host=localhost;Port=5432;Database=notesdb;Username=postgres;Password=yourpassword"

# Run migrations
dotnet ef database update

# Start the server
dotnet run
```

API runs at `http://localhost:5000`

---

## 🔑 Auth Flow

1. `POST /auth/register` → creates user with hashed password
2. `POST /auth/login` → validates password, returns JWT token
3. Add token to all protected requests:

```
Authorization: Bearer <your_token>
```

---

## 📚 Learning Notes

This project was built as a step-by-step guided exercise.  
Coming from a Node.js / NestJS background — key mental model shifts:

| Node.js / NestJS     | ASP.NET Core Equivalent    |
|----------------------|----------------------------|
| `package.json`       | `.csproj`                  |
| `npm install`        | `dotnet add package`       |
| Mongoose / Prisma    | Entity Framework Core      |
| `prisma migrate dev` | `dotnet ef migrations add` |
| `express-jwt`        | `JwtBearer` middleware     |
| `bcryptjs`           | `BCrypt.Net-Next`          |
| NestJS DI container  | `builder.Services`         |
| `.env`               | `appsettings.json`         |
