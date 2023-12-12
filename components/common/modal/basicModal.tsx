import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Image from "next/image";

type Props = {
  title: string;
  message?: string;
  onOpen: boolean;
  width?: number;
  icon?: "warning" | "error";
  onClose?: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({
  title,
  message,
  onOpen,
  icon,
  onClose,
}: Props) {
  return (
    <div>
      <Modal
        open={onOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} gap={2}>
            {icon === "warning" ? (
              <Image
                src={"/icons/icon-about.png"}
                alt="icon"
                width={50}
                height={50}
              />
            ) : icon === "error" ? (
              <Image
                src={"/icons/icon-fail.png"}
                alt="icon"
                width={50}
                height={50}
              />
            ) : null}
            {title}
          </Box>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {message}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
