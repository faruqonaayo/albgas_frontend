import { useState } from "react";
import PropTypes from "prop-types";

// my custom components
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import Home from "./Home/Home";

// importing styles
import "./Dashboard.css";

export default function Dashboard({ onAuthenticate, serverUrl }) {
  const [dashboardPage, setDashboardPage] = useState("home");

  function renderHomePage() {
    setDashboardPage("home");
  }
  function renderComparisonPage() {
    setDashboardPage("comparison");
  }
  function renderProfilePage() {
    setDashboardPage("profile");
  }
  function logOut() {
    localStorage.removeItem("albGasToken");
    onAuthenticate(false);
  }

  return (
    <div className="Dashboard">
      <Container className={"dashboard-header"}>
        <Container className={"logo-container"}>
          <h1 className="logo">AlbGas</h1>
        </Container>

        <Container className={"navigation"}>
          <Button
            className="nav-button"
            buttonText={"Home"}
            onClickFunction={renderHomePage}
          />
          <Button
            className="nav-button"
            buttonText={"Comparison"}
            onClickFunction={renderComparisonPage}
          />
          <Button
            className="nav-button"
            buttonText={"My Profile"}
            onClickFunction={renderProfilePage}
          />
          <Button
            className="nav-button"
            buttonText={"Log Out"}
            onClickFunction={logOut}
          />
        </Container>
      </Container>

      {dashboardPage === "home" && (
        <Home onAuthenticate={onAuthenticate} serverUrl={serverUrl} />
      )}
      {dashboardPage === "comparison" && <Container>Comparison</Container>}
      {dashboardPage === "profile" && <Container>Profile</Container>}

      <Container className={"dashboard-footer"}>
        <label>Developed by Faruq Ayomide</label>
      </Container>
    </div>
  );
}

Dashboard.propTypes = {
  onAuthenticate: PropTypes.func,
  serverUrl: PropTypes.string,
};
