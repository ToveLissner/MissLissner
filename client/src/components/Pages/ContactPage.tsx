import React from "react";
import HeroImage from "../../ui-toolkit/components/HeroImage";
import ContactDisplay from "../Contact/ContactDisplay";

const ContactPage: React.FC = () => {
  return (
    <>
      <HeroImage
        imageUrl={`${process.env.PUBLIC_URL}/images/3.jpeg`}
        title="För travsnack"
        height="10vh"
      />
      <ContactDisplay />
    </>
  );
};

export default ContactPage;
