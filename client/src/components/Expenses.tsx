import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import { Expense } from "../types";
import ExpenseRow from "./ExpenseRow";

type CreateExpenseDialogProps = {
  isOpen: boolean;
  handleClose: (amount: number, isQualified: boolean) => void;
};

const CreateExpenseDialog = ({
  isOpen,
  handleClose,
}: CreateExpenseDialogProps) => {
  const [amount, setAmount] = useState(0);
  const [isQualified, setIsQualified] = useState(false);

  return (
    <Dialog open={isOpen} onClose={() => handleClose(amount, isQualified)}>
      <DialogTitle>Create Expense</DialogTitle>
      <DialogContent sx={{ display: "flex", gap: "2rem" }}>
        <FormControl>
          <FormLabel>Amount</FormLabel>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Is Qualified</FormLabel>
          <Checkbox
            checked={isQualified}
            onChange={(e) => setIsQualified(e.target.checked)}
          />
        </FormControl>
      </DialogContent>
    </Dialog>
  );
};

const Expenses = () => {
  const { projects } = useAppContext();
  const [selectedProjectId, setSelectedProject] = useState(
    projects[0]?._id ?? ""
  );
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!selectedProjectId) {
      return;
    }

    const fetchExpenses = async () => {
      const response = await fetch(`/api/expenses/${selectedProjectId}`);
      const data = await response.json();

      setExpenses(data);
    };

    fetchExpenses();
  }, [selectedProjectId]);

  const createExpense = async (amount: number, isQualified: boolean) => {
    const data: Pick<Expense, "amount" | "isQualified" | "projectId"> = {
      amount,
      isQualified,
      projectId: selectedProjectId,
    };

    const response = await fetch(`/api/expenses/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    });

    const createdExpense: Expense = await response.json();

    setExpenses((previous) => [...previous, createdExpense]);
    setIsOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
      <Box sx={{ display: "flex", gap: "2rem" }}>
        <FormControl>
          <FormLabel>Project</FormLabel>
          <Select
            value={selectedProjectId}
            onChange={(e) =>
              setSelectedProject(
                projects.find((project) => project._id === e.target.value)
                  ?._id ?? ""
              )
            }
          >
            {projects.map((project) => (
              <MenuItem key={project._id} value={project._id}>
                {project.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={() => setIsOpen(true)}>Create Expense</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Created at</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Qualified</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <ExpenseRow key={expense._id} expense={expense} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CreateExpenseDialog isOpen={isOpen} handleClose={createExpense} />
    </Box>
  );
};

export default Expenses;
