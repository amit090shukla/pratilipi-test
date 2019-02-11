//----------------------------------------IMPORTS----------------------------------------------
import * as React from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import * as _ from "lodash";
import ResultCard from "./ResultCard";
import {
  Button,
  ClickAwayListener,
  Paper,
  IconButton
} from "@material-ui/core";
import { Sort } from "@material-ui/icons";

//---------------------------------------STATE & PROPS INTERFACE-----------------------------------
interface sort_option {
  [key: string]: string;
}

export interface ResultsProps {
  carData: any;
  selectedLocation: string;
  selectedDay: string;
  classes: any;
}

const SORT_OPTIONS: sort_option = {
  ASC: "₹ Low to high",
  DEC: "₹ High to low"
};

//---------------------------------------RESULTS CLASS COMPONENT-----------------------------------

class Results extends React.Component<ResultsProps, any> {
  state = {
    filteredCarData: [],
    open: false,
    sort: null
  };

  //-------------------------------------------LIFECYCLE METHODS----------------------------------------
  componentDidMount = () => {
    this.setState({
      filteredCarData: _.filter(
        this.props.carData,
        val => val.Location == this.props.selectedLocation
      )
    });
  };

  //---------------------------------------FUNCTIONS----------------------------------------------------
  isAvailableOnSelectedDay = (availability: any[]) => {
    if (availability.findIndex(day => day == this.props.selectedDay) === -1) {
      return true;
    } else {
      return false;
    }
  };

  sortCar = (sortKey: string) => {
    const newSortedData = _.filter(
      this.props.carData,
      val => val.Location == this.props.selectedLocation
    );
    this.setState({ sort: sortKey });
    _.sortBy(newSortedData, obj => obj["Price"]);
    if (sortKey === "ASC") {
      this.setState({ filteredCarData: newSortedData });
    } else {
      this.setState({ filteredCarData: newSortedData.reverse() });
    }
  };

  renderHeader = () => {
    const { filteredCarData, open, sort } = this.state;
    const { classes } = this.props;
    return (
      <div
        className={`${classes.subHead} d-f s-b`}
        style={{ position: "sticky" }}
      >
        <div className={classes.meta}>{`${
          filteredCarData.length
        } Results`}</div>
        <div>
          <ClickAwayListener onClickAway={this.handleClickAway}>
            <div style={{ position: "relative" }}>
              <IconButton>
                <Sort
                  style={{
                    transform:
                      sort === "ASC"
                        ? "rotate(180deg) scale(1.3)"
                        : "scale(1.3)"
                  }}
                />
              </IconButton>
              <Button onClick={this.handleClick} variant="outlined">
                {sort ? SORT_OPTIONS[sort] : "SORT"}
              </Button>
              {open ? (
                <Paper
                  style={{
                    position: "absolute",
                    width: "100%",
                    padding: "10px"
                  }}
                >
                  {_.map(SORT_OPTIONS, (option, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => this.sortCar(index)}
                        style={{ marginBottom: "10px" }}
                      >
                        {option}
                      </div>
                    );
                  })}
                </Paper>
              ) : null}
            </div>
          </ClickAwayListener>
        </div>
      </div>
    );
  };

  handleClick = () => {
    this.setState((state: any) => ({
      open: !state.open
    }));
  };

  handleClickAway = () => {
    this.setState({
      open: false
    });
  };

  //----------------------------------------------RENDER--------------------------------------------------
  public render() {
    const { filteredCarData } = this.state;
    const { classes } = this.props;
    return (
      <div>
        {this.renderHeader()}
        <div className={classes.root}>
          <div className={classes.searchResult} style={{ flexWrap: "wrap" }}>
            {_.map(filteredCarData, (car, index) => (
              <ResultCard
                car={car}
                key={index}
                isAvailableOnSelectedDay={this.isAvailableOnSelectedDay}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const styles = (theme: Theme) => ({
  root: {
    padding: "10px 50px",
    marginTop: "30px"
  },
  searchResult: {
    display: "flex",
    marginTop: "20px"
  },
  subHead: {
    top: "80px",
    background: "#f3f3f3",
    padding: "0 20px"
  },
  meta: {
    alignSelf: "center"
  }
});

export default withStyles(styles)(Results);
