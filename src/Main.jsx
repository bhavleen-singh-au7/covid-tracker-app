import React, { useEffect, useState } from "react";
import LineGraph from "./components/LineGraph";
import CovidSummary from "./components/CovidSummary";
import Loading from "./components/Loading";
import axios from "./axios";

const Main = () => {
  const [totalConfirmed, setTotalConfirmed] = useState(0);
  const [totalRecovered, setTotalRecovered] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);
  const [covidSummary, setCovidSummary] = useState({});
  const [country, setCountry] = useState("");
  const [days, setDays] = useState(7);
  const [coronaCountArr, setCoronaCountArr] = useState([]);
  const [label, setLabel] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/summary`)
      .then((res) => {
        setLoading(false);

        if (res.status === 200) {
          setTotalConfirmed(res.data.Global.TotalConfirmed);
          setTotalRecovered(res.data.Global.TotalRecovered);
          setTotalDeaths(res.data.Global.TotalDeaths);
          setCovidSummary(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const formatDate = (date) => {
    const d = new Date(date);

    const year = d.getFullYear();
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const _date = `0${d.getDate()}`.slice(-2);

    return `${year}-${month}-${_date}`;
  };

  const countryHandler = (e) => {
    setCountry(e.target.value);
    const d = new Date();
    const to = formatDate(d);
    const from = formatDate(d.setDate(d.getDate() - days));

    getCoronaReportByDateRange(e.target.value, from, to);
  };

  const daysHandler = (e) => {
    setDays(e.target.value);
    const d = new Date();
    const to = formatDate(d);
    const from = formatDate(
      d.setDate(d.getDate() - e.target.value)
    );

    getCoronaReportByDateRange(country, from, to);
  };

  const getCoronaReportByDateRange = (
    countrySlug,
    from,
    to
  ) => {
    axios
      .get(
        `/country/${countrySlug}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`
      )
      .then((res) => {
        const yAxisCoronaCount = res.data.map(
          (d) => d.Cases
        );
        const xAxisLabel = res.data.map((d) => d.Date);

        const covidDetails = covidSummary.Countries.find(
          (country) => country.Slug === countrySlug
        );

        setCoronaCountArr(yAxisCoronaCount);
        setTotalConfirmed(covidDetails.TotalConfirmed);
        setTotalRecovered(covidDetails.TotalRecovered);
        setTotalDeaths(covidDetails.TotalDeaths);
        setLabel(xAxisLabel);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="text-center">
      <CovidSummary
        totalConfirmed={totalConfirmed}
        totalRecovered={totalRecovered}
        totalDeaths={totalDeaths}
        country={country}
      />

      <div>
        <select
          value={country}
          onChange={countryHandler}
          className="p-2 my-1 rounded bg-secondary mx-5 text-white font-weight-bold"
        >
          <option value="">Select Country</option>
          {covidSummary.Countries &&
            covidSummary.Countries.map((country) => (
              <option
                value={country.Slug}
                key={country.Slug}
              >
                {country.Country}
              </option>
            ))}
        </select>

        <select
          value={days}
          onChange={daysHandler}
          className="p-2 rounded bg-secondary mx-5 text-white font-weight-bold"
        >
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 90 Days</option>
        </select>
      </div>
      <LineGraph yAxis={coronaCountArr} label={label} />
    </div>
  );
};

export default Main;
