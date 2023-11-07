import moment from "moment";

export const daymontyearFormat = (value: any) => {
    const formattedDate = moment(value).format("DD/MM/YYYY HH:mm น.");
    return formattedDate;
};

export const thaiDateFormat = (value: any) => {
    
}