import express, { Express, Request, Response } from "express";
import db from "./db";

const app: Express = express();
const port = parseInt(process.env.PORT || "8080");

app.get("/", (req: Request, res: Response) => {
  res.send(`Express + TypeScript Server`);
});

app.get("/users", async (req: Request, res: Response) => {
  const allUsers = await db.user.findMany();
  res.json(JSON.parse(JSON.stringify({ allUsers, length: allUsers.length })));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

process.on("SIGTERM", async function () {
  console.log("hi hi");
  await db.$disconnect();
});
