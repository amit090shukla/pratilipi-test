import React, { Component } from "react";
import data from "./data/car_data.json";
import Select from "react-select";
import * as _ from "lodash";
import { DAYS } from "./data/dates";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker } from "material-ui-pickers";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import car_illus from "./assets/car_illus.svg";
import Header from "./Header";
import styled from "styled-components";
import Results from "./Results";

class Homepage extends Component {
  state = {
    carData: data,
    locationData: [],
    selectedLocation: "",
    selectedDate: new Date(),
    selectedDay: DAYS[new Date().getDay()],
    showResults: false
  };
  componentDidMount = () => {
    let locationData = _.uniq(
      this.state.carData.map(cardata => cardata.Location)
    ).map(val => {
      return {
        val: val,
        label: val
      };
    });
    this.setState({ locationData });
  };

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
    this.setState({ showResults: true });
  };
  render() {
    const {
      locationData,
      selectedDate,
      showResults,
      selectedDay,
      selectedLocation,
      carData
    } = this.state;
    return (
      <div>
        <Header />
        {showResults ? (
          <Results
            carData={carData}
            selectedLocation={selectedLocation}
            selectedDay={selectedDay}
          />
        ) : (
          <StyledHomeContainer className="d-f">
            <StyledInfoContainer>
              <img src={car_illus} alt="Illustration" />
              <StyledPrimaryHead>Rent a car of your choice</StyledPrimaryHead>
              <StyledSubHead>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
                veritatis architecto repellendus
              </StyledSubHead>
            </StyledInfoContainer>
            <StyledSearchSection>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div style={{ marginBottom: "30px" }}>
                  <div className="d-f" style={{ marginBottom: "10px" }}>
                    <StyledStepIndicator>
                      <StyledStepCount>1</StyledStepCount>
                    </StyledStepIndicator>
                    <StyledStepDescription>
                      Select a location
                    </StyledStepDescription>
                  </div>
                  <Select
                    options={locationData}
                    onChange={e => this.changeLocation(e)}
                  />
                </div>
                <div>
                  <div className="d-f" style={{ marginBottom: "10px" }}>
                    <StyledStepIndicator>
                      <StyledStepCount>2</StyledStepCount>
                    </StyledStepIndicator>
                    <StyledStepDescription>Select a date</StyledStepDescription>
                  </div>
                  <DatePicker
                    value={selectedDate}
                    onChange={this.handleDateChange}
                    minDate={new Date()}
                  />
                </div>
                <StyledSearchButton
                  className="c-p"
                  onClick={() => this.validateOptions()}
                  disabled={!(selectedDay !== "" && selectedLocation !== "")}
                >
                  SEARCH
                </StyledSearchButton>
                <StyledErrorMsg>
                  {!(selectedDay !== "" && selectedLocation !== "")
                    ? "Select location & date first"
                    : null}
                </StyledErrorMsg>
              </MuiPickersUtilsProvider>
            </StyledSearchSection>
          </StyledHomeContainer>
        )}
      </div>
    );
  }
}

export default Homepage;

const StyledHomeContainer = styled.div`
  padding: 10px 50px;
  justify-content: space-between;
  margin-top: 80px;
`;
const StyledInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`;
const StyledSearchSection = styled.div`
  width: 50%;
`;
const StyledPrimaryHead = styled.div`
  font-size: 2em;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
`;

const StyledSubHead = styled.p`
  text-align: center;
`;
const StyledStepIndicator = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #536dfe;
  display: flex;
`;

const StyledStepCount = styled.div`
  color: #fff;
  font-weight: 600;
  margin: 0 auto;
  align-self: center;
`;
const StyledStepDescription = styled.span`
  align-self: center;
  margin-left: 10px;
  font-weight: 600;
`;

const StyledSearchButton = styled.button`
  background-color: #536dfe;
  border: none;
  padding: 10px 20px;
  color: #fff;
  margin-top: 20px;
  :disabled {
    background-color: #d2d2d2;
    color: #000;
  }
`;

const StyledErrorMsg = styled.div`
  font-size: 0.8em;
  color: red;
  margin-top: 10px;
`;
