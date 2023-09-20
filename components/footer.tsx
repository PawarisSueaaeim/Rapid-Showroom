import React, { Fragment } from "react";
import classes from "@/style/components/footer.module.css";

const footer = () => {
  return (
    <div className={classes.container}>
      <div className={classes.copyright}>
        <h3>RAPID AUTO</h3>
        <p>© 2022 RAPID GROUP CO., LTD</p>
      </div>
      <div className={classes.service}>
        <p>Term of service</p>
        <p>Privacy Policy</p>
      </div>
    </div>
  );
};

export default footer;
