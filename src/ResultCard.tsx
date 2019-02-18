//----------------------------------------IMPORTS----------------------------------------------
import * as React from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import map from "lodash/map";
import { CARD_DATA } from "./data/result_card_data";
import { Paper, Button } from "@material-ui/core";

//---------------------------------------STATE & PROPS INTERFACE-----------------------------------
interface ResultCardProps {
  car: any;
  isAvailableOnSelectedDay: (availability: any[]) => boolean;
  classes: any;
}
//---------------------------------------RESULTCARD FUNCTIONAL COMPONENT-----------------------------------

const ResultCard = (props: ResultCardProps) => {
  const { car, isAvailableOnSelectedDay, classes } = props;
  return (
    <Paper className={`${classes.root} d-f-c`}>
      <div>
        <img src={car["Photo"]} alt="" style={{ width: "100%" }} />
      </div>
      {map(CARD_DATA, (data, index) => (
        <div className={`${classes.fieldContainer} d-f`} key={index}>
          <span className={classes.label}>{data.label}</span>
          <span className={classes.value}>{car[data.key]}</span>
        </div>
      ))}
      <div className={`${classes.fieldContainer} d-f s-b`}>
        {map(car["Availability"], day => {
          return <span>{day}</span>;
        })}
      </div>
      <div className="d-f s-b">
        <div className={classes.price}>₹ {car["Price"]}</div>
        <div>
          <Button
            className={`${classes.button} c-p`}
            disabled={isAvailableOnSelectedDay(car["Availability"])}
          >
            {isAvailableOnSelectedDay(car["Availability"])
              ? `NOT AVAILABLE`
              : `BOOK`}
          </Button>
        </div>
      </div>
    </Paper>
  );
};
//-----------------------------------------CSS----------------------------------------------------

const styles = (theme: Theme) => ({
  root: {
    padding: "20px",
    marginRight: "20px",
    width: "20%",
    marginTop: "20px",
    "&:hover": {
      boxShadow: "0 0 30px #d2d2d2"
    },
    [theme.breakpoints.down("md")]: {
      width: "40%"
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginRight: "0"
    }
  },
  price: {
    fontWeight: 700,
    fontSize: "1.2em",
    color: "#536dfe"
  },
  button: {
    padding: "8px 15px",
    border: "none",
    background: "#536dfe",
    color: "#fff",
    "&:disabled": {
      backgroundColor: "#d2d2d2"
    },
    "&:hover": {
      backgroundColor: "#536dfe"
    }
  },
  label: {
    fontSize: "0.8em",
    fontWeight: 600,
    color: "#929292",
    marginRight: "15px",
    alignSelf: "center"
  },
  value: {
    fontWeight: 600
  },
  fieldContainer: {
    padding: "10px 0",
    borderBottom: "1px solid #f9f9f9"
  }
});

export default withStyles(styles)(ResultCard);
