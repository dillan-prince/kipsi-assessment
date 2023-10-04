import { Checkbox, Input, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import { Expense } from "../types";

type ExpenseRowProps = {
  expense: Expense;
};

const ExpenseRow = ({ expense }: ExpenseRowProps) => {
  const [amount, setAmount] = useState(expense.amount);
  const [isQualified, setIsQualified] = useState(expense.isQualified);

  const updateExpenseAmount = async () => {
    await fetch(`/api/expenses/${expense._id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ isQualified, amount }),
    });
  };

  const updateExpenseIsQualified = async (newIsQualified: boolean) => {
    await fetch(`/api/expenses/${expense._id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ isQualified: newIsQualified, amount }),
    });

    setIsQualified(newIsQualified);
  };

  return (
    <TableRow>
      <TableCell>{new Date(expense.createdAt).toLocaleString()}</TableCell>
      <TableCell>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          onBlur={updateExpenseAmount}
        />
      </TableCell>
      <TableCell>
        <Checkbox
          checked={isQualified}
          onChange={(e) => updateExpenseIsQualified(e.target.checked)}
        />
      </TableCell>
    </TableRow>
  );
};

export default ExpenseRow;
