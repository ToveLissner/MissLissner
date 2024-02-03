import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h3">404 - Not Found</Typography>
      <Typography variant="body1">
        The page you are looking for does not exist.
      </Typography>
      <Link to="/">Go to Home Page</Link>
    </Box>
  );
};

export default NotFound;
