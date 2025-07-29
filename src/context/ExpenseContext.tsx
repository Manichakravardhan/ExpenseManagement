import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Expense, ExpenseInput, ExpenseFilters, ExpenseContextType } from '../types/expense';
import { filterExpenses, calculateExpenseSummary, generateExpenseId } from '../utils/expenseUtils';

// Actions
type ExpenseAction =
  | { type: 'ADD_EXPENSE'; payload: ExpenseInput }
  | { type: 'UPDATE_EXPENSE'; payload: { id: string; expense: Partial<ExpenseInput> } }
  | { type: 'DELETE_EXPENSE'; payload: string }
  | { type: 'SET_FILTERS'; payload: ExpenseFilters }
  | { type: 'LOAD_EXPENSES'; payload: Expense[] };

// State
interface ExpenseState {
  expenses: Expense[];
  filters: ExpenseFilters;
}

const initialState: ExpenseState = {
  expenses: [],
  filters: {}
};

// Reducer
const expenseReducer = (state: ExpenseState, action: ExpenseAction): ExpenseState => {
  switch (action.type) {
    case 'ADD_EXPENSE': {
      const newExpense: Expense = {
        id: generateExpenseId(),
        ...action.payload,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      return {
        ...state,
        expenses: [...state.expenses, newExpense]
      };
    }
    
    case 'UPDATE_EXPENSE': {
      const updatedExpenses = state.expenses.map(expense =>
        expense.id === action.payload.id
          ? { ...expense, ...action.payload.expense, updatedAt: new Date() }
          : expense
      );
      return {
        ...state,
        expenses: updatedExpenses
      };
    }
    
    case 'DELETE_EXPENSE': {
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense.id !== action.payload)
      };
    }
    
    case 'SET_FILTERS': {
      return {
        ...state,
        filters: action.payload
      };
    }
    
    case 'LOAD_EXPENSES': {
      return {
        ...state,
        expenses: action.payload
      };
    }
    
    default:
      return state;
  }
};

// Context
const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

// Provider component
interface ExpenseProviderProps {
  children: ReactNode;
}

export const ExpenseProvider: React.FC<ExpenseProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  // Load expenses from localStorage on mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
      try {
        const parsedExpenses = JSON.parse(savedExpenses).map((expense: any) => ({
          ...expense,
          date: new Date(expense.date),
          createdAt: new Date(expense.createdAt),
          updatedAt: new Date(expense.updatedAt)
        }));
        dispatch({ type: 'LOAD_EXPENSES', payload: parsedExpenses });
      } catch (error) {
        console.error('Failed to load expenses from localStorage:', error);
      }
    }
  }, []);

  // Save expenses to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(state.expenses));
  }, [state.expenses]);

  const addExpense = (expense: ExpenseInput) => {
    dispatch({ type: 'ADD_EXPENSE', payload: expense });
  };

  const updateExpense = (id: string, expense: Partial<ExpenseInput>) => {
    dispatch({ type: 'UPDATE_EXPENSE', payload: { id, expense } });
  };

  const deleteExpense = (id: string) => {
    dispatch({ type: 'DELETE_EXPENSE', payload: id });
  };

  const setFilters = (filters: ExpenseFilters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const filteredExpenses = filterExpenses(state.expenses, state.filters);
  const summary = calculateExpenseSummary(filteredExpenses);

  const value: ExpenseContextType = {
    expenses: state.expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    filters: state.filters,
    setFilters,
    filteredExpenses,
    summary
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};

// Hook to use the context
export const useExpenses = (): ExpenseContextType => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};
