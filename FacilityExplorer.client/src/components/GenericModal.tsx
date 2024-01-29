import React, { ReactElement } from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";

interface GenericModalProps {
  open: boolean;
  onClose: () => void;
  anyComponent: ReactElement;
  backgroundColor?: string;
}

const GenericModal: React.FC<GenericModalProps> = ({
  open,
  onClose,
  anyComponent,
  backgroundColor = "#fffcf4", // Default background modal color.
}) => {
  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    maxHeight: "80vh",
    overflowY: "auto",
    bgcolor: backgroundColor,
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>{anyComponent}</Box>
    </Modal>
  );
};

export default GenericModal;
