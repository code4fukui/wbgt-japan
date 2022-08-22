import { CSV } from "https://js.sabae.cc/CSV.js";
import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";
import { DateTime } from "https://js.sabae.cc/DateTime.js";

// 暑さ指数（WBGT）予測値は、1時間に1回、毎時30分頃に更新
const url = "https://www.wbgt.env.go.jp/prev15WG/dl/yohou_all.csv";
const csv = await CSV.fetch(url);
console.log(csv);
//const csv = CSV.decode(await Deno.readTextFile("data/yohou_data.csv"));
csv.forEach((c, idx) => {
  for (let i = 0; i < c.length; i++) {
    c[i] = c[i].trim();
  }
  if (idx > 0) {
    for (let i = 2; i < c.length; i++) {
      c[i] = parseInt(c[i]) / 10;
    }
  }
});

//console.log(csv);
csv[0][0] = "Station Number";
const dt = ArrayUtil.toUnique(csv.map(c => c[1]));
if (dt[0] != "" && dt.length != 2) {
  console.err("unsupported update date");
  Deno.exit(1);
}
const updatetime = new DateTime(dt[1]).toStringMinLog();
csv.map(c => c.splice(1, 1)); // cut datetime

await Deno.writeTextFile("data/yohou_data.csv", CSV.encode(csv));
await Deno.writeTextFile("data/yohou/" + updatetime + ".csv", CSV.encode(csv));
