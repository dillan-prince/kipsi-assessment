import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
} from "@mui/material";
import { useState } from "react";
import { useAppContext } from "../contexts/AppContext";

const CreateProjectButton = () => {
  const { fetchProjects } = useAppContext();

  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const createProject = async () => {
    if (!name.length) {
      return;
    }

    await fetch(`/api/projects/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ name }),
    });

    fetchProjects();
  };

  const handleClose = async () => {
    await createProject();
    setIsOpen(false);
  };

  return (
    <>
      <Button sx={{ width: "10rem" }} onClick={() => setIsOpen(true)}>
        Create Project
      </Button>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Create Project</DialogTitle>
        <DialogContent>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateProjectButton;
