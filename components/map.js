import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";

const Marker = () => (
  <div
    style={{
      backgroundColor: "red",
      width: "20px",
      height: "20px",
      borderRadius: "10px",
      position: "relative",
    }}
  />
);

const Map = ({ latitude, longitude }) => {
  const [googleAPI, setGoogleAPI] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/users/googleAPI")
      .then((res) => res.json())
      .then((data) => {
        setGoogleAPI(data.API);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ height: "400px", width: "100%" }}>
      {googleAPI ? (
        <GoogleMapReact
          bootstrapURLKeys={{ key: googleAPI }}
          defaultCenter={{ lat: latitude, lng: longitude }}
          defaultZoom={4}
        >
          <Marker lat={latitude} lng={longitude} />
        </GoogleMapReact>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Map;
