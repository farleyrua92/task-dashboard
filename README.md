# Task Management Dashboard

A task dashboard built with Next.js, React, and Tailwind CSS.

## Getting started

Requires Node 20+.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Project structure

```
app/
  layout.tsx        Root layout. Header + <main>.
  page.tsx           Owns the task list state.
  globals.css        Tailwind v4.

components/
  ui/
    Button.tsx
    Input.tsx
  layout/
    Header.tsx
  tasks/
    TaskTable.tsx
    TaskRow.tsx
    TaskForm.tsx

hooks/
  useTaskForm.ts

lib/
  types.ts
```

## Roadmap

- Move task data to API routes with loading/error states and file upload.
- Add tests with Vitest + React Testing Library.
- Refactor into container/layout components as the app grows.
