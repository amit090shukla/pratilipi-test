import * as React from "react";
import {
  Button,
  ClickAwayListener,
  Paper,
  IconButton
} from "@material-ui/core";
import { Sort } from "@material-ui/icons";
import * as _ from "lodash";

export interface SortComponentProps {
  sort: any;
  sortCar: (index: any) => any;
}

interface sort_option {
  [key: string]: string;
}

const SORT_OPTIONS: sort_option = {
  ASC: "₹ Low to high",
  DEC: "₹ High to low"
};
export default class SortComponent extends React.Component<
  SortComponentProps,
  any
> {
  state = {
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

  public render() {
    const { sort, sortCar } = this.props;
    const { open } = this.state;
    return (
      <div>
        <ClickAwayListener onClickAway={this.handleClickAway}>
          <div style={{ position: "relative" }}>
            <IconButton>
              <Sort
                style={{
                  transform:
                    sort === "ASC" ? "rotate(180deg) scale(1.3)" : "scale(1.3)"
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
                      onClick={() => sortCar(index)}
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
    );
  }
}
