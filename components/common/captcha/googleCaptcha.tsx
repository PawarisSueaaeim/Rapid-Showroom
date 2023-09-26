"use client";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

type Props = {};

export default function GoogleCaptcha({}: Props) {
  const [change, setChanged] = useState(false);

  const key = "6LcE31QoAAAAAO3rwE1EliMd4PpyGNXrBiMVIIE8";

  const handleCaptchaVerify = (response: string | null) => {
    if (response) {
      setChanged(true);
      console.log("reCAPTCHA verified:", response);
    } else {
      setChanged(false);
      console.error("reCAPTCHA verification failed");
    }
  };

  return (
    <div>
      <GoogleReCaptchaProvider
        reCaptchaKey={key}
        scriptProps={{
          async: false,
          defer: false,
          appendTo: "head",
          nonce: undefined,
        }}
      >
        <ReCAPTCHA
          sitekey="6LcE31QoAAAAANJ_GF56B__50-ruVa8BP8qmuN0x"
          onChange={handleCaptchaVerify}
        />
      </GoogleReCaptchaProvider>
    </div>
  );
}
