import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// my custom components
import Container from "../../../components/Container/Container";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import Form from "../../../components/Form/Form";

// importing styles
import "./Home.css";
import axios from "axios";

export default function Home({ onAuthenticate, serverUrl }) {
  const [location, setLocation] = useState("Drumheller");
  const [year, setYear] = useState("2023");
  const [production, setProduction] = useState("");
  const [monthlyProduction, setMonthlyProduction] = useState("");
  const [productionChange, setProductionChange] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchYear, setSearchYear] = useState("");

  useEffect(() => {
    async function getProductionDetails() {
      try {
        // fetch data from the server
        const response = await axios.get(
          `${serverUrl}/admin/production?location=${location}&year=${year}`,
          {
            headers: {
              Authorization: `Bearer:${localStorage.getItem("albGasToken")}`,
            },
          }
        );

        setLocation(response.data.data.location);
        setYear(response.data.data.year);
        setProduction(response.data.data.production);
        setMonthlyProduction(response.data.data.monthlyProduction.toFixed(2));
        setProductionChange(
          response.data.data.productionChangePercentage.toFixed(2)
        );
      } catch (error) {
        console.log(error);
        if (error.response.data.statusCode === 401) {
          localStorage.removeItem("albGasToken");
          onAuthenticate(false);
        }
      }
    }
    getProductionDetails();
  }, []);

  async function handleSearchSubmit(event) {
    event.preventDefault();
    try {
      // fetch data from the server
      if (searchLocation && searchYear) {
        const response = await axios.get(
          `${serverUrl}/admin/production?location=${searchLocation}&year=${searchYear}`,
          {
            headers: {
              Authorization: `Bearer:${localStorage.getItem("albGasToken")}`,
            },
          }
        );

        setLocation(response.data.data.location);
        setYear(response.data.data.year);
        setProduction(response.data.data.production);
        setMonthlyProduction(response.data.data.monthlyProduction.toFixed(2));
        setProductionChange(
          response.data.data.productionChangePercentage.toFixed(2)
        );
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.statusCode === 401) {
        localStorage.removeItem("albGasToken");
        onAuthenticate(false);
      }
    }
  }
  return (
    <Container className={"home"}>
      <h1 className="content-title">Home</h1>
      <Container className={"search-container"}>
        <Form className={"search-form"} onSubmitFunction={handleSearchSubmit}>
          <Input
            inputType={"text"}
            inputPlaceholder={"Enter a location"}
            className={"location-input"}
            inputValue={searchLocation}
            onChangeFunction={setSearchLocation}
          />
          <Input
            inputType={"number"}
            inputPlaceholder={"Enter a Year"}
            className={"year-input"}
            inputValue={searchYear}
            onChangeFunction={setSearchYear}
          />
          <Button buttonText={"Search"} className={"search-button"} />
        </Form>
      </Container>

      <Container className={"production"}>
        <h2>
          {year} Gas Production in {location}
        </h2>
        <p>{production} metric cube</p>
      </Container>
      <Container className={"production"}>
        <h2>
          {year} Monthly Gas Production in {location}
        </h2>
        <p>{monthlyProduction} metric cube</p>
      </Container>
      <Container className={"production"}>
        <h2>
          Percentage Change in compared to {year - 1} in {location}
        </h2>
        <p>{productionChange}%</p>
      </Container>
    </Container>
  );
}

Home.propTypes = {
  onAuthenticate: PropTypes.func,
  serverUrl: PropTypes.string,
};
