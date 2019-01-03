import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

function dataToChart(data) {
  return data.map(item => {
    return {
      label: item.symbol,
      value: item.quote.USD.price,
    };
  });
}

class CurrencyChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: dataToChart(props.data),
    };

    this.chartConfig = {
      type: "column2d",
      width: "100%",
      height: "400",
      dataFormat: "json",
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: dataToChart(nextProps.data),
    });
  }

  render() {
    return (
      <ReactFC
        {...this.chartConfig}
        dataSource={{
          chart: {
            caption: "Crypto Currency Prices",
            xAxisName: "Symbol",
            yAxisName: "Price",
            numberPrefix: "$",
            theme: "fusion",
          },
          data: this.state.data,
        }}
      />
    );
  }
}

export default CurrencyChart;
