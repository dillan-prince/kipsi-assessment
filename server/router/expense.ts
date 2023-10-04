import express from "express";
import {
  createExpense,
  getExpensesByProjectId,
  updateExpense,
} from "../controllers/expense";

const BASE_URL = "/expenses";

export default (router: express.Router) => {
  router.get(`${BASE_URL}/:projectId`, getExpensesByProjectId);
  router.post(BASE_URL, createExpense);
  router.patch(`${BASE_URL}/:id`, updateExpense);
};
