const express = require("express");
import { NextFunction, Request, Response, Express } from "express";
const app = express();
import cors from "cors";
import userRoute from "../routes/userRoute";
import weatherRoute from "../routes/weatherRoute";
import newsRoute from "../routes/chatRoute";
import { errorMiddleware } from "../utils/middleware";
import morganMiddleware from '../utils/morgan.middleware';
import Logger from '../logger';

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));
app.use(cors());

// routes
app.use("/api/user", userRoute);
app.use("/api/weather", weatherRoute);
app.use("/api/openai", newsRoute);

Logger.info('Middleware initialize')
app.use(errorMiddleware);
app.use(morganMiddleware);

// test
app.get("/", (req: Request, res: Response) => {
  res.send("Success");
});

export = app;
