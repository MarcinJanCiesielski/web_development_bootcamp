const fs = require("fs");
const file = "message.txt";

fs.writeFileSync(file, "Hello form Marcin!", (err) => {
  if (err) throw err;
  console.log("The file has been saved");
});

const txt = fs.readFileSync(file, "utf8");
console.log(txt)
