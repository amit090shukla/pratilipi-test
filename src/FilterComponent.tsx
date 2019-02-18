import React from "react";
import {
  Button,
  ClickAwayListener,
  Paper,
  IconButton
} from "@material-ui/core";
import { FilterList } from "@material-ui/icons";
import Checkbox from "@material-ui/core/Checkbox";
import map from "lodash/map";

interface filter_type {
  [key: string]: string;
}
const FILTER_TYPE: filter_type = {
  Petrol: "Petrol",
  Diesel: "Diesel",
  Manual: "Manual",
  Automatic: "Automatic"
};

interface FilterComponentState {
  filter: {
    [key: string]: boolean;
  };
  open: boolean;
}

class FilterComponent extends React.Component<{}, FilterComponentState> {
  state: FilterComponentState = {
    filter: {
      Petrol: false,
      Diesel: false,
      Manual: false,
      Automatic: false
    },
    open: false
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

  handleChange = (name: string) => (event: any) => {
    this.setState({
      filter: { ...this.state.filter, [name]: event.target.checked }
    });
  };

  render() {
    const { open } = this.state;
    return (
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <div style={{ position: "relative" }}>
          <IconButton>
            <FilterList />
          </IconButton>
          <Button onClick={this.handleClick} variant="outlined">
            FILTER
          </Button>
          {open ? (
            <Paper
              style={{
                position: "absolute",
                width: "100%",
                padding: "10px"
              }}
            >
              {map(FILTER_TYPE, (val: string, key: number) => {
                return (
                  <div
                    className="d-f s-b"
                    style={{ alignItems: "center" }}
                    key={key}
                  >
                    <span>{val}</span>
                    <Checkbox
                      checked={this.state.filter[val]}
                      onChange={this.handleChange(val)}
                      value={this.state.filter[val]}
                      color="primary"
                    />
                  </div>
                );
              })}
              <Button variant="contained" color="primary">
                Apply
              </Button>
            </Paper>
          ) : null}
        </div>
      </ClickAwayListener>
    );
  }
}

export default FilterComponent;
