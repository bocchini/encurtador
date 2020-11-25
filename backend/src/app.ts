import express from "express";
import cors from "cors";

import linksRouter from "./routes/linksRouter";

const app = express();
app.use(express.json());
app.use(cors());
app.use(linksRouter);

export default app;
