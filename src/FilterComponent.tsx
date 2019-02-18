import React from "react";
import {
  Button,
  ClickAwayListener,
  Paper,
  withStyles,
  Theme
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import map from "lodash/map";

interface filter_type {
  [key: string]: boolean;
}

interface SelectOption {
  name: string;
  value: string;
}

interface FilterComponentState {
  open: boolean;
  filters: filter_type;
}

interface FilterComponentProps {
  label: string;
  options: SelectOption[];
  applyFilter: (filters: string[]) => any;
  classes: any;
}

class FilterComponent extends React.Component<
  FilterComponentProps,
  FilterComponentState
> {
  state: FilterComponentState = {
    open: false,
    filters: {} as filter_type
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

  handleChange = (value: string) => () => {
    const filters = { ...this.state.filters };
    if (filters[value]) {
      delete filters[value];
    } else {
      filters[value] = true;
    }
    this.setState({ filters });
  };

  applyFilters = () => {
    let selected: string[] = [];
    map(this.state.filters, (val: boolean, key: string) => {
      if (val === true) selected.push(key);
    });
    this.setState({ open: false });
    this.props.applyFilter(selected);
  };

  render() {
    const { props } = this,
      { open } = this.state;
    const { classes } = props;
    return (
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <div style={{ position: "relative" }} className="m-r-5">
          <Button
            onClick={this.handleClick}
            variant="outlined"
            className={classes.filterBtn}
          >
            {this.props.label}
          </Button>
          {open ? (
            <Paper className={classes.filterOptionContainer}>
              {map(props.options, ({ name, value }: SelectOption) => {
                return (
                  <div
                    className="d-f s-b"
                    style={{ alignItems: "center" }}
                    key={value}
                  >
                    <span>{name}</span>
                    <Checkbox
                      checked={this.state.filters[value]}
                      onChange={this.handleChange(value)}
                      color="primary"
                    />
                  </div>
                );
              })}
              <Button
                variant="contained"
                color="primary"
                onClick={this.applyFilters}
              >
                Apply
              </Button>
            </Paper>
          ) : null}
        </div>
      </ClickAwayListener>
    );
  }
}

const styles: any = (theme: Theme) => ({
  filterOptionContainer: {
    position: "absolute",
    width: "100%",
    padding: "10px",
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "#fff",
      zIndex: "10"
    }
  },

  filterBtn: {
    padding: "10px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: "5px"
    }
  }
});

export default withStyles(styles)(FilterComponent);
