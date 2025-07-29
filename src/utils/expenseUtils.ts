import type { Expense, ExpenseFilters, ExpenseSummary } from '../types/expense';
import { ExpenseCategory } from '../types/expense';

export const generateExpenseId = (): string => {
  return `expense_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const filterExpenses = (expenses: Expense[], filters: ExpenseFilters): Expense[] => {
  return expenses.filter(expense => {
    // Category filter
    if (filters.category && expense.category !== filters.category) {
      return false;
    }

    // Date range filter
    if (filters.startDate && expense.date < filters.startDate) {
      return false;
    }
    if (filters.endDate && expense.date > filters.endDate) {
      return false;
    }

    // Amount range filter
    if (filters.minAmount !== undefined && expense.amount < filters.minAmount) {
      return false;
    }
    if (filters.maxAmount !== undefined && expense.amount > filters.maxAmount) {
      return false;
    }

    // Search term filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      return expense.description.toLowerCase().includes(searchLower);
    }

    return true;
  });
};

export const calculateExpenseSummary = (expenses: Expense[]): ExpenseSummary => {
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalCount = expenses.length;

  // Category breakdown
  const categoryBreakdown: Record<ExpenseCategory, number> = {
    [ExpenseCategory.FOOD]: 0,
    [ExpenseCategory.TRANSPORTATION]: 0,
    [ExpenseCategory.ENTERTAINMENT]: 0,
    [ExpenseCategory.UTILITIES]: 0,
    [ExpenseCategory.HEALTHCARE]: 0,
    [ExpenseCategory.SHOPPING]: 0,
    [ExpenseCategory.EDUCATION]: 0,
    [ExpenseCategory.TRAVEL]: 0,
    [ExpenseCategory.OTHER]: 0,
  };

  expenses.forEach(expense => {
    categoryBreakdown[expense.category] += expense.amount;
  });

  // Monthly breakdown
  const monthlyBreakdown: Record<string, number> = {};
  expenses.forEach(expense => {
    const monthKey = expense.date.toISOString().substr(0, 7); // YYYY-MM format
    monthlyBreakdown[monthKey] = (monthlyBreakdown[monthKey] || 0) + expense.amount;
  });

  return {
    totalAmount,
    totalCount,
    categoryBreakdown,
    monthlyBreakdown,
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export const sortExpensesByDate = (expenses: Expense[], order: 'asc' | 'desc' = 'desc'): Expense[] => {
  return [...expenses].sort((a, b) => {
    const dateA = a.date.getTime();
    const dateB = b.date.getTime();
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
};

export const exportExpensesToCSV = (expenses: Expense[]): string => {
  const headers = ['Date', 'Description', 'Category', 'Amount'];
  const csvContent = [
    headers.join(','),
    ...expenses.map(expense => [
      formatDate(expense.date),
      `"${expense.description}"`,
      expense.category,
      expense.amount.toString()
    ].join(','))
  ].join('\n');

  return csvContent;
};
