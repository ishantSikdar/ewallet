export function convertLocalToUTC(date: Date): Date {
    const localOffset = date.getTimezoneOffset() * 60000;

    const utcDate = new Date(date.getTime() + localOffset);

    return utcDate;
}

export function convertUTCToIST(date: Date): Date {
    const ISTOffset = 5.5 * 60 * 60000;

    const istDate = new Date(date.getTime() + ISTOffset);

    return istDate;
}

export function getIST() {
    const localDate = new Date();
    const utcDate = convertLocalToUTC(localDate);
    return convertUTCToIST(utcDate);
}