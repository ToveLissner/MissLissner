import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ModalButton from "./ModalButton";
import colors from "../colors";

type CustomModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  title: string;
  modalTitle?: string;
  content: React.ReactNode;
  buttonText: string;
  onButtonClick: () => void;
  isButtonDisabled?: boolean;
  buttonColor?: "primary" | "success";
  width?: string;
};

const colorFromColors = colors;

const pink = colorFromColors.pinkBackgroundColor;

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onClose,
  title,
  content,
  buttonText,
  onButtonClick,
  isButtonDisabled,
  buttonColor,
  modalTitle,
  width,
}) => {
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
          width: width || "340px",
          bgcolor: "white",
          boxShadow: 3,
        }}
      >
        <Box
          sx={{
            backgroundColor: pink,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <Typography
            sx={{
              marginLeft: "10px",
              color: "white",
              fontSize: "12px",
              textTransform: "uppercase",
            }}
          >
            {title}
          </Typography>
          <IconButton onClick={onClose} size="small" sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            p: 2,
          }}
        >
          {modalTitle && (
            <Typography variant="h6" sx={{ marginBottom: "20px" }}>
              {modalTitle}
            </Typography>
          )}

          {content}
          <ModalButton
            onClick={onButtonClick}
            buttonText={buttonText}
            isButtonDisabled={isButtonDisabled}
            buttonColor={buttonColor}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
