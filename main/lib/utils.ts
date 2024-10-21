import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getYearsDiff(date1: Date, date2: Date): number {
  const ageDifMs = date1.getTime() - date2.getTime();
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export function getAgeFromBday(dateOfBirth: Date): number {
  return getYearsDiff(new Date(), dateOfBirth);
}