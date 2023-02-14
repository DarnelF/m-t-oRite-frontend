import React from "react";
import styles from "../styles/Home.module.css";
import City from "./city";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCityToStore } from "../reducers/cities";
import Modal from "react-modal";

// Home component
function Home() {
  // Get the cities from the Redux store
  const cities = useSelector((state) => state.cities.value);
  // State for storing the weather data of each city
  const [citiesData, setCitiesData] = useState([]);
  // Get the dispatch function from the Redux store
  const dispatch = useDispatch();
  // State for storing the new city name
  const [newCity, setNewCity] = useState("");
  // State for displaying the modal
  const [displayModal, setDisplayModal] = useState(false);
  // State for the modal text
  const [modalText, setModalText] = useState("");

  // Function to add a city to the citiesData state and the Redux store
  const addCity = async () => {
    try {
      // Send a POST request to the server to retrieve the weather data of the new city
      const response = await fetch("http://localhost:3000/weather", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cityName: newCity }),
      });
      const data = await response.json();
      // If the server returns a result, add the city to the citiesData state and the Redux store
      if (data.result) {
        dispatch(addCityToStore(data.weather.cityName));
        setCitiesData([...citiesData, data.weather]);
        console.log(cities, citiesData, data);
      } else {
        setModalText(data.error);
        setDisplayModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Effect hook to fetch the weather data of each city when the cities or newCity state changes
  useEffect(() => {
    async function fetchData() {
      // Send a POST request to the server for each city to retrieve its weather data
      const promises = cities.map(async (city) => {
        const response = await fetch("http://localhost:3000/weather", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cityName: city }),
        });
        const data = await response.json();
        return data.weather;
      });
      // Wait for all the responses to arrive and store the weather data in the citiesData state
      const data = await Promise.all(promises);
      setCitiesData(data);
    }
    fetchData();
  }, [cities, newCity]);

  // Render the Home component
  return (
    <div>
      <main className={styles.main}>
        <div className={styles.Navbar}>
          <span className={styles.logo}>Météo RITE</span>
          <div className={styles.searchInputContainer}>
            <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
            <input
              className={styles.searchInput}
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
            ></input>
            <button className={styles.submitButton} onClick={addCity}>
              Add City
            </button>
          </div>
          <FontAwesomeIcon icon={faUser} />
        </div>
        {/* Show a modal to indicate that the entered city does not exist in our data */}
        {modalText ? (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <p>{modalText}</p>
              <button
                className={styles.modalCloseButton}
                onClick={() => setModalText("")}
              >
                Close
              </button>
            </div>
          </div>
        ) : null}
        {citiesData.length > 0 ? (
          <div className={styles.container}>
            {citiesData.map((city, i) => (
              <City
                key={i}
                cityName={city.cityName}
                description={city.description}
                main={city.main}
                tempsMin={city.tempsMin}
                tempsMax={city.tempsMax}
                lat={city.lat}
                lon={city.lon}
              />
            ))}
          </div>
        ) : null}
      </main>
    </div>
  );
}

export default Home;
