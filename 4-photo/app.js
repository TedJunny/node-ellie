const process = require("process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const folder = process.argv[2];
const workingDir = path.join(os.homedir(), "Pictures", folder);
if (!folder || !fs.existsSync(workingDir)) {
  console.error("Please enter folder name in Pictures");
  return;
}

const videoDir = path.join(workingDir, "video");
const capturedDir = path.join(workingDir, "captured");

!fs.existsSync(videoDir) && fs.mkdirSync(videoDir);
!fs.existsSync(capturedDir) && fs.mkdirSync(capturedDir);

fs.promises.readdir(workingDir).then(processFiles).catch(console.error);

function processFiles(files) {
  files.forEach((file) => {
    if (file.endsWith(".mov") || file.endsWith(".mp4")) {
      organizeFile(file, videoDir);
    } else if (file.endsWith(".png")) {
      organizeFile(file, capturedDir);
    }
  });
}

function organizeFile(file, subDir) {
  fs.promises
    .rename(path.join(workingDir, file), path.join(subDir, file))
    .then(console.info(`move ${file} to ${path.basename(subDir)} directory`));
}
