export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: ExpenseCategory;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExpenseInput {
  amount: number;
  description: string;
  category: ExpenseCategory;
  date: Date;
}

export const ExpenseCategory = {
  FOOD: 'Food',
  TRANSPORTATION: 'Transportation', 
  ENTERTAINMENT: 'Entertainment',
  UTILITIES: 'Utilities',
  HEALTHCARE: 'Healthcare',
  SHOPPING: 'Shopping',
  EDUCATION: 'Education',
  TRAVEL: 'Travel',
  OTHER: 'Other'
} as const;

export type ExpenseCategory = typeof ExpenseCategory[keyof typeof ExpenseCategory];

export interface ExpenseFilters {
  category?: ExpenseCategory;
  startDate?: Date;
  endDate?: Date;
  minAmount?: number;
  maxAmount?: number;
  searchTerm?: string   
}

export interface ExpenseSummary {
  totalAmount: number;
  totalCount: number;
  categoryBreakdown: Record<ExpenseCategory, number>;
  monthlyBreakdown: Record<string, number>;
}

export interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: ExpenseInput) => void;
  updateExpense: (id: string, expense: Partial<ExpenseInput>) => void;
  deleteExpense: (id: string) => void;
  filters: ExpenseFilters;
  setFilters: (filters: ExpenseFilters) => void;
  filteredExpenses: Expense[];
  summary: ExpenseSummary;
}
