import express from "express";

const router = express.Router();

export default (): express.Router => {
  router.get("/", (req: express.Request, res: express.Response) => {
    res.status(200).json({ message: "Hello world" }).end();
  });

  return router;
};
