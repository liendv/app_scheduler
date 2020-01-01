import { BranchCalendar, Time } from "./model";
import {
  ESLAPED_PERIOD,
  ESLAPED_PERIOD_IN_MS,
  MINUTE_IN_SEC,
  HOUR_IN_SEC
} from "./constant";

export function getDuedate(now: Date, schedule: BranchCalendar[]): Date {
  let dayInWeek = now.getDay();
  let currentWorkingDay = schedule[dayInWeek];
  if (
    isWorkingDay(currentWorkingDay) &&
    isWorkingTime(now, currentWorkingDay)
  ) {
    return getDueDateToday(now, dayInWeek, schedule);
  }
  return getDuedateInNextWorkingDay(now, dayInWeek, 0, schedule);
}

function getDueDateToday(
  currentDate: Date,
  dayInWeek: number,
  schedule: BranchCalendar[]
): Date {
  let currentWorkingDay = schedule[dayInWeek];
  let currentTimeInSec = getTimeInSec(currentDate);
  let closeTimeInSec = getTimeInSec(currentWorkingDay.close_at);
  let openTimeInSec = getTimeInSec(currentWorkingDay.open_at);
  let remainWorkingTime = getDiffTime(currentTimeInSec, closeTimeInSec);
  if (remainWorkingTime < ESLAPED_PERIOD) {
    return getDuedateInNextWorkingDay(
      currentDate,
      dayInWeek,
      remainWorkingTime,
      schedule
    );
  }
  let officialWorkingTimeInSec = getDiffTime(openTimeInSec, closeTimeInSec);
  if (remainWorkingTime > officialWorkingTimeInSec) {
    let { hour, minute } = stringToTime(currentWorkingDay.open_at);
    currentDate.setHours(hour, minute, 0, 0);
    return new Date(currentDate.getTime() + ESLAPED_PERIOD_IN_MS);
  }
  return new Date(currentDate.getTime() + ESLAPED_PERIOD_IN_MS);
}

function getDuedateInNextWorkingDay(
  currentDate: Date,
  currentDayInWeek: number,
  consumedNoticeTime: number,
  schedule: BranchCalendar[]
): Date {
  let nextWorkingScheduleIndex = findNextWorkingScheduleIndex(
    currentDayInWeek,
    schedule
  );
  let interval = findDayInterval(currentDayInWeek, nextWorkingScheduleIndex);
  currentDate.setDate(currentDate.getDate() + interval);
  let { hour, minute } = stringToTime(
    schedule[nextWorkingScheduleIndex].open_at
  );
  currentDate.setHours(hour, minute, 0, 0);
  if (consumedNoticeTime <= 0) {
    return new Date(currentDate.getTime() + ESLAPED_PERIOD_IN_MS);
  } else {
    return new Date(
      currentDate.getTime() + ESLAPED_PERIOD_IN_MS - consumedNoticeTime * 1000
    );
  }
}

function findDayInterval(
  initScheduleInd: number,
  actualScheduleInd: number
): number {
  let diff = actualScheduleInd - initScheduleInd;
  return diff > 0 ? diff : 7 + diff;
}

function findNextWorkingScheduleIndex(
  curIndex: number,
  schedule: BranchCalendar[]
): number {
  let nextIndex = curIndex >= 6 ? 0 : curIndex + 1;
  if (!isWorkingDay(schedule[nextIndex])) {
    return findNextWorkingScheduleIndex(nextIndex, schedule);
  }
  return nextIndex;
}

function isWorkingDay(day: BranchCalendar) {
  return day.open;
}

function isWorkingTime(now: Date, currentWorkingDay: BranchCalendar): boolean {
  let currentTime = getTimeInSec(now);
  let closeTime = getTimeInSec(currentWorkingDay.close_at);
  return closeTime > currentTime;
}

function getDiffTime(sTime: number, eTime: number): number {
  return eTime - sTime;
}

function stringToTime(timeStr: string): Time {
  let timeTokens = timeStr.split(":");
  return {
    hour: Number(timeTokens[0]),
    minute: Number(timeTokens[1])
  };
}

function getTimeInSec(time: string | Date): number {
  switch (typeof time) {
    case "string":
      let timeSplit = time.split(":");
      return (
        Number(timeSplit[0]) * HOUR_IN_SEC +
        Number(timeSplit[1]) * MINUTE_IN_SEC
      );
    default:
      return (
        time.getHours() * HOUR_IN_SEC +
        time.getMinutes() * MINUTE_IN_SEC +
        time.getSeconds()
      );
  }
}
