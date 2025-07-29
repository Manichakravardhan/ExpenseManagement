import React, { useState } from 'react';
import type { Expense } from '../types/expense';
import { useExpenses } from '../context/ExpenseContext';
import { formatCurrency, formatDate, sortExpensesByDate } from '../utils/expenseUtils';
import './ExpenseList.css';

const ExpenseList: React.FC = () => {
  const { filteredExpenses, deleteExpense } = useExpenses();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedExpenses = sortExpensesByDate(filteredExpenses, sortOrder);

  const handleDelete = (id: string, description: string) => {
    if (window.confirm(`Are you sure you want to delete "${description}"?`)) {
      deleteExpense(id);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(current => current === 'desc' ? 'asc' : 'desc');
  };

  if (sortedExpenses.length === 0) {
    return (
      <div className="expense-list">
        <div className="expense-list-header">
          <h3>Recent Expenses</h3>
        </div>
        <div className="no-expenses">
          <p>No expenses found. Add your first expense above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="expense-list">
      <div className="expense-list-header">
        <h3>Recent Expenses ({sortedExpenses.length})</h3>
        <button 
          className="sort-button"
          onClick={toggleSortOrder}
          title={`Sort ${sortOrder === 'desc' ? 'oldest first' : 'newest first'}`}
        >
          {sortOrder === 'desc' ? '↓ Newest' : '↑ Oldest'}
        </button>
      </div>
      
      <div className="expense-items">
        {sortedExpenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onDelete={() => handleDelete(expense.id, expense.description)}
          />
        ))}
      </div>
    </div>
  );
};

interface ExpenseItemProps {
  expense: Expense;
  onDelete: () => void;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense, onDelete }) => {
  return (
    <div className="expense-item">
      <div className="expense-item-main">
        <div className="expense-item-left">
          <div className="expense-description">{expense.description}</div>
          <div className="expense-meta">
            <span className="expense-date">{formatDate(expense.date)}</span>
            <span className="expense-category">{expense.category}</span>
          </div>
        </div>
        <div className="expense-item-right">
          <div className="expense-amount">{formatCurrency(expense.amount)}</div>
          <button 
            className="delete-button"
            onClick={onDelete}
            title="Delete expense"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;
