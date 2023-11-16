import moment from "moment";

export const daymontyearFormat = (value: any) => {
    const formattedDate = moment(value).format("DD/MM/YYYY");
    return formattedDate;
};

export const timeHourFormat = (time: any) => {
    const formattedTime = time ? time.substring(0, 5) : "";
    return formattedTime;
}

export const countDownTime = (expir: any) => {
    expir //output = 2023-11-10 12:28:35
    
    return 
};