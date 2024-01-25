import React from "react";
import PurchasedGames from "../Game/PurchasedGames";
import HeroImage from "../../ui-toolkit/components/HeroImage";

const PurchasedPage: React.FC = () => {
  return (
    <>
      <HeroImage
        imageUrl={`${process.env.PUBLIC_URL}/images/3.jpeg`}
        title="Låt spelet starta"
        height="10vh"
      />

      <PurchasedGames />
    </>
  );
};

export default PurchasedPage;
