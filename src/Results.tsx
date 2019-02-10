import * as React from "react";
import styled from "styled-components";
import * as _ from "lodash";
import ResultCard from "./ResultCard";

export interface ResultsProps {
  carData: any;
  selectedLocation: string;
  selectedDay: string;
}

export default class Results extends React.Component<ResultsProps, any> {
  state = {
    filteredCarData: []
  };

  componentDidMount = () => {
    this.setState({
      filteredCarData: _.filter(
        this.props.carData,
        val => val.Location == this.props.selectedLocation
      )
    });
  };

  isAvailableOnSelectedDay = (availability: any[]) => {
    if (availability.findIndex(day => day == this.props.selectedDay) === -1) {
      return true;
    } else {
      return false;
    }
  };

  public render() {
    const { filteredCarData } = this.state;
    const { selectedDay } = this.props;
    return (
      <StyledResultContainer>
        <div className="d-f">
          <h3>{`${filteredCarData.length} Results | ${selectedDay}`}</h3>
        </div>
        <StyledSearchResult>
          {_.map(filteredCarData, (car, index) => (
            <ResultCard
              car={car}
              key={index}
              isAvailableOnSelectedDay={this.isAvailableOnSelectedDay}
            />
          ))}
        </StyledSearchResult>
      </StyledResultContainer>
    );
  }
}

const StyledResultContainer = styled.div`
  padding: 10px 50px;
  margin-top: 30px;
`;
const StyledSearchResult = styled.div`
  display: flex;
  margin-top: 20px;
  flex-wrap: wrap;
`;
