import { TextField } from "@mui/material";
import React from "react";

export const TextInput = ({ label, name, value, onChange, onBlur, err }) => (
  <div style={{ marginBottom: "1rem" }}>
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      variant="outlined"
      sx={{ width: "100%" }}
      error={!!err}
      helperText={err}
    />
  </div>
);
