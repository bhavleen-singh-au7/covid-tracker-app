import React, { Fragment } from "react";
import NumberFormat from "react-number-format";

const CovidSummary = (props) => {
  const {
    totalConfirmed,
    totalRecovered,
    totalDeaths,
    country,
  } = props;

  return (
    <Fragment>
      <h1 className="text-capitalize">
        {country === ""
          ? "World Wide Corona Report"
          : `${country} Corona Report`}
      </h1>

      <div className="d-flex justify-content-center container">
        <div className="card text-white text-uppercase m-3 border border-warning">
          <div className="card-header">Total Confirmed</div>
          <div className="card-body">
            <p className="card-text">
              {
                <NumberFormat
                  value={totalConfirmed}
                  displayType={"text"}
                  thousandSeparator={true}
                />
              }
            </p>
          </div>
        </div>

        <div className="card text-white text-uppercase m-3 border border-success">
          <div className="card-header">Total Recovered</div>
          <div className="card-body">
            <p className="card-text">
              {
                <NumberFormat
                  value={totalRecovered}
                  displayType={"text"}
                  thousandSeparator={true}
                />
              }
            </p>
          </div>
        </div>

        <div className="card text-white text-uppercase m-3 border-1 border-danger">
          <div className="card-header">Total Deaths</div>
          <div className="card-body">
            <p className="card-text">
              {
                <NumberFormat
                  value={totalDeaths}
                  displayType={"text"}
                  thousandSeparator={true}
                />
              }
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CovidSummary;
