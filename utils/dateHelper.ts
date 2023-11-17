import moment from "moment";

export const daymontyearFormat = (value: any) => {
  const formattedDate = moment(value).format("DD/MM/YYYY");
  return formattedDate;
};

export const formattedDateTime = (value: any) => {
  const formattedDateTime = moment(value).format("YYYY-MM-DDTHH:MM:SS");
  return formattedDateTime;
};

export const timeHourFormat = (time: any) => {
  const formattedTime = time ? time.substring(0, 5) : "";
  return formattedTime;
};

export const isDiff24Hour = (
  currentDateTime: string,
  targetDateTime: string
) => {
  const formatTarget = moment(targetDateTime).format("YYYY-MM-DDTHH:MM:SS");
  const formatCurrent = moment(currentDateTime).format("YYYY-MM-DDTHH:MM:SS");

  const targetDate = new Date(formatTarget);
  const currentDate = new Date(formatCurrent);

  const timeDifference = targetDate.getTime() - currentDate.getTime();

  const hoursDifference = timeDifference / (1000 * 3600);

  return hoursDifference >= 24;
};
