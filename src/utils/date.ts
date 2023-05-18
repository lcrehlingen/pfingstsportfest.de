export function daysAway(date: Date) {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const currentDate = new Date(); 
    currentDate.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    const differenceInMilliseconds = date.getTime() - currentDate.getTime();
    return Math.floor(differenceInMilliseconds / millisecondsPerDay);
  }