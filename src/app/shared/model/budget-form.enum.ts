export interface currencyList {
  symbol: string;
  code: string
}

export const currencyList: currencyList[] = [
  {
    symbol: "$",
    code: "USD",
  },
  {
    symbol: "CA$",
    code: "CAD",
  },
  {
    symbol: "€",
    code: "EUR",
  },
  {
    symbol: "zł",
    code: "PLN",
  }
]

export const incomeCategoryList: string[] = [
  'Salary',
  'Commission',
  'Interest',
  'Investments',
  'Gifts'
];

export const expenseCategoryList = [
  'Entertainment', 
  'Daily expenses' , 
  'Car and transportation', 
  'Personal', 
  'Uncategorized', 
  'Payments',
  'Kids',
  'House',
  'Other'
];