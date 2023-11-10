import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
  displayCountdown: boolean;
  setDisplayCountdown: any;
  dateAndTime: any;
};

export default function CountdownTimer({
  displayCountdown,
  setDisplayCountdown,
  dateAndTime,
}: Props) {
  const futureDate = new Date(dateAndTime).getTime();
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timeDifference = futureDate - now;

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });

      if (timeDifference < 0) {
        setDisplayCountdown(false);
        clearInterval(interval);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000); // Update every 1 second

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {displayCountdown ? (
        <Typography color="text" variant="caption">
          กรุณาชำระภายใน {countdown.minutes} นาที {countdown.seconds} วินาที
        </Typography>
      ) : (
        <>
          <Typography color="error" variant="caption">
            กรุณาทำรายการใหม่อีกครั้ง
          </Typography>
          <br />
          <Typography color="error" variant="caption">
            เนื่องจากเกินกำหนดระยะเวลาชำระเงิน
          </Typography>
        </>
      )}
    </>
  );
}
