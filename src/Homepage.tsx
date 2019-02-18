//----------------------------------------IMPORTS----------------------------------------------
import React, { Component } from "react";
import data from "./data/car_data.json";
import Select from "react-select";
import { withStyles, Theme } from "@material-ui/core/styles";
import * as _ from "lodash";
import { DAYS } from "./data/dates";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker } from "material-ui-pickers";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import car_illus from "./assets/car_illus.svg";
import Header from "./Header";
import Results from "./Results";
//---------------------------------------STATE & PROPS INTERFACE-----------------------------------

interface HomepageProps {
  classes: any;
}
interface HomepageState {
  carData: any;
  locationData: any[];
  selectedLocation: string;
  selectedDate: any;
  selectedDay: string;
  showResults: boolean;
  filteredCarData: any[];
}
//---------------------------------------HOMEPAGE CLASS COMPONENT-----------------------------------

class Homepage extends Component<HomepageProps, HomepageState> {
  state: HomepageState = {
    carData: data,
    locationData: [],
    selectedLocation: "",
    selectedDate: new Date(),
    selectedDay: DAYS[new Date().getDay()],
    showResults: false,
    filteredCarData: []
  };
  //-------------------------------------------LIFECYCLE METHODS----------------------------------------

  componentDidMount = () => {
    let locationData = _.uniq(
      this.state.carData.map((cardata: any) => cardata.Location)
    ).map(val => {
      return {
        val: val,
        label: val
      };
    });
    this.setState({ locationData });
  };
  //---------------------------------------FUNCTIONS----------------------------------------------------

  changeLocation = (e: any) => {
    this.setState({ selectedLocation: e.val });
  };

  handleDateChange = (date: any) => {
    this.setState({ selectedDate: date }, () => {
      const selectedDay = DAYS[this.state.selectedDate.getDay()];
      this.setState({ selectedDay });
    });
  };
  validateOptions = () => {
    const { carData, selectedLocation } = this.state;
    this.setState(
      {
        filteredCarData: _.filter(
          carData,
          val => val.Location == selectedLocation
        )
      },
      () => this.setState({ showResults: true })
    );
  };

  //---------------------------------------RENDER METHOD---------------------------------------------
  render() {
    const {
      locationData,
      selectedDate,
      showResults,
      selectedDay,
      selectedLocation,
      carData,
      filteredCarData
    } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Header />
        {showResults ? (
          <Results
            carData={filteredCarData}
            selectedLocation={selectedLocation}
            selectedDay={selectedDay}
          />
        ) : (
          <div className={classes.root}>
            <div className={classes.info}>
              <img src={car_illus} alt="Illustration" />
              <div className={classes.head}>Rent a car of your choice</div>
              <p className={classes.subhead}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
                veritatis architecto repellendus
              </p>
            </div>
            <div className={classes.searchSection}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div style={{ marginBottom: "30px" }}>
                  <div className="d-f" style={{ marginBottom: "10px" }}>
                    <div className={classes.stepIndicator}>
                      <div className={classes.count}>1</div>
                    </div>
                    <span className={classes.desc}>Select a location</span>
                  </div>
                  <Select
                    options={locationData}
                    onChange={e => this.changeLocation(e)}
                  />
                </div>
                <div>
                  <div className="d-f" style={{ marginBottom: "10px" }}>
                    <div className={classes.stepIndicator}>
                      <div className={classes.count}>2</div>
                    </div>
                    <span className={classes.desc}>Select a date</span>
                  </div>
                  <DatePicker
                    value={selectedDate}
                    onChange={this.handleDateChange}
                    minDate={new Date()}
                    style={{ width: "100%" }}
                  />
                </div>
                <button
                  className={`${classes.searchBtn} c-p`}
                  onClick={() => this.validateOptions()}
                  disabled={!(selectedDay !== "" && selectedLocation !== "")}
                >
                  SEARCH
                </button>
                <div className={classes.errMsg}>
                  {!(selectedDay !== "" && selectedLocation !== "")
                    ? "Select location & date first"
                    : null}
                </div>
              </MuiPickersUtilsProvider>
            </div>
          </div>
        )}
      </div>
    );
  }
}

//-----------------------------------------CSS----------------------------------------------------

const styles: any = (theme: Theme) => ({
  root: {
    padding: "10px 50px",
    justifyContent: "space-between",
    marginTop: "80px",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      marginBottom: "40px"
    }
  },
  info: {
    display: "flex",
    flexDirection: "column",
    width: "40%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: "50px"
    }
  },
  searchSection: {
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  head: {
    fontSize: "2em",
    fontWeight: 600,
    textAlign: "center",
    marginBottom: "20px"
  },
  subhead: {
    textAlign: "center"
  },
  stepIndicator: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: "#536dfe",
    display: "flex"
  },
  count: {
    color: "#fff",
    fontWeight: 600,
    margin: "0 auto",
    alignSelf: "center"
  },
  desc: {
    alignSelf: "center",
    marginLeft: "10px",
    fontWeight: 600
  },
  searchBtn: {
    backgroundColor: "#536dfe",
    border: "none",
    padding: "10px 20px",
    color: "#fff",
    marginTop: "20px",
    "&:disabled": {
      backgroundColor: "#d2d2d2",
      color: "#000"
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  errMsg: {
    fontSize: "0.8em",
    color: "red",
    marginTop: "10px"
  }
});

export default withStyles(styles)(Homepage);
