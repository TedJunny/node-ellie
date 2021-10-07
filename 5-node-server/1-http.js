const http = require("http");
const fs = require("fs");
// const http2 = require("http2"); // https, SSL 인증서 적용이 필요

const server = http.createServer((req, res) => {
  console.log("incoming...");
  console.log(req.headers);
  console.log(req.httpVersion);
  console.log(req.method);
  console.log(req.url);
  const url = req.url;
  res.setHeader("Content-Type", "text/html");
  if (url === "/") {
    fs.createReadStream("./html/index.html").pipe(res);
  } else if (url === "/course") {
    fs.createReadStream("./html/course.html").pipe(res);
  } else {
    fs.createReadStream("./html/not-found.html").pipe(res);
  }
});

server.listen(8080);
