import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { signUp } from "./cognito";  // Import the signUp function from cognito.js
import { useNavigate } from "react-router-dom";  // Import useNavigate from react-router-dom

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleSignUp = async () => {
    setLoading(true);
    try {
      // Call the signUp function to create a new user
      await signUp(email, password);
      setMessage("Sign up successful! Please check your email for the verification code.");

      // Redirect to the Verify page after successful sign up
      setTimeout(() => {
        navigate("/verify", { state: { email } });  // Pass email to Verify.js using state
      }, 2000);  // Wait 2 seconds before redirecting
    } catch (err) {
      setMessage(err.message || "An error occurred.");
    }
    setLoading(false);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <Typography variant="h5">Sign Up</Typography>
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
      <Button
        variant="contained"
        onClick={handleSignUp}
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </Button>
      {message && <Typography color="error" mt={2}>{message}</Typography>}
    </Box>
  );
}
