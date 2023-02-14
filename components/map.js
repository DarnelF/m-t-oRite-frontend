import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import style from "../styles/map.module.css";

// Marker component to display a marker on the map
const Marker = () => <div className={style.magicmarker} />;

// Map component to display a Google Map with a marker at the provided latitude and longitude
const Map = ({ latitude, longitude }) => {
  // State to store the Google API key
  const [googleAPI, setGoogleAPI] = useState("");

  // Use Effect hook to fetch the API key from the server on component mount
  useEffect(() => {
    fetch("http://localhost:3000/users/googleAPI")
      .then((res) => res.json())
      .then((data) => {
        // Set the API key in the state
        setGoogleAPI(data.API);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ height: "400px", width: "100%" }}>
      {/* Check if the API key has been fetched and render the Google Map */}
      {googleAPI ? (
        <GoogleMapReact
          bootstrapURLKeys={{ key: googleAPI }}
          defaultCenter={{ lat: latitude, lng: longitude }}
          defaultZoom={4}
        >
          {/* Render the marker at the provided latitude and longitude */}
          <Marker lat={latitude} lng={longitude} />
        </GoogleMapReact>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Map;
