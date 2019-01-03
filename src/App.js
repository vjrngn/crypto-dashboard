import React, { Component } from "react";
import http from "./utils/http";

class App extends Component {
  constructor(props) {
    super(props);
    http
      .get("/api")
      .then(response => {
        console.log(response.data);
      });
  }
  render() {
    return <div>Hello</div>;
  }
}

export default App;
