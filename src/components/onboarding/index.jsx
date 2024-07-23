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
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "transparent",
        flexDirection: "column",
        overflow: "hidden",
        width:"100%"
      }}
    >
      <img
        src={logoGif}
        alt="Onboarding"
        className={animationStarted ? "logo-expand-fade-out" : "logo-enter"}
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
      <Typography
        className={animationStarted ? "text-expand-fade-out" : "text-enter"}
        sx={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "blue",
          marginTop: "20px",
        }}
      >
        Doodleblue Innovations
      </Typography>
      <Box
        className={animationStarted ? "expand-fade-out" : ""}
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
