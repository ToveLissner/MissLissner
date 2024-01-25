import React from "react";
import { Box } from "@mui/material";
import GamesToPlay from "../Game/GamesToPlay";
import HeroImage from "../../ui-toolkit/components/HeroImage";

const HomePage: React.FC = () => {
  return (
    <Box>
      <HeroImage
        imageUrl={`${process.env.PUBLIC_URL}/images/3.jpeg`}
        title="För dig som vill vara med i spelet"
        subtitle="- men gärna unviker jobbet"
      />
      <GamesToPlay />

      <HeroImage
        imageUrl={`${process.env.PUBLIC_URL}/images/7.jpeg`}
        title="Låt spelet starta"
        height="400px"
      />
    </Box>
  );
};

export default HomePage;
