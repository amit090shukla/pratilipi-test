//----------------------------------------IMPORTS----------------------------------------------
import * as React from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import * as _ from "lodash";
import ResultCard from "./ResultCard";
import SortComponent from "./SortComponent";
import FilterComponent from "./FilterComponent";
import { FILTER_CATEGORY } from "./data/filter_category";

//---------------------------------------STATE & PROPS INTERFACE-----------------------------------

interface ResultsProps {
  carData: any;
  selectedLocation: string;
  selectedDay: string;
  classes: any;
}

interface KeyValue {
  [t: string]: string[];
}

interface ResultsState {
  filters: KeyValue;
}

const options = {
  Car_Type: [
    { name: "Hatchback", value: "Hatchback" },
    { name: "SUV", value: "SUV" },
    { name: "Sedan", value: "Sedan" },
    { name: "Mini SUV", value: "Mini SUV" }
  ],
  Fuel_Type: [
    { name: "Petrol", value: "Petrol" },
    { name: "Diesel", value: "Diesel" }
  ],
  Transmission: [
    { name: "Manual", value: "Manual" },
    { name: "Automatic", value: "Automatic" }
  ]
};

//---------------------------------------RESULTS CLASS COMPONENT-----------------------------------

class Results extends React.Component<ResultsProps, any> {
  state = {
    filteredCarData: this.props.carData,
    sort: null,
    appliedFilter: [],
    filters: {} as KeyValue
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
    this.setState({ sort: sortKey });
    const newSortedCarData = _.sortBy(
      this.state.filteredCarData,
      obj => obj["Price"]
    );

    if (sortKey === "ASC") {
      this.setState({
        filteredCarData: newSortedCarData
      });
    } else {
      this.setState({
        filteredCarData: newSortedCarData.reverse()
      });
    }
  };

  applyFilter = (category: string) => (values: string[]) => {
    const filters = { ...this.state.filters };
    filters[category] = values;
    this.setState({ filters }, () => this.getFilteredData());
  };

  getFilteredData = () => {
    const { state, props } = this,
      filters = { ...state.filters };
    let filteredCarData = { ...props.carData };
    _.forEach(filters, (values, filterKey) => {
      const filteredAppliedData = _.map(filteredCarData, data => {
        if (_.includes(values, data[filterKey])) {
          return data;
        }
        return null;
      });
      filteredCarData = filteredAppliedData.filter(Boolean);
    });
    this.setState({ filteredCarData });
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

        <div className={`${classes.actionContainer} d-f a-i-c`}>
          <SortComponent sort={sort} sortCar={this.sortCar} />
          <span className={classes.divider}> | </span>
          <div className={`${classes.filterContainer} d-f`}>
            <FilterComponent
              label={"Fuel Type"}
              options={options["Fuel_Type"]}
              applyFilter={this.applyFilter("Fuel_Type")}
            />
            <FilterComponent
              label={"Car Type"}
              options={options["Car_Type"]}
              applyFilter={this.applyFilter("Car_Type")}
            />
            <FilterComponent
              label={"Transmission"}
              options={options["Transmission"]}
              applyFilter={this.applyFilter("Transmission")}
            />
          </div>
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
                key={index}
                car={car}
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

const styles: any = (theme: Theme) => ({
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
    alignSelf: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  actionContainer: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      flexDirection: "column"
    }
  },
  filterContainer: {
    [theme.breakpoints.down("sm")]: {
      flex: "1",
      width: "100%",
      justifyContent: "space-between"
    }
  },
  divider: {
    margin: "0 25px",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  }
});

export default withStyles(styles)(Results);
