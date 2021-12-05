import dayjs from "dayjs";

export const getRemainingTime = (timestamp) => {
  const timestampDayjs = dayjs(timestamp);
  const nowDayJs = dayjs();

  return {
    days: getRemainingDays(timestampDayjs, nowDayJs),
    hours: getRemainingHours(timestampDayjs, nowDayJs),
    minutes: getRemainingMinutes(timestampDayjs, nowDayJs),
    seconds: getRemainingSeconds(timestampDayjs, nowDayJs),
  };
};

function getRemainingDays(timestampDayjs, nowDayjs) {
  return timestampDayjs.diff(nowDayjs, "days");
}

function getRemainingHours(timestampDayjs, nowDayjs) {
  return timestampDayjs.diff(nowDayjs, "hours") % 24;
}

function getRemainingMinutes(timestampDayjs, nowDayjs) {
  return timestampDayjs.diff(nowDayjs, "minutes") % 60;
}

function getRemainingSeconds(timestampDayjs, nowDayjs) {
  return timestampDayjs.diff(nowDayjs, "seconds") % 60;
}
