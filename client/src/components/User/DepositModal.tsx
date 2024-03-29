import React, { useState } from "react";
import {
  Box,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import CustomModal from "../../ui-toolkit/components/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../domain/store";
import { updateGameAccountBalanceService } from "../../services/userService";
import { setBalance } from "../../domain/slices/userSlice";
import depositModalStyles from "./styles/depositModalStyles";

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
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user.data);
  const [depositAmount, setDepositAmount] = useState(initialAmount);

  const userBalance = userData.gameAccount.balance;
  const userID = userData.user.userID;

  const handleDepositAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;
    setDepositAmount(newValue);
  };

  const displayCostInfo = gamePrice > 0;

  const handleConfirm = async () => {
    const newBalance = parseFloat(depositAmount) + userBalance;
    try {
      await updateGameAccountBalanceService(userID, newBalance);

      dispatch(setBalance(newBalance));

      onClose();
    } catch (error) {
      console.error("Error confirming deposit:", error);
    }
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
            <Box sx={depositModalStyles.costInfoBox}>
              <Typography variant="h6" sx={{ marginBottom: "14px" }}>
                Ditt saldo är för lågt
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} sx={depositModalStyles.costInfoGridItem}>
                  <Typography>Kostnad för spel:</Typography>
                </Grid>
                <Grid item xs={6} sx={depositModalStyles.costInfoGridItem}>
                  <Typography align="right">{gamePrice} kr</Typography>
                </Grid>
                <Grid item xs={6} sx={depositModalStyles.costInfoGridItem}>
                  <Typography>Ditt saldo:</Typography>
                </Grid>
                <Grid item xs={6} sx={depositModalStyles.costInfoGridItem}>
                  <Typography align="right">{userBalance} kr</Typography>
                </Grid>
                <Grid item xs={6} sx={depositModalStyles.costInfoGridItem}>
                  <Typography sx={{ marginBottom: "16px", fontWeight: "bold" }}>
                    Saknas:
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={depositModalStyles.costInfoGridItem}>
                  <Typography
                    sx={{ marginBottom: "16px", fontWeight: "bold" }}
                    align="right"
                  >
                    {Math.max(0, gamePrice - userBalance)} kr
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
          <Typography
            variant="h6"
            sx={{ marginTop: "12px", marginBottom: "14px" }}
          >
            Hur mycket vill du sätta in?
          </Typography>

          <Box textAlign="center">
            <TextField
              label="Eget belopp"
              variant="outlined"
              fullWidth
              value={depositAmount}
              onChange={handleDepositAmountChange}
              sx={depositModalStyles.amountTextField}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">kr</InputAdornment>
                ),
              }}
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
