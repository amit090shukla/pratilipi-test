import React, { Component } from "react";
import Homepage from "./Homepage";
import { BrowserRouter, Route } from "react-router-dom";
import "./global.css";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Homepage} />
      </BrowserRouter>
    );
  }
}

export default App;
