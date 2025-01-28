import { EDITION_DATE_FROM, EDITION_DATE_TO } from "@/data";

export function daysAway(date: Date) {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const currentDate = new Date(); 
    currentDate.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    const differenceInMilliseconds = date.getTime() - currentDate.getTime();
    return Math.floor(differenceInMilliseconds / millisecondsPerDay);
  }

export function formatEditionDate() {
    // @ts-ignore
   if(EDITION_DATE_FROM === EDITION_DATE_TO){
    return new Date(EDITION_DATE_FROM).toLocaleDateString("de-DE", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
   }
   return `${new Date(EDITION_DATE_FROM).toLocaleDateString("de-DE", {
                        day: "numeric",
                      })} - ${new Date(EDITION_DATE_TO).toLocaleDateString("de-DE", {
                        year: "numeric",
                        month: "long",
                        day: "numeric", 
                      })}`
  }
