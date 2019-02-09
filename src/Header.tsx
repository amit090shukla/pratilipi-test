import * as React from "react";
import styled from "styled-components";
import logo from "./assets/logo.svg";
export interface HeaderProps {}

const StyledHeader = styled.div`
  height: 50px;
  padding: 10px 60px;
  box-shadow: 0px 3px 6px #d2d2d2;
  margin-bottom: 10px
  display: flex;
`;
const StyledLogo = styled.img`
  width: 40px;
`;
const StyledLogoText = styled.h3`
  align-self: center;
  color: #536dfe;
  margin-left: 10px;
`;
export default class Header extends React.Component<HeaderProps, any> {
  public render() {
    return (
      <StyledHeader>
        {/* <StyledLogo src={logo} alt="" /> */}
        <StyledLogoText onClick={() => location.reload()} className="c-p">
          BOOK-A-CAR
        </StyledLogoText>
      </StyledHeader>
    );
  }
}
