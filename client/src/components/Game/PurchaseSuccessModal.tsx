import React from "react";
import { Box } from "@mui/material";
import CustomModal from "../../ui-toolkit/components/CustomModal";
import { Game } from "../../models/Game";
import GameCardDetailed from "./GameCardDetailed";

type PurchaseSuccessModalProps = {
  open: boolean;
  onClose: () => void;
  purchasedGame: Game;
};

const PurchaseSuccessModal: React.FC<PurchaseSuccessModalProps> = ({
  open,
  onClose,
  purchasedGame,
}) => {
  console.log(purchasedGame);
  console.log("date: " + purchasedGame.purchaseDate);
  console.log("price: " + purchasedGame.price);

  return (
    <>
      <CustomModal
        open={open}
        onClose={onClose}
        onConfirm={() => {}}
        title="Bekräftelse"
        content={
          <Box>
            <GameCardDetailed game={purchasedGame} />
          </Box>
        }
        buttonText="Stäng"
        onButtonClick={onClose}
        isButtonDisabled={false}
      />
    </>
  );
};

export default PurchaseSuccessModal;
