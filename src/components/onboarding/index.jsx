import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import logoGif from "../../assets/home-page-logo.gif";
import "./styles.css";

const Onboarding = () => {
  const [showlogo, setShowLogo] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowLogo(false);
      // onComplete();
    }, 2000);
    // return () => clearTimeout(timer);
  }, []);

  return (
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
          position: "relative",
        }}
      >
        {showlogo && (
          <img
            src={logoGif}
            alt="Onboarding"
            className=" logo-animation"
            style={{
              width: "120px",
              height: "90px",
              position: "absolute",
              left: "11%",
            }}
          />
        )}
        <Typography
          className=" blink-animation "
          sx={{
            fontSize: "90px",
            fontWeight: "bold",
          }}
        >
          d
        </Typography>
        <img
          src={logoGif}
          alt="Onboarding"
          className=" blink-animation"
          style={{ width: "120px", height: "90px" }}
        />
        <Typography
          className=" blink-animation"
          sx={{
            fontSize: "90px",
            fontWeight: "bold",
          }}
        >
          dleblue
        </Typography>
      </Box>
      <Typography
        className="blink-animation logo-animatio "
        sx={{
          fontSize: "25px",
          fontWeight: "bold",
          color: "black",
          marginTop: "10px",
          letterSpacing: "3px",
        }}
      >
        {" DIGITAL STRATEGY CONSULTING"}
      </Typography>
    </Box>
  );
};

export default Onboarding;
