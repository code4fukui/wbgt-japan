import { CSV } from "https://js.sabae.cc/CSV.js";

const url = "https://www.wbgt.env.go.jp/est15WG/dl/wbgt_all_202204.csv";
const csv = await CSV.fetch(url);
console.log(csv);
console.log(csv[0]);
