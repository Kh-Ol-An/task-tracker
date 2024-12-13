# Task Tracker

This repository contains a test project built with Nuxt 3 and Vue.js as part of a simplified frontend implementation of a task management tool similar to Trello or Jira.

---

## Overview

The Task Tracker is a simplified frontend application designed for managing tasks in a team. It provides functionality to create, edit, delete, and organize tasks within a visually intuitive dashboard. Tasks are displayed in columns according to their status, and users can easily drag and drop tasks between columns, automatically updating their status.

### Core Features:
- **Task Management**: Create, edit, and delete tasks with the following fields:
    - Title
    - Description
    - Responsible Person
    - Executors
    - Status (TODO, In Progress, Done)
    - Priority
- **Dashboard**:
    - Columns representing task statuses (TODO, In Progress, Done).
    - Drag-and-drop functionality for task reorganization.
    - Automatic status updates upon dragging between columns.
- **Routing**:
    - Dynamic routing for accessing task details based on task ID (`pages/task/[slug].vue`).
    - Navigation between pages with `NuxtLink`.
- **Global State Management**: Ensures seamless data handling across components.

---

## Minimum Requirements

- **Node.js**: Version 16 or higher.
- **NPM**: Comes with Node.js installation.
- **Browser**: Modern browser with JavaScript support (e.g., Chrome, Firefox).

---

## Technologies Used

- **Nuxt 3**: Framework for building Vue.js applications.
- **Vue.js**: Reactive framework for user interfaces.
- **Pinia**: For global state management.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Vue Draggable**: For drag-and-drop functionality.
- **Vue Router**: For dynamic routing and navigation between pages.

---

## Local Launch Instructions

Follow the steps below to set up and run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/Kh-Ol-An/task-tracker

2. Go to the cloned project folder:
   ```bash
   cd task-tracker

3. Installing dependencies. Make sure you have Node.js installed (recommended version 16 or later):
   ```bash
   npm install

4. Launching a project in development mode:
   ```bash
   npm run dev

5. Open http://localhost:3000 in your browser.


6. Building a project for production:
   ```bash
   npm run build

7. View the assembled project:
   ```bash
   npm run preview

8. Generate static files:
   ```bash
   npm run generate
