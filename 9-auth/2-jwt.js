const jwt = require("jsonwebtoken");

const secret = "oyOO0BF#OsgqoMToEn&tGDdhQsH7sQmv";

const token = jwt.sign(
  {
    id: "ellie",
    isAdmin: false,
  },
  secret,
  { expiresIn: 2 }
);

setTimeout(() => {
  jwt.verify(token, secret, (error, decoded) => {
    console.log(error, decoded);
  });
}, 3000);

console.log(token);
