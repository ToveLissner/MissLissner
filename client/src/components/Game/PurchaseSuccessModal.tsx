import React from "react";
import { Box, Typography } from "@mui/material";
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
  return (
    <>
      <CustomModal
        open={open}
        onClose={onClose}
        onConfirm={() => {}}
        title="Kvitto"
        width="auto"
        content={
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ marginBottom: "15px" }}>
              Ditt spel är inlämnat
            </Typography>
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
