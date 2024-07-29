import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import logoGif from "../../assets/home-page-logo.gif";
import "./styles.css";

const Onboarding = ({ onComplete }) => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
      setTimeout(() => {
        setShowOnboarding(false);
        onComplete();
      }, 3200);
    }, 1000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return showOnboarding ? (
    <Box
      className="animated-background"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#fff",
        flexDirection: "column",
        overflow: "hidden",
        width: "100%",
      }}
    >
      <Typography
        sx={{
          fontSize: "90px",
          fontWeight: "bold",
          color: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        d
        <img
          src={logoGif}
          alt="Onboarding"
          style={{ width: "120px", height: "90px"}}
        />
        dleblue
      </Typography>
      <Typography
        sx={{
          fontSize: "25px",
          fontWeight: "bold",
          color: "black",
          marginTop:"10px",
          letterSpacing:"3px"
        }}
      >
        DIGITAL STRATEGY CONSULTING
      </Typography>
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      />
    </Box>
  ) : null;
};

export default Onboarding;
