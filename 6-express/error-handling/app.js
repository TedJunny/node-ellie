import express from "express";
import fs from "fs";
import fsAsync from "fs/promises";
// import {} from "express-async-errors";

const app = express();

app.use(express.json());

app.get("/file1", (req, res) => {
  // 동기적 에러 처리 (에러 구분을 조금 더 명확히)
  try {
    const data = fs.readFileSync("./file.txt");
  } catch (error) {
    res.status(400).send("File not found");
  }
  // 비동기 에러 처리 (에러를 확인하는 미들웨어 체이닝에서 처리가 불가하기 때문에)
  //   fs.readFile("./file.txt", (err, data) => {
  //     if (err) {
  //       res.status(400).send("File not found");
  //     }
  //   });
});

app.get("/file2", (req, res, next) => {
  fsAsync.readFile("./file.txt").catch((error) => {
    res.status(400).send("File not found");
  });
});

app.get("/file3", async (req, res) => {
  //   async - await 을 통해서 미들웨어를 작성했을 때,
  //   코드의 작동 방식은 동기적으로 보이지만,
  //   promise 형태의 반환형이 주어지기 때문에
  //   내부적으로 try - catch를 통해 에러를 제어해야 한다
  try {
    const data = await fsAsync.readFile("./file.txt");
  } catch {
    res.status(400).send("File not found");
  }
  //   const data = await fsAsync.readFile("./file.txt");
});

// 버전 5 이하에서는: require('express-async-errors');
// (미들웨어에서 Promise를 return하는 경우에만 감지할 수 있음)

// Express 5 부터는 이렇게
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(8080);
