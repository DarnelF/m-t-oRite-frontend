import { useEffect, useState } from "react";
import styles from "../styles/city.module.css";
import { GoogleMap, Marker } from "react-google-maps";
import Map from "./map";

function City({ cityName, description, main, tempsMin, tempsMax, lat, lon }) {
  function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
  }

  useEffect(() => {
    console.log("local :", lat, lon);
  }, []);

  return (
    <div>
      <main className={styles.cardContainer}>
        <span>{cityName}</span>
        <Map latitude={lat} longitude={lon}></Map>
        <img src={`${main}.png`} alt={`${main} icon`} />
        <div className={styles.description}>{description}</div>
        <div className={styles.tempContainer}>
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
      </main>
    </div>
  );
}

export default City;
