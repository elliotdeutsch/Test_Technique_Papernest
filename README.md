# TestTechniquePapernest

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.1.

## Overview

This project is a Todo List application built with Angular 19. It allows users to manage their tasks in a modern, interactive, and visually appealing interface. The app includes features like task creation, editing, deletion, drag & drop reordering, filtering, sorting, a dark mode, and even a celebratory confetti animation when all tasks are completed.

## Application Features

- **Task Management**

  - Add new tasks with a title and (optionally) an expiration date.
  - Edit task labels directly in the list.
  - Delete tasks when they are no longer needed.
  - Mark tasks as completed or pending using a custom checkbox.

- **Reordering Tasks**

  - Drag and drop tasks to arrange them in your preferred order.

- **Filtering and Sorting**

  - **Filtering:** View all tasks, only completed tasks, only pending tasks, expired tasks, or tasks expiring soon.
  - **Sorting:** Sort tasks by custom order (drag & drop order), alphabetical order, date of creation (newest to oldest), or by expiration date (soonest first).

- **Expiration Date Management**

  - Assign an expiration date to tasks using a date picker.
  - Friendly messages display whether a task expires today, tomorrow, in a few days, or if it has already expired.

- **Search Functionality**

  - A search bar allows you to quickly find tasks based on their title.

- **Dark Mode**

  - Toggle between light and dark themes. The chosen theme is saved and persists across sessions.

- **Celebratory Animation**

  - When all tasks are completed, a confetti animation is triggered to celebrate your accomplishment.

- **Data Persistence**
  - All tasks and settings (such as dark mode) are stored locally, ensuring that your data is preserved even after a page reload.

## Architecture

The project is organized into three main sections to promote modularity and maintainability:

- **core/**

  - **interfaces/**: Contains the TypeScript interfaces (e.g., the Task interface) defining the data structures used throughout the application.
  - **services/**: Houses global services such as the TaskService which manages the state of tasks, filtering, sorting, and persistence via local storage.
  - **utils/**: Contains utility functions (e.g., date utilities) shared across the application.

- **features/**

  - **components/**: Includes components specific to the tasks feature, such as the Task List and Task Item components.
  - **pages/**: Contains full-page components (e.g., Home Page) that represent complete views or screens within the app.

- **shared/**
  - **add-task-field/**: Component for adding new tasks.
  - **buttons/**: Reusable button components (e.g., action buttons, color mode button, dropdown button, reset button).
  - **custom-checkbox/**: A customized checkbox component.
  - **header/**: The header component that displays the title, task counts, and triggers the confetti animation.
  - **no-data/**: A component displayed when there are no tasks.
  - **search-bar/**: A reusable search bar component.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the Jest test runner, use the following command:

```bash
npm run test
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
