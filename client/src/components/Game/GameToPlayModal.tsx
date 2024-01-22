import React, { useState } from "react";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import CustomModal from "../../ui-toolkit/components/CustomModal";
import DepositModal from "../User/DepositModal";
import { useSelector } from "react-redux";
import { RootState } from "../../domain/store";
import { useDispatch } from "react-redux";
import { updateGameAccountBalanceService } from "../../services/userService";
import { setBalance } from "../../domain/slices/userSlice";
import { GameType } from "../../models/GameType";
import {
  createGameService,
  getGameByIdService,
} from "../../services/gameService";
import { addGame } from "../../domain/slices/gameSlice";
import PurchaseSuccessModal from "./PurchaseSuccessModal";
import { Game } from "../../models/Game";

type GameToPlayModalProps = {
  open: boolean;
  onClose: () => void;
  selectedGame: GameType;
};

const GameToPlayModal: React.FC<GameToPlayModalProps> = ({
  open,
  onClose,
  selectedGame,
}) => {
  const dispatch = useDispatch();

  const [customAmount, setCustomAmount] = useState<string>("");
  const [amountSelected, setAmountSelected] = useState<boolean>(false);
  const [paymentText, setPaymentText] = useState<string>("Att betala: -");
  const [isDepositModalOpen, setDepositModalOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [purchaseSuccess, setPurchaseSuccess] = useState<boolean>(false);
  const [createdGame, setCreatedGame] = useState<Game | null>(null); // Deklarera här

  const userData = useSelector((state: RootState) => state.user.data);

  const userBalance = userData.gameAccount.balance;
  const userID = userData.user.userID;

  const handleClose = () => {
    setCustomAmount("");
    setAmountSelected(false);
    setPaymentText("Att betala: -");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCustomAmount(newValue);

    if (newValue === "") {
      setAmountSelected(false);
      setPaymentText("Att betala: -");
    } else {
      setAmountSelected(true);
      setPaymentText(`Att betala: ${parseFloat(newValue) || 0} kr`);
    }
  };

  const handlePurchaseConfirm = async () => {
    const newBalance = userBalance - parseFloat(customAmount);

    try {
      const gameData = {
        price: parseFloat(customAmount),
        gameTypeID: selectedGame.gameTypeID,
        userID: userID,
      };

      const createdGame = await createGameService(gameData);
      setCreatedGame(createdGame);

      dispatch(addGame(createdGame)); // Ta inte bort - då uppdateras inte listan rätt verkar det som - kolla upp

      if (createdGame.gameID !== undefined) {
        const updatedGame = await getGameByIdService(createdGame.gameID);
        console.log("hela: " + updatedGame.purchaseDate);

        dispatch(addGame(updatedGame));

        setCreatedGame(updatedGame);
      }

      dispatch(setBalance(newBalance));

      await updateGameAccountBalanceService(userID, newBalance);
      dispatch(setBalance(newBalance));

      setPurchaseSuccess(true);

      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDepositClick = () => {
    const remainingAmount = Math.max(0, parseFloat(customAmount) - userBalance);
    setDepositModalOpen(true);
    setDepositAmount(remainingAmount.toString());
  };

  const buttonText =
    userBalance !== undefined && userBalance >= parseFloat(customAmount)
      ? "Bekräfta"
      : amountSelected
      ? "Sätt in pengar"
      : "Bekräfta";

  const isButtonDisabled = amountSelected
    ? false
    : buttonText === "Bekräfta" && !customAmount;

  return (
    <>
      <CustomModal
        open={open}
        onClose={() => {
          handleClose();
          onClose();
        }}
        onConfirm={handlePurchaseConfirm}
        title="Bekräfta ditt spel"
        content={
          <>
            <Box
              sx={{
                textAlign: "center",
                textTransform: "uppercase",
                fontStyle: "italic",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  marginBottom: "20px",
                  fontWeight: "bold",
                }}
              >
                Miss Lissner väljer hästarna
              </Typography>
            </Box>

            <Typography variant="h6" sx={{ marginBottom: "20px" }}>
              Hur mycket vill du spela för?
            </Typography>
            <Box textAlign="center">
              {/* Lista med belopp att välja */}
              <Box>{/* ... */}</Box>

              <Box mt={2}>
                <TextField
                  label="Eget belopp"
                  variant="outlined"
                  fullWidth
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  sx={{ borderRadius: 0, mt: 1 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">kr</InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box mt={2}>
                <p>{paymentText}</p>
              </Box>
            </Box>
          </>
        }
        buttonText={buttonText}
        onButtonClick={
          userBalance !== undefined && userBalance >= parseFloat(customAmount)
            ? handlePurchaseConfirm
            : handleDepositClick
        }
        isButtonDisabled={isButtonDisabled}
        buttonColor="success"
      />

      {isDepositModalOpen && (
        <DepositModal
          open={isDepositModalOpen}
          onClose={() => setDepositModalOpen(false)}
          initialAmount={depositAmount}
          gamePrice={parseFloat(customAmount)}
        />
      )}

      {purchaseSuccess && createdGame && (
        <PurchaseSuccessModal
          open={purchaseSuccess}
          onClose={() => setPurchaseSuccess(false)}
          purchasedGame={createdGame}
        />
      )}
    </>
  );
};

export default GameToPlayModal;
