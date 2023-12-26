# Gakko: A Backend API for Online School Management Services

Gakko is a comprehensive School Management System developed using the Node.js and Nuxt.js frameworks. This project was built following a Test-Driven Development (TDD) approach with Jest, ensuring robust and reliable functionality.

## Features

The system manages various entities integral to any educational institution:

- **Students**: Keeping track of student data and academic progress.
- **Teachers**: Facilitating teacher profiles and their respective courses.
- **Courses**: Detailed course management including syllabus, schedule, and enrolled students.
- **Assignments**: Assignment creation, submission, and grading.
- **Grades**: Comprehensive grade management for all courses.
- **Attendance**: Daily attendance tracking for students.

## Database

PostgreSQL (Supabase) is used as the database for storing all these entities, providing efficient, secure, and scalable data storage and retrieval.

By providing these features, Gakko aims to streamline the administrative tasks of educational institutions, making school management an effortless task.

## Database Schema

The system uses the following database schema:

### Student
| Field          |
|----------------|
| id             |
| name           |
| email          |
| phone_number   |
| grade_level_id |

### Course
| Field          |
|----------------|
| id             |
| name           |
| description    |
| teacher_id     |
| grade_level_id |

### Assignment
| Field      |
|------------|
| id         |
| name       |
| description|
| due_date   |
| course_id  |

### Teacher
| Field        |
|--------------|
| id           |
| name         |
| email        |
| phone_number |
| subject      |

### Grade
| Field        |
|--------------|
| id           |
| student_id   |
| assignment_id|
| score        |

### Attendance
| Field      |
|------------|
| id         |
| student_id |
| date       |
| status     |

## API Endpoints

The system provides the following API endpoints:

### Student Endpoints:
- POST /students: Create a new student.
- GET /students/:id: Retrieve a specific student by ID.
- PUT /students/:id: Update a specific student by ID.
- DELETE /students/:id: Delete a specific student by ID.

### Course Endpoints:
- POST /courses: Create a new course.
- GET /courses/:id: Retrieve a specific course by ID.
- PUT /courses/:id: Update a specific course by ID.
- DELETE /courses/:id: Delete a specific course by ID.

### Assignment Endpoints:
- POST /assignments: Create a new assignment.
- GET /assignments/:id: Retrieve a specific assignment by ID.
- PUT /assignments/:id: Update a specific assignment by ID.
- DELETE /assignments/:id: Delete a specific assignment by ID.

### Teacher Endpoints:
- POST /teachers: Create a new teacher.
- GET /teachers/:id: Retrieve a specific teacher by ID.
- PUT /teachers/:id: Update a specific teacher by ID.
- DELETE /teachers/:id: Delete a specific teacher by ID.

### Grade Endpoints:
- POST /grades: Create a new grade.
- GET /grades/:id: Retrieve a specific grade by ID.
- PUT /grades/:id: Update a specific grade by ID.
- DELETE /grades/:id: Delete a specific grade by ID.

### Attendance Endpoints:
- POST /attendance: Create a new attendance record.
- GET /attendance/:id: Retrieve a specific attendance record by ID.
- PUT /attendance/:id: Update a specific attendance record by ID.
- DELETE /attendance/:id: Delete a specific attendance record by ID.

<img src="https://i.ibb.co/tpqDyjC/Gakko.png">

# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
