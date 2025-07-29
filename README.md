# 💰 Expense Management App

A modern, responsive expense tracking application built with React, TypeScript, and Vite. Keep track of your spending, categorize expenses, and gain insights into your financial habits.

## ✨ Features

- **Add & Manage Expenses**: Easily add, edit, and delete expenses
- **Smart Categorization**: Organize expenses by categories (Food, Transportation, Entertainment, etc.)
- **Date-based Filtering**: Filter expenses by date ranges
- **Visual Summaries**: View spending breakdowns with charts and statistics
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Local Storage**: Your data persists between sessions
- **Export Functionality**: Export your expense data to CSV
- **Real-time Updates**: Live expense calculations and summaries

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd ExpenseManagement
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Built With

- **React 18** - Frontend framework
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **CSS3** - Modern styling with Flexbox and Grid
- **Context API** - State management
- **Local Storage** - Data persistence

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ExpenseForm.tsx     # Form for adding expenses
│   ├── ExpenseList.tsx     # List of expenses
│   └── ExpenseSummary.tsx  # Summary statistics
├── context/            # React Context for state management
│   └── ExpenseContext.tsx
├── types/              # TypeScript type definitions
│   └── expense.ts
├── utils/              # Utility functions
│   └── expenseUtils.ts
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🎯 Usage

1. **Adding Expenses**: Fill out the expense form with amount, description, category, and date
2. **Viewing Expenses**: Browse your expenses in the list, sorted by date
3. **Categories**: Expenses are automatically categorized for better organization
4. **Summary**: View total spending, expense count, and category breakdowns
5. **Management**: Delete unwanted expenses with a single click

## 📊 Expense Categories

- Food & Dining
- Transportation
- Entertainment
- Utilities
- Healthcare
- Shopping
- Education
- Travel
- Other

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Customization

The app uses CSS custom properties and modular CSS files. You can easily customize:

- Color schemes in the CSS files
- Add new expense categories in `src/types/expense.ts`
- Modify the summary calculations in `src/utils/expenseUtils.ts`

## 🔐 Data Privacy

All expense data is stored locally in your browser's localStorage. No data is sent to external servers, ensuring your financial information remains private and secure.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



