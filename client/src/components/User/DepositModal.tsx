import React, { useState } from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";
import CustomModal from "../../ui-toolkit/components/CustomModal";
import { useSelector } from "react-redux";
import { RootState } from "../../domain/store";

type DepositModalProps = {
  open: boolean;
  onClose: () => void;
  initialAmount?: string;
  gamePrice?: number;
};

const DepositModal: React.FC<DepositModalProps> = ({
  open,
  onClose,
  initialAmount = "",
  gamePrice = 0,
}) => {
  const [depositAmount, setDepositAmount] = useState(initialAmount);

  const userBalance = useSelector(
    (state: RootState) => state.user.data.gameAccount.balance
  );

  const handleDepositAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;
    setDepositAmount(newValue);
  };

  const displayCostInfo = gamePrice > 0;

  const handleConfirm = () => {
    console.log(`Balance: ${userBalance}`);
    console.log(`Insättning bekräftad med belopp: ${depositAmount}`);
    console.log(`Pris: ${gamePrice}`);
    onClose();
  };

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Insättning"
      content={
        <>
          {displayCostInfo && (
            <>
              <Typography variant="h6" sx={{ marginBottom: "20px" }}>
                Ditt saldo är för lågt
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>Kostnad för spel:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right">{gamePrice} kr</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>Ditt saldo:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right">{userBalance} kr</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>Saknas:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right">
                    {Math.max(0, gamePrice - userBalance)} kr
                  </Typography>
                </Grid>
              </Grid>
            </>
          )}
          <Typography variant="h6" sx={{ marginBottom: "20px" }}>
            Hur mycket vill du sätta in?
          </Typography>

          <Box textAlign="center">
            <TextField
              label="Eget belopp"
              variant="outlined"
              fullWidth
              value={depositAmount}
              onChange={handleDepositAmountChange}
              sx={{ borderRadius: 0, mt: 1 }}
            />
          </Box>
        </>
      }
      buttonText="Bekräfta insättning"
      onButtonClick={handleConfirm}
      isButtonDisabled={!depositAmount || isNaN(parseFloat(depositAmount))}
      buttonColor="success"
    />
  );
};

export default DepositModal;
