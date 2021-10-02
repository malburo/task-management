const parseMinute = (minute: Number) => {
  if (minute < 10) return `0${minute}`;
  return minute;
};

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
    return `${date.getHours()}:${parseMinute(date.getMinutes())}, ${date.getDate()}/${date.getMonth() + 1}`;
  return `${date.getHours()}:${parseMinute(date.getMinutes())}, ${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
};

const getDayOfWeekString = (date: Date) => {
  const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return dayOfWeek[date.getDay()];
};

const dateUtil = {
  fortmatDate,
  getDayOfWeekString,
};

export default dateUtil;
