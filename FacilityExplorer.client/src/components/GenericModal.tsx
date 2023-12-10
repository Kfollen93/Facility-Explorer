import React, { ReactElement } from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface GenericModalProps {
  open: boolean;
  onClose: () => void;
  anyComponent: ReactElement;
}

const GenericModal: React.FC<GenericModalProps> = ({
  open,
  onClose,
  anyComponent,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>{anyComponent}</Box>
    </Modal>
  );
};

export default GenericModal;
