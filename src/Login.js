import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { login } from "./cognito";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(email, password);
      // Redirect to the target website on successful login
      window.location.href = "https://password-vault-aws.vercel.app/";
    } catch (err) {
      setMessage(err.message || "An error occurred.");
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <Typography variant="h5">Log In</Typography>
      <TextField
        label="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" onClick={handleLogin} sx={{ mt: 2 }}>
        Log In
      </Button>
      {message && <Typography color="error" mt={2}>{message}</Typography>}
    </Box>
  );
}
