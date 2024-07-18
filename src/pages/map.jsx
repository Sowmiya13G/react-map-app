import React, { useState, useEffect, useRef } from "react";
import { Box, Button, TextField } from "@mui/material";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMapEvents,
} from "react-leaflet";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import pin from "../assets/location-pin.png";

function Map() {
  const samplePosition = [51.505, -0.09];
  const apiKey = "37b4cf9407c146caa22bf64efcc6ed65";
  const [position, setPosition] = useState(samplePosition);
  console.log("🚀 ~ Map ~ position:", JSON.stringify(position))
  const [locationDetails, setLocationDetails] = useState(null);
  const [searchText, setSearchText] = useState("");
  const mapRef = useRef();

  const customIcon = L.icon({
    iconUrl: pin,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  useEffect(() => {
    fetchLocationDetails(position[0], position[1]);
  }, [position]);

  const fetchLocationDetails = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`
      );
      if (response.data && response.data.features.length > 0) {
        setLocationDetails(response.data.features[0].properties);
      } else {
        setLocationDetails(null);
      }
    } catch (error) {
      console.error("Error fetching location details:", error);
      setLocationDetails(null);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${searchText}&apiKey=${apiKey}`
      );
      if (response.data && response.data.features.length > 0) {
        const { lat, lon } = response.data.features[0].properties;
        setPosition([lat, lon]);
        mapRef.current.flyTo([lat, lon], mapRef.current.getZoom());
      } else {
        console.log("Location not found");
      }
    } catch (error) {
      console.error("Error searching location:", error);
    }
  };

  function LocationMarker() {
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : (
      <>
        <Button
          sx={{
            position: "absolute",
            top: 1,
            right: 2,
            zIndex: 1000,
            color: "black",
            padding: 1,
            backgroundColor: "#eee120",
          }}
        >
          <MyLocationIcon sx={{ mx: 1 }} position={position} />{" "}
          {"current location"}
        </Button>
        <Marker position={position} icon={customIcon}>
          <Tooltip direction="top" offset={[0, -40]}>
            {locationDetails ? (
              <>
                <div>{locationDetails.formatted}</div>
                <div>{locationDetails.city}</div>
                <div>{locationDetails.country}</div>
              </>
            ) : (
              "Loading..."
            )}
          </Tooltip>
        </Marker>
      </>
    );
  }

  return (
    <Box
      sx={{
        height: 550,
        width: 750,
        backgroundColor: "#eee",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TextField
        label="Search location"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        variant="outlined"
        sx={{ margin: 2 }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <MapContainer
        center={position || samplePosition}
        zoom={14}
        scrollWheelZoom={true}
        style={{ height: 800, width: 800 }}
        ref={mapRef}
      >
        <TileLayer
          url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${apiKey}`}
        />
        <LocationMarker />
      </MapContainer>
    </Box>
  );
}

export default Map;
