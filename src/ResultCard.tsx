import * as React from "react";
import styled from "styled-components";
import * as _ from "lodash";

interface ResultCardProps {
  car: any;
  isAvailableOnSelectedDay: (availability: any[]) => boolean;
}

export default class ResultCard extends React.Component<ResultCardProps, any> {
  public render() {
    const { car, isAvailableOnSelectedDay } = this.props;
    return (
      <StyledResults className="d-f-c">
        <div>
          <img src={car["Photo"]} alt="" style={{ width: "100%" }} />
        </div>
        <StyledFieldContainer className="d-f">
          <StyledLabel>NAME</StyledLabel>
          <StyledValue>{car["Name"]}</StyledValue>
        </StyledFieldContainer>
        <StyledFieldContainer className="d-f">
          <StyledLabel>TYPE</StyledLabel>
          <StyledValue>{car["Car_Type"]}</StyledValue>
        </StyledFieldContainer>
        <StyledFieldContainer className="d-f">
          <StyledLabel>FUEL</StyledLabel>
          <StyledValue>{car["Fuel_Type"]}</StyledValue>
        </StyledFieldContainer>
        <StyledFieldContainer className="d-f">
          <StyledLabel>LOCATION</StyledLabel>
          <StyledValue>{car["Location"]}</StyledValue>
        </StyledFieldContainer>
        <StyledFieldContainer className="d-f">
          <StyledLabel>SEATS</StyledLabel>
          <StyledValue>{car["Seats"]}</StyledValue>
        </StyledFieldContainer>
        <StyledFieldContainer
          className="d-f"
          style={{ justifyContent: "space-between" }}
        >
          {_.map(car["Availability"], day => {
            return <span>{day}</span>;
          })}
        </StyledFieldContainer>
        <div className="d-f" style={{ justifyContent: "space-between" }}>
          <StyledPrice>₹ {car["Price"]}</StyledPrice>
          <div>
            <StyledButton
              className="c-p"
              disabled={isAvailableOnSelectedDay(car["Availability"])}
            >
              {isAvailableOnSelectedDay(car["Availability"])
                ? `NOT AVAILABLE`
                : `BOOK`}
            </StyledButton>
          </div>
        </div>
      </StyledResults>
    );
  }
}

const StyledResults = styled.div`
  padding: 20px;
  margin-right: 20px;
  width: 20%;
  box-shadow: 0px 0px 1px #d2d2d2;
  margin-top: 20px;
  :hover {
    box-shadow: 0 0 30px #d2d2d2;
  }
`;

const StyledLabel = styled.span`
  font-size: 0.8em;
  font-weight: 600;
  color: #929292;
  margin-right: 15px;
  align-self: center;
`;

const StyledValue = styled.span`
  font-weight: 600;
`;

const StyledFieldContainer = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #f9f9f9;
`;
const StyledButton = styled.button`
  padding: 8px 15px;
  border: none;
  background: #536dfe;
  color: #fff;
  :disabled {
    background-color: #d2d2d2;
    color: #000;
  }
`;

const StyledPrice = styled.div`
  font-weight: 700;
  font-size: 1.2em;
  color: #536dfe;
`;
