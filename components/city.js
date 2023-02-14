import { useEffect, useState } from "react";
import styles from "../styles/city.module.css";
import Map from "./map";
import { useDispatch, useSelector } from "react-redux";
import { removeCityFromStore } from "../reducers/cities";

// City component displays weather information for a specific city.
function City({ cityName, description, main, tempsMin, tempsMax, lat, lon }) {
  // Converts kelvin temperature to celsius
  function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
  }

  // Get the cities from the store
  const cities = useSelector((state) => state.cities.value);
  // Get the dispatch function to remove a city from the store
  const dispatch = useDispatch();

  // Handles deletion of a city
  function onDelete() {
    dispatch(removeCityFromStore(cityName));
  }

  return (
    <div>
      {/* Only render if cityName exists */}
      {cityName ? (
        <main className={styles.cardContainer}>
          <span className={styles.name}>
            {cityName ? cityName : "Valeur non définie"}
          </span>
          {/* Render the map component */}
          <Map latitude={lat} longitude={lon}></Map>
          <img
            className={styles.icon}
            src={`${main}.png`}
            alt={`${main} icon`}
          />
          <div className={styles.description}>{description}</div>
          <div className={styles.tempContainer}>
            {/* Display the minimum temperature with styling based on the temperature */}
            <span
              className={`${styles.temp} ${
                kelvinToCelsius(tempsMin) < 15
                  ? styles.cold
                  : kelvinToCelsius(tempsMin) > 25
                  ? styles.hot
                  : styles.warm
              }`}
            >
              {kelvinToCelsius(tempsMin).toFixed(0)}°C
            </span>
            {/* Display the maximum temperature with styling based on the temperature */}
            <span
              className={`${styles.temp} ${
                kelvinToCelsius(tempsMax) < 15
                  ? styles.cold
                  : kelvinToCelsius(tempsMax) > 25
                  ? styles.hot
                  : styles.warm
              }`}
            >
              {kelvinToCelsius(tempsMax).toFixed(0)}°C
            </span>
          </div>
          {/* Delete button for a city */}
          <button className={styles.deletebtn} onClick={onDelete}>
            X
          </button>
        </main>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default City;
