import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import CustomModal from "../../ui-toolkit/components/CustomModal";
import LogInModal from "../User/LogInModal";

type SuccessCreateAccountModalProps = {
  open: boolean;
  onClose: () => void;
};

const SuccessCreateAccountModal: React.FC<SuccessCreateAccountModalProps> = ({
  open,
  onClose,
}) => {
  const [logInModalOpen, setLogInModalOpen] = useState(false);

  const toLogInClick = () => {
    setLogInModalOpen(true);
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
        title="Ett nytt konto har skapats"
        content={
          <Box>
            <Typography>
              Du lyckades skapa ett konto, nu kan du logga in
            </Typography>
          </Box>
        }
        buttonText="Till inloggningen"
        onButtonClick={toLogInClick}
        isButtonDisabled={false}
      />
    </>
  );
};

export default SuccessCreateAccountModal;
