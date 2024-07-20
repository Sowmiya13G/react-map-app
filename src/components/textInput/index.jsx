import { TextField } from "@mui/material";
import React from "react";

export const TextInput = ({ label, name, value, onChange, onBlur, err }) => (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      variant="outlined"
      sx={{
        width: "100%",
        "& .MuiInputBase-root": {
          height: { xs: "40px", md: "85px" }, 
        },
        "& .MuiInputLabel-root": {
          fontSize: { xs: "14px", md: "25px" }, 
        },
        "& .MuiInputBase-input": {
          fontSize: { xs: "14px", md: "25px" }, 
        },
        marginBottom: {xs:2, md:3},
      }}
      error={!!err}
      helperText={err}
    />
);
