import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { makeStyles } from "mui-styles";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles(() => ({
  navButton: {
    "&.MuiButtonBase-root": {
      backgroundColor: "#607d8b",
      textTransform: "none",
      marginRight: "10px",
      fontWeight: "bold",
      "&:hover": {
        backgroundColor: "#90a0a1",
      },
      "&.active": {
        backgroundColor: "white",
        color: "#278BCE",
      },
    },
  },
  "MuiToolbar-root": {
    "&active": {
      backgroundColor: "red",
    },
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Button
          variant="contained"
          className={classes.navButton}
          component={NavLink}
          to="/products"
        >
          Products
        </Button>

        <Button
          variant="contained"
          className={classes.navButton}
          component={NavLink}
          to="/users"
        >
          Users
        </Button>

        <Button
          variant="contained"
          className={classes.navButton}
          component={NavLink}
          to="/posts"
        >
          Posts
        </Button>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
