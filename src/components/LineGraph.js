import React from "react";
import { Line } from "react-chartjs-2";

const LineGraph = (props) => {
  return (
    <div
      className="mt-4"
      style={{
        width: "600px",
        margin: "auto",
      }}
    >
      <Line
        data={{
          labels: props.label.map((l) => l.substr(0, 10)),
          datasets: [
            {
              label: "Corona Virus Across The Country",
              fill: true,
              lineTension: 0.1,
              backgroundColor: "rgba(255,145,126,0.4)",
              borderColor: "rgba(255,99,71,1)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgba(255,99,71,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor:
                "rgba(255,99,71,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: props.yAxis,
            },
          ],
        }}
      />
    </div>
  );
};

export default LineGraph;
