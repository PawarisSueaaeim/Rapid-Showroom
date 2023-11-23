import moment from "moment";

export const genversion = (date: any) => {
    const formatDate = moment(date).format("YYYYMMDDhhmmss");
    return formatDate
};