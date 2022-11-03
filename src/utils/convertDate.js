import jMoment from "jalali-moment";

export const canvertDatetojalali = (date, format = "jYYYY-jMM-jDD") => {
  return jMoment(date).format(format);
};

export const convertDateToMilady = (date) => {
  // fromat data daryafti 7 / 8 / 1402
  return jMoment(date, "jDD / jMM / jYYYY").format("YYYY-M-D");
};
