import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import logoGif from "../../assets/home-page-logo.gif";
import "./styles.css";

const Onboarding = ({ onComplete }) => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
      setTimeout(() => {
        setTextVisible(true);
        setTimeout(() => {
          setShowOnboarding(false);
          onComplete();
        }, 3150);
      }, 1000);
    }, 700);

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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Typography
          className={`text-fade-in ${animationStarted ? "fade-out" : ""}`}
          sx={{
            fontSize: "90px",
            fontWeight: "bold",
            color: animationStarted ?"black": "transparent",
          }}
        >
          d
        </Typography>
        <img
          src={logoGif}
          alt="Onboarding"
          className={`logo-animation`}
          style={{ width: "120px", height: "90px" }}
        />
        <Typography
          className={`text-fade-in ${animationStarted ? "fade-out" : ""}`}
          sx={{
            fontSize: "90px",
            fontWeight: "bold",
            color: animationStarted ?"black": "transparent",
          }}
        >
          dleblue
        </Typography>
      </Box>
      {textVisible && (
        <Typography
          className={`text-fade-in typing-effect`}
          sx={{
            fontSize: "25px",
            fontWeight: "bold",
            color: "black",
            marginTop: "10px",
            letterSpacing: "3px",
          }}
        >
          DIGITAL STRATEGY CONSULTING
        </Typography>
      )}
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
