import { useState, useEffect } from "react";
import axios from "axios";

// importing custom components
import Auth from "./pages/Auth/Auth";
import Dashboard from "./pages/Dashboard/Dashboard";

// url
let url;
url = "http://localhost:3000";
// url = "https://albgas-backend.onrender.com";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function getProductionDetails() {
      try {
        // fetch data from the server
        const response = await axios.get(`${url}/admin/auth`, {
          headers: {
            Authorization: `Bearer:${localStorage.getItem("albGasToken")}`,
          },
        });
        if (response.data.statusCode === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
      }
    }
    getProductionDetails();
  }, []);
  return (
    <div className="App">
      {isAuthenticated ? (
        <Dashboard onAuthenticate={setIsAuthenticated} serverUrl={url} />
      ) : (
        <Auth onAuthenticate={setIsAuthenticated} serverUrl={url} />
      )}
    </div>
  );
}
