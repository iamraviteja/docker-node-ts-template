import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = parseInt(process.env.PORT || "8080");

app.get("/", (req: Request, res: Response) => {
  res.send(`Express + TypeScript Server`);
});

app.listen(port, "0.0.0.0", () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

process.on("SIGTERM", function () {});
