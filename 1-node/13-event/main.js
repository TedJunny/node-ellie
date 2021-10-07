const logger = require("./logger.js");
const emitter = new logger.Logger();

emitter.on("log", (callback) => {
  console.log(callback);
});

emitter.log(() => {
  console.log("..... ꝍ loopings ꝍ....");
  for (let i = 0; i < 5; i++) {
    console.log("count", i);
  }
});
