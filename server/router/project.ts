import express from "express";
import {
  createProject,
  getAllProjects,
  updateProject,
} from "../controllers/project";

const BASE_URL = "/projects";

export default (router: express.Router) => {
  router.get(BASE_URL, getAllProjects);
  router.post(BASE_URL, createProject);
  router.patch(`${BASE_URL}/:id`, updateProject);
};
