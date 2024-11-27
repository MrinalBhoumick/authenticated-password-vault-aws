import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Cognito Authentication App
        </Typography>
        <Button color="inherit" component={Link} to="/signup">
          Sign Up
        </Button>
        <Button color="inherit" component={Link} to="/login">
          Log In
        </Button>
      </Toolbar>
    </AppBar>
  );
}
