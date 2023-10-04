import mongoose, { Schema } from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  amount: { type: Number, required: true },
  isQualified: { type: Boolean, required: true },
  createdAt: { type: Schema.Types.Date, required: true },
});

const ExpenseModel = mongoose.model("Expense", ExpenseSchema);

export const getExpenseById = (id: string) => ExpenseModel.findById(id);

export const getExpensesByProjectId = (projectId: string) =>
  ExpenseModel.find({ projectId });

export const createExpense = (values: Record<string, any>) =>
  ExpenseModel.create(values);

export const updateExpenseById = (id: string, values: Record<string, any>) =>
  ExpenseModel.findByIdAndUpdate(id, values);
