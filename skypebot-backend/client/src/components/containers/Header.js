import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import styles from './Header.module.css';

function Header({onLogout}) {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" color="inherit">
            skypebot
        </Typography>
        <Button className={styles.logout} color="inherit" onClick={onLogout}>Log Out</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
