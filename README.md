# Idea Sharing Platform

An idea sharing platform where users can post, comment, like, and follow each other.

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Description

This platform allows users to share their ideas by posting them. Other users can comment on, like, and follow the ideas and authors they find interesting.

## Features

- User authentication (sign up, login)
- Create, read, update, delete ideas
- Comment on ideas
- Light(Like) ideas
- Follow other users
- Search for ideas by title, content, and author
- Notifications

## Technologies Used

- **Frontend**: React, Next.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/Omar-Al-Azzawi/IdeasHub.git
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

cp .env.example .env

```bash
POSTGRES_PRISMA_URL=postgresql://username:password@localhost:5432/your-database
```

4. Generate Prisma Client

```bash
npx prisma generate
```

5. Apply database migrations

```bash
npx prisma migrate dev
```

5. Start the development server

```bash
npm run dev
```

### Additional Notes

- Update the repository URL in the `git clone` command to match your repository.
- Add any additional environment variables required by your project in the `.env` section.
- Include the exact scripts used to start the server if they are different from the standard `npm run dev`.
- Ensure the contribution guidelines match your project's workflow and coding standards.