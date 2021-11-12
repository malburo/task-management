/**
 * parse number to 2 char format
 * @param input recieve a number
 * @returns string
 */
const parseTo2Char = (input: Number) => {
  if (input < 10) return `0${input}`;
  return input;
};

/**
 * get distance between date to current
 * @param date recieve a date
 * @returns string
 */
const fortmatDate = (date: Date) => {
  let current = new Date();
  let distance = current.getTime() - date.getTime();
  distance = distance / 1000;
  if (distance < 60) return `${Math.round(distance)} seconds ago`;
  if (distance < 60 * 60) return `${Math.round(distance / 60)} minutes ago`;
  if (distance < 60 * 60 * 24) return `${Math.round(distance / (60 * 60))} hours ago`;
  if (Math.round(distance / (60 * 60 * 24)) === 1) return `yesterday`;
  if (distance < 60 * 60 * 24 * 7) return `${Math.round(distance / (60 * 60 * 24))} days ago`;
  if (date.getFullYear() === current.getFullYear())
    return `${date.getHours()}:${parseTo2Char(date.getMinutes())}, ${date.getDate()}/${date.getMonth() + 1}`;
  return `${date.getHours()}:${parseTo2Char(date.getMinutes())}, ${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
};

/**
 *get meaning of day of week in string type
 * @param date recive a date
 * @returns string
 */
const getDayOfWeekString = (date: Date): string => {
  const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return dayOfWeek[date.getDay()];
};

export enum DateCount {
  ONE_SECOND = 1000,
  ONE_MINUTE = 1000 * 60,
  ONE_HOUR = 1000 * 60 * 60,
  ONE_DAY = 1000 * 60 * 60 * 24,
  ONE_WEEK = 1000 * 60 * 60 * 24 * 7,
}

/**
 * get a string at format dayofweek, day of month/ month/ year of date
 * @param date recive a data
 * @returns string
 */
const getDateMeaning = (date: Date): string => {
  return `${getDayOfWeekString(date)}, ${parseTo2Char(date.getDate())}/${parseTo2Char(
    date.getMonth()
  )}/${date.getFullYear()}`;
};

const dateUtil = {
  fortmatDate,
  getDayOfWeekString,
  getDateMeaning,
};

export default dateUtil;
