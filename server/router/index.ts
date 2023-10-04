import express from "express";
import expenseRouter from "./expense";
import projectRouter from "./project";

const router = express.Router();

export default (): express.Router => {
  projectRouter(router);
  expenseRouter(router);

  return router;
};
