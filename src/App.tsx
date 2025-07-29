import { ExpenseProvider } from './context/ExpenseContext';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import './App.css';

function App() {
  return (
    <ExpenseProvider>
      <div className="app">
        <header className="app-header">
          <h1>💰 Expense Management</h1>
          <p>Track your spending and manage your budget</p>
        </header>
        
        <main className="app-main">
          <div className="container">
            <div className="row">
              <div className="col-left">
                <ExpenseForm />
                <ExpenseSummary />
              </div>
              <div className="col-right">
                <ExpenseList />
              </div>
            </div>
          </div>
        </main>
        
        <footer className="app-footer">
          <p>&copy; 2025 Expense Management App. Built with React & TypeScript.</p>
        </footer>
      </div>
    </ExpenseProvider>
  );
}

export default App;
