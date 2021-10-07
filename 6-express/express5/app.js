import express from "express";
import fs from "fs";
import fsAsync from "fs/promises";

const app = express();

app.use(express.json());

app.get("/file1", (req, res) => {
  try {
    const data = fs.readFileSync("./file.txt");
  } catch (error) {
    res.status(400).send("File not found");
  }
});

app.get("/file2", (req, res, next) => {
  return fsAsync.readFile("./file.txt");
});

app.get("/file3", async (req, res) => {
  const data = await fsAsync.readFile("./file.txt");
  next();
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(8080);
