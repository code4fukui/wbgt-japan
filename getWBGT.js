import { DateTime, Day, Time } from "https://js.sabae.cc/DateTime.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

export const getWBGT = async (stnum) => {
  const yymm = new Day().toStringYMD().substring(0, 6);
  const url = `https://www.wbgt.env.go.jp/est15WG/dl/wbgt_${stnum}_${yymm}.csv`;
  const data = CSV.toJSON(await CSV.fetch(url));
  const last = (() => {
    for (let i = data.length - 1; i >= 0; i--) {
      const d = data[i];
      if (d[stnum] != "") {
        return d;
      }
    }
  })();
  const res = {
    dt: new DateTime(new Day(last.Date), new Time(last.Time)).toString(),
    wbgt: last[stnum],
  };
  return res;
};

// console.log(await getWBGT(57066)); // { dt: "2022-08-28T07:00+09:00", wbgt: "21.1" }
