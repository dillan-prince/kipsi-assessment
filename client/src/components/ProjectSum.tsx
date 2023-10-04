import { useEffect, useState } from "react";
import { Expense } from "../types";

type ProjectSumProps = {
  id: string;
};

const ProjectSum = ({ id }: ProjectSumProps) => {
  const [sum, setSum] = useState<number>();

  useEffect(() => {
    const fetchSum = async () => {
      const response = await fetch(`/api/expenses/${id}`);
      const expenses: Expense[] = await response.json();

      const total = expenses
        .filter((expense) => expense.isQualified)
        .reduce((total, expense) => total + expense.amount, 0);

      setSum(total);
    };

    fetchSum();
  }, [id]);

  return <div>{sum === undefined ? "Loading..." : sum}</div>;
};

export default ProjectSum;
