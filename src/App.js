import api from "./utils/api";
import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import Navigation from "./components/AppNav";
import { withStyles } from "@material-ui/core/styles";
import CurrencyChart from "./components/CurrencyChart";
import CurrencyTable from "./components/CurrencyTable";

const styles = theme => ({
  card: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    api.fetchLatest().then(data => {      
      this.setState({ data: data || [] });
    });
  }

  render() {
    const { data } = this.state;

    return (
      <React.Fragment>
        <Navigation />
        <div
          style={{
            marginTop: 100,
          }}
        >
          <CurrencyChart data={this.state.data} />
          <Paper
            style={{
              overflowX: "auto",
            }}
          >
            <CurrencyTable data={data} />
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
