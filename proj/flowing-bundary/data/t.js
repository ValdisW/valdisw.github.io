const fs = require("fs");

let a = JSON.parse(fs.readFileSync("./national_case_history.json", { encoding: "utf-8" }));

let s = 0;
for (let i in a) {
  s += a[i]["case"];
  a[i]["total_case"] = s;
}

console.log(a);
fs.writeFileSync("./national_case_history.json", JSON.stringify(a), { encoding: "utf-8" });
