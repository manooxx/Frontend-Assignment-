Accuknox Frontend Assignment 
Overview
The CNAPP Dashboard is a React-based web application designed to provide a customizable and dynamic dashboard experience. Users can personalize their dashboard by adding or removing widgets across different categories. The project leverages React, Tailwind CSS, and manages state efficiently with Redux Toolkit.

Key Features
Dynamic Dashboard: Widgets are organized into categories. Users can add or remove widgets from different categories, personalizing the dashboard according to their needs.
Smooth Animations: The UI offers a sleek, modern feel with smooth transitions and animations using Framer Motion.
Widget Management: Widgets can be added or removed dynamically from categories. A modal is used for adding new widgets, while a floating action triggers widget customization.
Dark Mode: Full support for dark mode, with a neon color theme and blur effects for a vibrant visual experience.
Redux State Management: The application uses Redux Toolkit for handling widget and category data, ensuring that state changes are seamless and consistent.
Components
Dashboard: Displays all categories and their widgets. It allows users to add widgets via a modal or remove them directly.
AllCategories: Handles the category selection and opens the smooth scroll panel for widget customization.
SmoothScrollUp: A scroll-up panel where users can view and manage widgets within a category.
Modal: Allows users to input widget details and add new widgets to the dashboard.
Technologies Used
React (with Vite)
Tailwind CSS: For a responsive, modern UI.
Framer Motion: To create smooth animations and transitions.
Redux Toolkit: For efficient state management.
How to Run
Clone the repository.
Install dependencies: npm install.
Start the development server: npm run dev.
