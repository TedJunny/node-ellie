const bcrypt = require("bcrypt");

const password = "abcd1234";
const hashedPassword = bcrypt.hashSync(password, 10);
console.log(`password: ${password}, hashed: ${hashedPassword}`);

const result = bcrypt.compareSync("abcd1234", hashedPassword);
console.log(result);
