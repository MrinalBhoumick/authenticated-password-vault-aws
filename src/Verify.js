import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { CognitoUser } from "amazon-cognito-identity-js";
import { userPool } from "./cognito"; // Assuming you have a cognito.js file where the userPool is configured.
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

export default function Verify() {
  const { state } = useLocation();  // Use useLocation hook to get the state passed from SignUp.js
  const email = state?.email || "";  // Get the email from the state
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleVerify = async () => {
    setLoading(true);
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    user.confirmRegistration(code, true, (err, result) => {
      setLoading(false);
      if (err) {
        setMessage(err.message || "Verification failed.");
        return;
      }

      setMessage("Verification successful! Redirecting to login page...");

      // Redirect to the login page after a successful verification
      setTimeout(() => {
        navigate("/login");  // Redirect to the login page
      }, 2000);  // Wait 2 seconds before redirecting
    });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <Typography variant="h5">Verify Account</Typography>
      <TextField
        label="Verification Code"
        type="text"
        onChange={(e) => setCode(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        onClick={handleVerify}
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify"}
      </Button>
      {message && <Typography color="error" mt={2}>{message}</Typography>}
    </Box>
  );
}
