import dayjs from "dayjs";
import "dayjs/locale/ja";

export const dayjsJA = () => {
  dayjs.locale("ja");
  return dayjs();
};

export const oneDayAgo = dayjsJA().subtract(1, "days").format("YYYY-MM-DD");
export const twoDaysAgo = dayjsJA().subtract(2, "days").format("YYYY-MM-DD");
export const oneWeekAgo = dayjsJA().subtract(7, "days").format("YYYY-MM-DD");
