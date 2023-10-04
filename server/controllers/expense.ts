import express from "express";
import {
  createExpense as dbCreeateExpense,
  getExpensesByProjectId as dbGetExpensesByProjectId,
  getExpenseById,
} from "../db/expense";

export const getExpensesByProjectId = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { projectId } = req.params;

    if (!projectId) {
      return res.sendStatus(400);
    }

    const expenses = await dbGetExpensesByProjectId(projectId);

    return res.status(200).json(expenses).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const createExpense = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { projectId, amount, isQualified } = req.body;

    if (!projectId || amount === undefined || isQualified === undefined) {
      return res.sendStatus(400);
    }

    const expense = await dbCreeateExpense({
      projectId,
      amount,
      isQualified,
      createdAt: new Date(),
    });

    return res.status(200).json(expense).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateExpense = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { isQualified, amount } = req.body;

    if (!id) {
      return res.sendStatus(400);
    }

    const expense = await getExpenseById(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    expense.amount = amount;
    expense.isQualified = isQualified;
    await expense.save();

    return res.status(200).json(expense).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
