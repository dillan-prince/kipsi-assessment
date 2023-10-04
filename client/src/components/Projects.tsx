import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import CreateProjectButton from "./CreateProjectButton";
import ProjectSum from "./ProjectSum";
import TextInput from "./TextInput";

const Projects = () => {
  const { projects, isLoading } = useAppContext();
  const [searchValue, setSearchValue] = useState("");

  const updateProjectName = async (id: string, name: string) => {
    const project = projects.find((p) => p._id === id);
    if (!project || project.name === name) {
      return;
    }

    await fetch(`/api/projects/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ name }),
    });
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
      <CreateProjectButton />
      <TextField
        label="Search"
        sx={{ maxWidth: "25rem" }}
        type="Text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Sum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects
              .filter((project) => project.name.includes(searchValue))
              .map((project) => (
                <TableRow key={project._id}>
                  <TableCell>
                    <TextInput
                      initialValue={project.name}
                      onChange={(e) =>
                        updateProjectName(project._id, e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <ProjectSum id={project._id} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Projects;
