import styles from "../styles/Home.module.css";
import City from "./city";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [cities, setCities] = useState([
    { cityName: "London" },
    { cityName: "Paris" },
  ]);

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.Navbar}>
          <span className={styles.logo}>Météo RITE</span>
          <div className={styles.searchInputContainer}>
            <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
            <input className={styles.searchInput}></input>
          </div>
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div className={styles.container}>
          <City></City>
        </div>
      </main>
    </div>
  );
}

export default Home;
