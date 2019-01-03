import api from "./utils/api";
import React, { Component } from "react";
import Navigation from "./components/AppNav";
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

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
  state = {
    data: [],
  };

  componentDidMount() {
    api.fetchLatest().then(data => {
      this.setState({ data });
    });
  }
  render() {
    const { data } = this.state;

    return (
      <React.Fragment>
        <Navigation />
        <div
          style={{
            marginTop: 80,
          }}
        >
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Symbol</TableCell>
                  <TableCell>Market Cap</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Circulating Supply</TableCell>
                  <TableCell>Volume (24h)</TableCell>
                  <TableCell>% 24h</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) => {
                  let {
                    price,
                    market_cap,
                    volume_24h,
                    percent_change_24h,
                  } = item.quote["USD"];

                  return (
                    <TableRow key={item.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.symbol}</TableCell>
                      <TableCell>{parseFloat(market_cap).toFixed(2)}</TableCell>
                      <TableCell>$ {parseFloat(price).toFixed(2)}</TableCell>
                      <TableCell>
                        {parseFloat(item.circulating_supply).toFixed(2)}
                      </TableCell>
                      <TableCell>{parseFloat(volume_24h).toFixed(2)}</TableCell>
                      <TableCell
                        style={{
                          color:
                            Number(percent_change_24h) < 0 ? "red" : "green",
                        }}
                      >
                        {parseFloat(percent_change_24h).toFixed(2)} %
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
