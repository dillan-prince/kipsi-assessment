export type Project = {
  _id: string;
  name: string;
};

export type Expense = {
  _id: string;
  projectId: string;
  amount: number;
  isQualified: boolean;
  createdAt: string;
};

export enum TabValue {
  PROJECTS,
  EXPENSES,
}
