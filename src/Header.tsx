//----------------------------------------IMPORTS----------------------------------------------
import * as React from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

//---------------------------------------HEADER CLASS COMPONENT-----------------------------------

const Header = (props: any) => {
  const { classes } = props;
  return (
    <Paper className={`${classes.root} c-p`} style={{ position: "sticky" }}>
      <h3 onClick={() => location.reload()} className={classes.logoText}>
        BOOK-A-CAR
      </h3>
    </Paper>
  );
};

const styles = (theme: Theme) => ({
  root: {
    height: "50",
    padding: "10px 60px",
    marginBottom: "10px",
    display: "flex",
    top: 0,
    backgroundColor: "#fff"
  },
  logoText: {
    alignSelf: "center",
    color: "#536dfe",
    marginLeft: "10px",
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto"
    }
  }
});

export default withStyles(styles)(Header);
