import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

const CurrencyTable = ({ data }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Symbol</TableCell>
          <TableCell>Market Cap</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>% 24h</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item, index) => {
          let { price, market_cap, percent_change_24h } = item.quote["USD"];

          return (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.symbol}</TableCell>
              <TableCell>{parseFloat(market_cap).toFixed(2)}</TableCell>
              <TableCell>$ {parseFloat(price).toFixed(2)}</TableCell>
              <TableCell
                style={{
                  color: Number(percent_change_24h) < 0 ? "red" : "green",
                }}
              >
                {parseFloat(percent_change_24h).toFixed(2)} %
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default CurrencyTable;
