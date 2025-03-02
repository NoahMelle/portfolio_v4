import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getYearsDiff(date1: Date, date2: Date): number {
  const ageDifMs = date1.getTime() - date2.getTime();
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export function getAgeFromBday(dateOfBirth: Date): number {
  return getYearsDiff(new Date(), dateOfBirth);
}

// Cross-browser helper function for getting the height of the body
export function getBodyHeight() {
  const body = document.body;
  const html = document.documentElement;
  const bodyH = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    body.getBoundingClientRect().height,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
  return bodyH;
}
