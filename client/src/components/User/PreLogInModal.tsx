import React from "react";
import { Box, Typography } from "@mui/material";
import CustomModal from "../../ui-toolkit/components/CustomModal";
import LogInModal from "./LogInModal";

type PreLogInModalProps = {
  open: boolean;
  onClose: () => void;
};

const PreLogInModal: React.FC<PreLogInModalProps> = ({ open, onClose }) => {
  const [logInModalOpen, setLogInModalOpen] = React.useState(false);

  const toLogInClick = () => {
    setLogInModalOpen(true);
    onClose();
  };

  return (
    <>
      <LogInModal
        open={logInModalOpen}
        onClose={() => setLogInModalOpen(false)}
      />

      <CustomModal
        open={open}
        onClose={onClose}
        onConfirm={() => {}}
        title="Du behöver logga in"
        content={
          <Box>
            <Typography>
              För att kunna skapa ett spel behöver du vara inloggad.
            </Typography>
          </Box>
        }
        buttonText="Till inloggningen"
        onButtonClick={toLogInClick}
      />
    </>
  );
};

export default PreLogInModal;
