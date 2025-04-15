# SocialSch

This a fullstack social media application using NestJS and Next.js.
It uses several libraries and tools to provide a great developer experience and a good user experience,
including shadcn/ui, ESLint, Prettier, and GitHub Actions.

## Getting Started

### Prerequisites

- Node.js 22
- Pnpm 10

### Installation

You only need to install dependencies in the root directory.

```bash
pnpm install
```

### Environment Variables

You need to create a `.env` file in the root directory of the backend and frontend
projects.
The `.env.example` files are provided as a reference.
In the backend env file you need to set the `DATABASE_URL` variable to your database connection string.
It has to contain the same values as the `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, and `POSTGRES_PORT` variables.
In the frontend env file you need to set the `NEXT_PUBLIC_API_URL` variable to your backend API URL.

### Database

If you are using PostgreSQL, you can use the provided Docker Compose file to run a PostgreSQL database.
You have to populate the `.env` file in the backend project beforehand.
You have to `cd` into the `apps/backend` folder and run the following command to start the database.

```bash
docker-compose up -d
```

### Linter and Formatter Configuration

It is a must to use ESLint and Prettier in this project.

Set up ESLint and Prettier in your IDE and check `fix on save` or `format on save` options.

You can run the following commands to check linting and formatting issues.

```bash
pnpm lint
# or
pnpm lint:fix
```

```bash
pnpm format:check
# or
pnpm format
```

### Development

You can run the backend and frontend separately.

```bash
pnpm start:backend # Starts on http://localhost:3001
```

```bash
pnpm start:frontend # Starts on http://localhost:3000
```

### After Development

You can build the frontend and run the application.

```bash
pnpm build:frontend
```

Or build the backend.

```bash
pnpm build:backend
```

There are recommended GitHub Actions workflows for this setup, which will fail if one of the following commands fails:

```bash
pnpm lint
```

```bash
pnpm format:check
```

```bash
pnpm build:backend
```

## Happy Coding!
