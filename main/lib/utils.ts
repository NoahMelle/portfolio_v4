export function getYearsDiff(date1: Date, date2: Date): number {
    var ageDifMs = date1.getTime() - date2.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export function getAgeFromBday(dateOfBirth: Date): number {
    return getYearsDiff(new Date(), dateOfBirth);
}