import express from "express";
import {
  createProject as dbCreateProject,
  getProjectById,
  getProjects,
} from "../db/project";

export const getAllProjects = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const projects = await getProjects();

    return res.status(200).json(projects).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const createProject = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const project = await dbCreateProject({ name });
    return res.status(200).json(project).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateProject = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    console.log(name);

    if (!id) {
      return res.sendStatus(400);
    }

    const project = await getProjectById(id);

    if (!project) {
      return res.sendStatus(404);
    }

    project.name = name;
    await project.save();

    return res.status(200).json(project).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
