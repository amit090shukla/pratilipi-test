import * as React from "react";
import {
  Button,
  ClickAwayListener,
  Paper,
  IconButton,
  Divider,
  Theme,
  withStyles
} from "@material-ui/core";
import { Sort } from "@material-ui/icons";
import * as _ from "lodash";

export interface SortComponentProps {
  sort: any;
  sortCar: (index: any) => any;
  classes: any;
}

interface sort_option {
  [key: string]: string;
}

const SORT_OPTIONS: sort_option = {
  ASC: "₹ Low to high",
  DEC: "₹ High to low"
};
class SortComponent extends React.Component<SortComponentProps, any> {
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
    const { sort, sortCar, classes } = this.props;
    const { open } = this.state;
    return (
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <div className={classes.sortOptionWrapper}>
          <IconButton className={classes.sortIcon}>
            <Sort
              style={{
                transform:
                  sort === "ASC" ? "rotate(180deg) scale(1.3)" : "scale(1.3)"
              }}
            />
          </IconButton>
          <Button
            onClick={this.handleClick}
            variant="outlined"
            className={classes.sortBtn}
          >
            {sort ? SORT_OPTIONS[sort] : "SORT"}
          </Button>
          {open ? (
            <Paper className={classes.sortOptionContainer}>
              {_.map(SORT_OPTIONS, (option, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => sortCar(index)}
                    style={{ marginBottom: "10px" }}
                  >
                    <span className="c-p">{option}</span>
                    <Divider light={true} style={{ margin: "10px 0" }} />
                  </div>
                );
              })}
            </Paper>
          ) : null}
        </div>
      </ClickAwayListener>
    );
  }
}

const styles: any = (theme: Theme) => ({
  sortIcon: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  sortBtn: {
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  sortOptionWrapper: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: "10px",
      marginRight: "0px"
    }
  },

  sortOptionContainer: {
    position: "absolute",
    padding: "10px",
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "#fff",
      zIndex: "10",
      width: "80%"
    }
  }
});

export default withStyles(styles)(SortComponent);
