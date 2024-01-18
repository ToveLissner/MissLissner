import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import CustomModal from "../../ui-toolkit/components/CustomModal";
import { useSelector } from "react-redux";
import { RootState } from "../../domain/store";
import { useDispatch } from "react-redux";

type GameToPlayModalProps = {
  open: boolean;
  onClose: () => void;
};

const GameToPlayModal: React.FC<GameToPlayModalProps> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const userBalance = useSelector(
    (state: RootState) => state.user.data.gameAccount.balance
  );

  //   const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [amountSelected, setAmountSelected] = useState<boolean>(false);
  const [paymentText, setPaymentText] = useState<string>("Att betala: -");

  const handleClose = () => {
    // setSelectedAmount(null);
    setCustomAmount("");
    setAmountSelected(false);
    setPaymentText("Att betala: -");
  };

  //   const handleAmountSelect = (amount: number) => {
  //     setSelectedAmount(amount);
  //     setCustomAmount("");
  //     setAmountSelected(true);
  //   };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCustomAmount(newValue);

    // Återställ amountSelected om det anpassade beloppet tas bort
    // if (selectedAmount === null && newValue === "") {
    if (newValue === "") {
      setAmountSelected(false);
      setPaymentText("Att betala: -");
    } else {
      setAmountSelected(true);
      setPaymentText(`Att betala: ${parseFloat(newValue) || 0} kr`);
    }
  };

  //   const handleCustomAmountFocus = () => {
  //     // setSelectedAmount(null);
  //     setAmountSelected(true);
  //   };

  const handleConfirm = () => {
    // if (selectedAmount !== null) {
    //   console.log(`Att betala: ${selectedAmount} kr`);
    // } else

    if (customAmount !== "") {
      const customAmountValue = parseFloat(customAmount);
      if (!isNaN(customAmountValue) && customAmountValue > 0) {
        setPaymentText(`Att betala: ${customAmountValue} kr`);

        console.log(`Summa att betala: ${customAmountValue} kr`);
      } else {
        console.error("Ogiltigt eget belopp");
      }
    } else {
      console.error("Inget belopp valt");
    }
  };

  const buttonText =
    userBalance !== undefined &&
    // userBalance >= (selectedAmount ?? 0) + parseFloat(customAmount)
    userBalance >= parseFloat(customAmount)
      ? "Bekräfta"
      : amountSelected
      ? "Sätt in pengar"
      : "Bekräfta";

  const isButtonDisabled = amountSelected
    ? false
    : buttonText === "Bekräfta" && !customAmount;

  console.log("Is button disabled:", isButtonDisabled);

  return (
    <CustomModal
      open={open}
      onClose={() => {
        handleClose();
        onClose();
      }}
      onConfirm={handleConfirm}
      title="Hur mycket vill du spela för?"
      content={
        <Box textAlign="center">
          {/* Lista med belopp att välja */}
          <Box>
            {/* <Box display="flex" justifyContent="center" mb={2}>
              {[50, 100, 150, 200].map((amount) => (
                <Button
                  key={amount}
                  onClick={() => handleAmountSelect(amount)}
                  variant={selectedAmount === amount ? "contained" : "outlined"}
                  sx={{
                    width: "25%",
                    textTransform: "none",
                    margin: 1,
                    borderRadius: 0,
                  }}
                >
                  {amount}kr
                </Button>
              ))}
            </Box>
            <Box display="flex" justifyContent="center" mb={2}>
              {[300, 400, 500, 1000].map((amount) => (
                <Button
                  key={amount}
                  onClick={() => handleAmountSelect(amount)}
                  variant={selectedAmount === amount ? "contained" : "outlined"}
                  sx={{
                    width: "25%",
                    textTransform: "none",
                    margin: 1,
                    borderRadius: 0,
                  }}
                >
                  {amount}kr
                </Button>
              ))}
            </Box> */}
          </Box>

          <Box mt={2}>
            <TextField
              label="Ange eget belopp"
              variant="outlined"
              fullWidth
              value={customAmount}
              onChange={handleCustomAmountChange}
              //   onFocus={handleCustomAmountFocus}
              sx={{ borderRadius: 0, mt: 1 }}
            />
          </Box>

          <Box mt={2}>
            <p>{paymentText}</p>
          </Box>
        </Box>
      }
      buttonText={buttonText}
      onButtonClick={
        userBalance !== undefined &&
        // userBalance >= (selectedAmount ?? 0) + parseFloat(customAmount)
        userBalance >= parseFloat(customAmount)
          ? handleConfirm
          : () => console.log("Sätt in pengar")
      }
      isButtonDisabled={isButtonDisabled}
    />
  );
};

export default GameToPlayModal;
