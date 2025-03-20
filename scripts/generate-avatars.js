const fs = require("fs");
const path = require("path");

// 讀取 avatars 目錄
const avatarsDir = path.join(process.cwd(), "public/avatars");
const files = fs.readdirSync(avatarsDir);

// 過濾出 .jpg 檔案並移除副檔名
const avatars = files
  .filter((file) => file.endsWith(".jpg") && !file.startsWith("."))
  .reduce((acc, file) => {
    const name = file.replace(/\.jpg$/, "");
    acc[name] = true;
    return acc;
  }, {});

// 寫入 JSON 檔案
fs.writeFileSync(
  path.join(process.cwd(), "public/avatars.json"),
  JSON.stringify(avatars, null, 2)
);
