import styles from "../styles/Home.module.css";
import City from "./city";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCityToStore } from "../reducers/cities";

function Home() {
  const cities = useSelector((state) => state.cities.value);
  const dispatch = useDispatch();
  const [newCity, setNewCity] = useState("");

  const addCity = async () => {
    try {
      const response = await fetch("http://localhost:3000/weather", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cityName: newCity }),
      });
      const data = await response.json();
      if (data.result) {
        dispatch(addCityToStore(data.weather));
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        <div className={styles.container}>
          {cities.map((city, i) => {
            return (
              <City
                key={i}
                cityName={city.cityName}
                description={city.description}
                main={city.main}
                tempsMin={city.tempsMin}
                tempsMax={city.tempsMax}
                lat={city.lat}
                lon={city.lon}
              ></City>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default Home;
