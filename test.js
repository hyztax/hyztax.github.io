const fs = require("fs");

let student = {
  name: "HYZTAX"
}

let data = JSON.stringify(student);

fs.writeFileSync('file.json', data);