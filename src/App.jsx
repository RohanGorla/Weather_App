import { useState, useEffect } from "react";
import { Country, City } from "country-state-city";
import "./App.css";

function App() {
  const [show, setShow] = useState(true);
  const [list, setList] = useState(true);
  const [search, setSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [suggestionArray, setSuggestionArray] = useState([]);
  const [city, setCity] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [country, setCountry] = useState("");
  const [Data, setData] = useState();
  const [forecast, setForecast] = useState([]);

  const countries = Country.getAllCountries();
  const cities = City.getAllCities();
  const API_KEY = import.meta.env.VITE_API_KEY;

  let url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city} ${countryCode}$day=1`;

  let today = new Date();

  let updateTime =
    today.getHours() > 12
      ? `${String(today.getHours() - 12).padStart(2, "0")}:${String(
          today.getMinutes()
        ).padStart(2, "0")} PM`
      : `${String(today.getHours()).padStart(2, "0")}:${String(
          today.getMinutes()
        ).padStart(2, "0")} AM`;

  async function fetchWeather(url) {
    let response = await fetch(url);
    let data = await response.json();
    setData(data);
    setForecast(data.forecast.forecastday[0].hour);
  }

  useEffect(() => {
    if (city) {
      fetchWeather(url);
    }
  }, [citySearch]);

  useEffect(() => {
    if (search) {
      let suggest_arr = [];
      countries.forEach((item) => {
        if (item.name.toLowerCase().includes(search.toLowerCase())) {
          suggest_arr.push(item);
        }
      });
      setSuggestionArray(suggest_arr);
    } else {
      setSuggestionArray([]);
    }
  }, [search]);

  useEffect(() => {
    if (citySearch) {
      let suggest_arr = [];
      cities.forEach((item) => {
        if (countryCode == item.countryCode) {
          if (item.name.toLowerCase().includes(citySearch.toLowerCase())) {
            suggest_arr.push(item);
          }
        }
      });
      setSuggestionArray(suggest_arr);
    } else {
      setSuggestionArray([]);
    }
  }, [citySearch]);

  return (
    <>
      <div className="container">
        <div className="main">
          <div className="main-box">
            <div
              className="loading-page"
              style={Data ? { display: "none" } : null}
            >
              <h3>Select city and location to display weather data.</h3>
            </div>
            <nav style={Data ? null : { visibility: "hidden" }}>
              <div className="navbar">
                <div className="loc-details">
                  <h1 className="location">
                    {Data ? Data.location.name : "Location"}
                  </h1>
                  <p className="last-updated">last updated: {updateTime}</p>
                </div>
                <div
                  className="search-btn"
                  onClick={() => {
                    setShow(!show);
                  }}
                >
                  <img src="https://w7.pngwing.com/pngs/851/233/png-transparent-computer-icons-search-box-button-search-button-text-internet-interface-thumbnail.png"></img>
                </div>
              </div>
            </nav>
            <section
              className="main-details"
              style={Data ? null : { visibility: "hidden" }}
            >
              <div className="temperature">
                <div className="current">
                  <h2 className="current-temp">
                    {Data ? Data.current.temp_c : ""}
                    <span className="span-temp-unit">°C</span>
                  </h2>
                  {/* <p className="current-temp-units">°C</p> */}
                </div>
                <div className="feelslike">
                  <h3 className="feels-like-temp">
                    feels like: {Data ? Data.current.feelslike_c : ""}
                    <span className="span-feels-unit">°C</span>
                  </h3>
                  {/* <p className="feelslike-temp-units">°C</p> */}
                </div>
              </div>
              <div className="condition">
                <div className="icon-div">
                  <img src={Data ? Data.current.condition.icon : ""}></img>
                </div>
                <h4 className="condition-type">
                  {Data ? Data.current.condition.text : ""}
                </h4>
              </div>
            </section>
            <section
              className="main-forecast"
              style={Data ? null : { visibility: "hidden" }}
            >
              <h3 className="forecast-day">Hourly forecast</h3>
              <div className="forecast">
                {forecast
                  ? forecast.map((hour, index) => {
                      return (
                        <div key={index} className="hour-card">
                          <p>{hour.time.split(" ")[1]}</p>
                          <div style={{ height: "40px", width: "40px" }}>
                            <img
                              src={hour.condition.icon}
                              style={{ height: "100%" }}
                            ></img>
                          </div>
                          <p>{hour.temp_c}°C</p>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </section>
          </div>
        </div>
        <div className="sidebar">
          <section className={show ? "search-box" : "search-box not-visible"}>
            <div className="input-box">
              <div className="country-input">
                <input
                  type="text"
                  value={country ? country : search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  onClick={() => {
                    setCountry("");
                    setCity("");
                    setList(false);
                  }}
                  placeholder="Select country..."
                ></input>
              </div>
              <div className="city-input">
                <input
                  type="text"
                  value={city ? city : citySearch}
                  onChange={(e) => {
                    setCitySearch(e.target.value);
                  }}
                  onClick={() => {
                    setCity("");
                    setList(true);
                  }}
                  placeholder="Select city..."
                ></input>
              </div>
            </div>
            <div className="name-suggestions">
              <div
                style={list ? { display: "none" } : null}
                className="country-name-list"
              >
                {suggestionArray.map((country, index) => {
                  return (
                    <div
                      className="country-list"
                      key={index}
                      onClick={() => {
                        setSuggestionArray([]);
                        setCountryCode(country.isoCode);
                        setSearch("");
                        setCountry(country.name);
                      }}
                    >
                      <p className="country-list-item">{country.name}</p>
                    </div>
                  );
                })}
              </div>
              <div
                style={list ? null : { display: "none" }}
                className="city-name-list"
              >
                {suggestionArray.map((city, index) => {
                  return (
                    <div
                      className="city-list"
                      key={index}
                      onClick={() => {
                        setSuggestionArray([]);
                        setCity(city.name);
                        setShow(!show);
                        setSearch("");
                        setCitySearch("");
                      }}
                    >
                      <p className="city-list-item">{city.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          <section
            className="details-box"
            style={Data ? null : { display: "none" }}
          >
            <div className="details">
              <div className="detail-card humidity">
                <p className="detail-name">Humidity</p>
                <p className="detail-info">
                  {Data ? Data.current.humidity : ""}%
                </p>
              </div>
              <div className="detail-card pressure">
                <p className="detail-name">Pressure</p>
                <p className="detail-info">
                  {Data ? Data.current.pressure_mb : ""} bar
                </p>
              </div>
              <div className="detail-card visibility">
                <p className="detail-name">Visibility</p>
                <p className="detail-info">
                  {Data ? Data.current.vis_km : ""} Km
                </p>
              </div>
            </div>
            <div className="details">
              <div className="detail-card precipitation">
                <p className="detail-name">Precipitation</p>
                <p className="detail-info">
                  {Data ? Data.current.precip_mm : ""} mm
                </p>
              </div>
              <div className="detail-card dewpoint">
                <p className="detail-name">Dew point</p>
                <p className="detail-info">
                  {Data ? Data.current.dewpoint_c : ""}°C
                </p>
              </div>
              <div className="detail-card wind">
                <p className="detail-name">
                  {Data ? Data.current.wind_dir : ""} wind
                </p>
                <p className="detail-info">
                  {Data ? Data.current.wind_kph : ""} kmph
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default App;
