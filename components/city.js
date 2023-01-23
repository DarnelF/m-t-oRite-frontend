import { useEffect, useState } from "react";
import styles from "../styles/city.module.css";

function City({ cityName }) {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/weather", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cityName: cityName }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setWeatherData(data.data);
          console.log(data);
        } else {
          setError(data.error);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [cityName]);

  return (
    <div>
      <main className={styles.cardContainer}>
        <span>{cityName}</span>
        {weatherData && <div>{/* afficher les données météo ici */}</div>}
        {error && <div>{error}</div>}
      </main>
    </div>
  );
}

export default City;
