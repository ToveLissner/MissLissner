import React from "react";
import { Modal, Box } from "@mui/material";
import ModalHeader from "./ModalHeader";
import ModalButton from "./ModalButton";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  title: string;
  content: React.ReactNode;
  buttonText: string;
  onButtonClick: () => void;
};

const CustomModal: React.FC<ModalProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  content,
  buttonText,
  onButtonClick,
}) => {
  const handleConfirm = () => {
    onConfirm({});
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "300px",
          bgcolor: "white",
          boxShadow: 3,
          borderRadius: "8px",
          p: 4,
        }}
      >
        <ModalHeader title={title} onClose={onClose} />

        {content}

        <ModalButton onClick={onButtonClick} buttonText={buttonText} />
      </Box>
    </Modal>
  );
};

export default CustomModal;
