import jMoment from "jalali-moment";

export const canvertDatetojalali = (date) => {
  return jMoment(date).format("jYYYY-jMM-jDD");
};

export const convertDateToMilady = (date) => {
  // fromat data daryafti 7 / 8 / 1402
  return jMoment(date, "jDD / jMM / jYYYY").format("YYYY-M-D");
};
