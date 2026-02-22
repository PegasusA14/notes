# Full-Stack Notes Application

A modern, responsive, and performant hierarchical Notes application featuring a robust `.NET 8` API backend and a sleek, intuitive `React` + `Vite` frontend stylized with `shadcn/ui` and `Tailwind CSS v4`.

## Features
* **Modern Interface**: Designed with a bright, layered light theme inspired by top-tier modern apps and fully built on top of accessible Radix UI primitives.
* **Hierarchical Folders**: Organize and group your thoughts into dedicated workspaces.
* **Full Authentication**: Secure JWT-based backend authentication with interceptor-driven auto-logout mechanisms on the frontend.
* **Optimistic Data Loading**: Employs TanStack React Query for near-instant search indexing, debounced querying, and reactive cache manipulation.

## Architecture

This Monorepo is divided into distinct, loosely-linked applications:

### `backend/`
- Built on **.NET 8** (C#) using ASP.NET Core Web API.
- Backed by **PostgreSQL** configured via Entity Framework Core.
- Features JWT Authentication and custom CORS configurations.
- Serves automatically on port `http://localhost:5024`.

### `frontend/`
- Built with **React** running on the insanely fast **Vite** bundler (`v7.3`).
- Fully stylized using **Tailwind CSS v4** variables.
- Component interface natively powered by **shadcn/ui**.
- Routing handled by React Router DOM.
- State scaling handled gracefully by Zustand stores.

## Getting Started

### Prerequisites
- [Bun](https://bun.sh/) or Node.js to install frontend modules.
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) to compile the API.
- PostgreSQL server (or an equivalent EF Core provider mapping).

### Running Locally

To run the application locally, you will need to open two separate terminal windows.

**1. Launch the Backend**
```bash
cd backend
dotnet ef database update
dotnet run
```
This initializes your database tables and boots the API, hosting it on `http://localhost:5024`.

**2. Launch the Frontend**
```bash
cd frontend
bun install
bun run dev
```
This serves the Vite frontend on `http://localhost:5173`. Open your browser to hit the landing page!
