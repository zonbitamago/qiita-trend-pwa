import * as localforage from "localforage";
import dayjs from "dayjs";
import fetch from "isomorphic-unfetch";
import * as DateUtil from "./DateUtil";

const myLF = localforage.createInstance({
  driver: localforage.INDEXEDDB, // LocalForage を使用する
  name: "qt", // 名前空間
  storeName: "trend-api", // 名前空間内のインスタンスの識別名
  version: 1, // バージョン
});

export const fetchData = async function () {
  const localRes = await myLF.getItem("res-api");
  let data;

  if (
    localRes == null ||
    dayjs(localRes.created).isBefore(
      DateUtil.dayjsJA().subtract("15", "minutes")
    )
  ) {
    const url = "https://qiita-trend-web-scraping.firebaseapp.com/";
    let dailyFetch = await fetch(url + "daily/" + DateUtil.oneDayAgo);
    let weeklyFetch = await fetch(url + "weekly/" + DateUtil.oneDayAgo);
    console.log("fetched by API");
    try {
      data = {
        daily: await dailyFetch.json(),
        weekly: await weeklyFetch.json(),
      };
    } catch (error) {
      dailyFetch = await fetch(url + "daily/" + DateUtil.twoDaysAgo);
      weeklyFetch = await fetch(url + "weekly/" + DateUtil.twoDaysAgo);
      console.log("fetched two days ago by API");

      data = {
        daily: await dailyFetch.json(),
        weekly: await weeklyFetch.json(),
      };
    }
    myLF.setItem("res-api", {
      data: data,
      created: DateUtil.dayjsJA().format(),
    });
  } else {
    const dataByLF = await myLF.getItem("res-api");
    console.log("fetched by IndexedDB");
    data = dataByLF.data;
  }

  return data;
};
