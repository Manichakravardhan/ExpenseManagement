import React from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { formatCurrency } from '../utils/expenseUtils';
import './ExpenseSummary.css';

const ExpenseSummary: React.FC = () => {
  const { summary, filteredExpenses } = useExpenses();

  const topCategories = Object.entries(summary.categoryBreakdown)
    .filter(([, amount]) => amount > 0)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="expense-summary">
      <div className="summary-header">
        <h3>Expense Summary</h3>
      </div>
      
      <div className="summary-stats">
        <div className="stat-card">
          <div className="stat-value">{formatCurrency(summary.totalAmount)}</div>
          <div className="stat-label">Total Spent</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{summary.totalCount}</div>
          <div className="stat-label">Total Expenses</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">
            {summary.totalCount > 0 ? formatCurrency(summary.totalAmount / summary.totalCount) : '$0.00'}
          </div>
          <div className="stat-label">Average per Expense</div>
        </div>
      </div>

      {topCategories.length > 0 && (
        <div className="category-breakdown">
          <h4>Top Categories</h4>
          <div className="category-list">
            {topCategories.map(([category, amount]) => {
              const percentage = summary.totalAmount > 0 ? (amount / summary.totalAmount) * 100 : 0;
              return (
                <div key={category} className="category-item">
                  <div className="category-info">
                    <span className="category-name">{category}</span>
                    <span className="category-amount">{formatCurrency(amount)}</span>
                  </div>
                  <div className="category-bar">
                    <div 
                      className="category-fill"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="category-percentage">{percentage.toFixed(1)}%</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {filteredExpenses.length === 0 && (
        <div className="no-data">
          <p>No expense data to display. Start by adding some expenses!</p>
        </div>
      )}
    </div>
  );
};

export default ExpenseSummary;
