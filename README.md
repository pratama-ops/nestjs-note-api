# Notes API

A RESTful API built with NestJS, Prisma, and PostgreSQL. Features JWT authentication, per-user data isolation, input validation, and Swagger documentation.

## Tech Stack

- **Framework:** NestJS v11
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma v7
- **Authentication:** JWT (JSON Web Token)
- **Password Hashing:** bcrypt
- **Validation:** class-validator & class-transformer
- **Documentation:** Swagger (OpenAPI)

## Features

- User registration and login with JWT authentication
- Password hashing with bcrypt
- CRUD operations for notes
- Per-user data isolation — users can only access their own notes
- Input validation with descriptive error messages
- Interactive API documentation with Swagger UI

## Project Structure

```
src/
├── auth/
│   ├── dto/
│   │   ├── login.dto/
│   │   │   └── login.dto.ts
│   │   └── register.dto/
│   │       └── register.dto.ts
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── jwt.guard.ts
│   └── jwt.strategy.ts
├── notes/
│   ├── dto/
│   │   ├── create-note.dto.ts
│   │   └── update-note.dto.ts
│   ├── notes.controller.ts
│   ├── notes.module.ts
│   └── notes.service.ts
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
└── main.ts
```

## Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL
- npm

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/notes-api.git
cd notes-api
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/notes_db"
JWT_SECRET="your-secret-key"
```

4. Run database migrations

```bash
npx prisma migrate dev --name init
```

5. Start the development server

```bash
npm run start:dev
```

The API will be running at `http://localhost:3000`.

## API Documentation

Interactive API documentation is available at:

```
http://localhost:3000/api
```

## API Endpoints

### Auth

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | Login and get JWT token | No |

### Notes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/notes` | Get all notes (current user only) | Yes |
| GET | `/notes/:id` | Get a single note by ID | Yes |
| POST | `/notes` | Create a new note | Yes |
| PATCH | `/notes/:id` | Update a note | Yes |
| DELETE | `/notes/:id` | Delete a note | Yes |

## Request & Response Examples

### Register

**POST** `/auth/register`

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

Response:
```json
{
  "message": "Register berhasil",
  "userId": 1
}
```

### Login

**POST** `/auth/login`

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Create Note

**POST** `/notes`

Headers:
```
Authorization: Bearer <access_token>
```

Body:
```json
{
  "title": "My First Note",
  "content": "This is the content of my note"
}
```

Response:
```json
{
  "id": 1,
  "title": "My First Note",
  "content": "This is the content of my note",
  "userId": 1,
  "createdAt": "2026-05-27T03:18:02.593Z",
  "updatedAt": "2026-05-27T03:18:02.593Z"
}
```

## Database Schema

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  notes     Note[]
}

model Note {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  user      User     @relation(fields: [userId], references: [id])
  userId    Int
}
```

## Security

- Passwords are hashed using **bcrypt** before being stored in the database
- Authentication is handled via **JWT tokens** with a configurable expiry (default: 7 days)
- All note endpoints are protected — users can only read, update, or delete their own notes
- Input validation is applied globally using **ValidationPipe** with class-validator decorators
- Database queries are handled by **Prisma ORM**, which prevents SQL injection by default

## License

MIT