import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

const app: Express = express();

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hola World");
});

app.listen(PORT, () =>
  console.log(`⚡[Server]: Server running at http://localhost:${PORT}`)
);
