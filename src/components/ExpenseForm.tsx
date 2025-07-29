import React, { useState } from 'react';
import type { ExpenseInput } from '../types/expense';
import { ExpenseCategory } from '../types/expense';
import { useExpenses } from '../context/ExpenseContext';
import './ExpenseForm.css';

interface ExpenseFormProps {
  onSubmit?: () => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSubmit }) => {
  const { addExpense } = useExpenses();
  const [formData, setFormData] = useState<ExpenseInput>({
    amount: 0,
    description: '',
    category: ExpenseCategory.OTHER,
    date: new Date()
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    if (!formData.description.trim()) {
      alert('Please enter a description');
      return;
    }

    addExpense(formData);
    
    // Reset form
    setFormData({
      amount: 0,
      description: '',
      category: ExpenseCategory.OTHER,
      date: new Date()
    });

    onSubmit?.();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : 
               name === 'date' ? new Date(value) : 
               value
    }));
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h3>Add New Expense</h3>
      
      <div className="form-group">
        <label htmlFor="amount">Amount ($)</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount || ''}
          onChange={handleInputChange}
          min="0.01"
          step="0.01"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Enter expense description..."
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
        >
          {Object.entries(ExpenseCategory).map(([key, value]) => (
            <option key={key} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date.toISOString().split('T')[0]}
          onChange={handleInputChange}
          required
        />
      </div>

      <button type="submit" className="submit-button">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
