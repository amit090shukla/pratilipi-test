//----------------------------------------IMPORTS----------------------------------------------
import * as React from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import * as _ from "lodash";
import ResultCard from "./ResultCard";
import SortComponent from "./SortComponent";
import FilterComponent from "./FilterComponent";

//---------------------------------------STATE & PROPS INTERFACE-----------------------------------

export interface ResultsProps {
  carData: any;
  selectedLocation: string;
  selectedDay: string;
  classes: any;
}

//---------------------------------------RESULTS CLASS COMPONENT-----------------------------------

class Results extends React.Component<ResultsProps, any> {
  state = {
    filteredCarData: [],
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
    const { filteredCarData, sort } = this.state;
    const { classes } = this.props;
    return (
      <div
        className={`${classes.subHead} d-f s-b`}
        style={{ position: "sticky" }}
      >
        <div className={classes.meta}>{`${
          filteredCarData.length
        } Results`}</div>

        <div className="d-f">
          <SortComponent sort={sort} sortCar={this.sortCar} />
          <FilterComponent />
        </div>
      </div>
    );
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
//-----------------------------------------CSS----------------------------------------------------

const styles = (theme: Theme) => ({
  root: {
    padding: "10px 50px",
    marginTop: "30px",
    [theme.breakpoints.down("sm")]: {
      padding: "10px"
    }
  },
  searchResult: {
    display: "flex",
    marginTop: "20px"
  },
  subHead: {
    top: "50px",
    background: "#f3f3f3",
    padding: "0 20px",
    zIndex: 10
  },
  meta: {
    alignSelf: "center"
  }
});

export default withStyles(styles)(Results);
