# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is an expense management TypeScript React application built with Vite. The application allows users to track, categorize, and manage their expenses.

## Tech Stack
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: CSS Modules or styled-components (to be determined)
- **State Management**: React Context API or Redux Toolkit (to be determined)
- **Date Handling**: date-fns or dayjs
- **Form Handling**: React Hook Form
- **Charts/Visualization**: Chart.js or Recharts

## Key Features
- Add, edit, and delete expenses
- Categorize expenses (Food, Transportation, Entertainment, etc.)
- Date-based filtering and searching
- Monthly/yearly expense summaries
- Data visualization with charts
- Export functionality
- Local storage persistence

## Code Style Guidelines
- Use functional components with hooks
- Implement TypeScript interfaces for all data structures
- Follow React best practices (component composition, prop drilling avoidance)
- Use descriptive variable and function names
- Implement proper error handling
- Add JSDoc comments for complex functions
- Use consistent file naming conventions (PascalCase for components, camelCase for utilities)

## Component Structure
- Keep components small and focused on single responsibility
- Use custom hooks for shared logic
- Implement proper prop types with TypeScript interfaces
- Use React.memo for performance optimization where appropriate

## Data Management
- Use TypeScript interfaces for expense data structure
- Implement proper data validation
- Use immutable update patterns
- Consider implementing data persistence layer abstraction
