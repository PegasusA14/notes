# Notes App: ASP.NET Core Backend

This directory houses the foundational REST API backend for the Notes App, utilizing ASP.NET Core, Entity Framework, PostgreSQL, and BCrypt for a secure authentication-focused design.

## Technical Stack
- **Framework**: .NET 8 (C# 12)
- **Database ORM**: Entity Framework Core `Npgsql.EntityFrameworkCore.PostgreSQL`
- **Security Auth**: `Microsoft.AspNetCore.Authentication.JwtBearer` & `BCrypt.Net-Next`

## Core Requirements & Config
1. **Database Schema**: Before running, ensure you have setup a Postgres server matching your Default Connection String stored inside `appsettings.json`.
2. **Migrations**: Ensure you invoke `dotnet ef migrations add InitialCreate` and `dotnet ef database update` to stamp out the tables (Users, Notes, Folders).
3. **CORS Restrictions**: The `Program.cs` file natively whitelists inbound CORS requests arriving exclusively from `http://localhost:5173`. If you modify Vite's listener, update the backend policies.

## Project Structure

* **`/Controllers`**: Defines the routing for `AuthController` (Registration/Login/Me), `FoldersController` (Grouping logic), and `NotesController` (CRUD logic).
* **`/Models`**: The core data entities (`User`, `Folder`, `Note`) tied sequentially to `AppDbContext`.
* **`/DTOs`**: Data Transfer Objects structured explicitly to shape outbound JSON securely without dropping credentials.

## Commands

```bash
# Clean the project
dotnet clean

# Re-build the application natively
dotnet build

# Apply the EF context to your active Postgres cluster
dotnet ef database update

# Boot the API daemon (Kestrel) securely on port 5024
dotnet run
```
