// imports----------------
import React, { useEffect, useRef, useState } from "react";

// material UI

import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

// leaflet
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";

// other packages
import axios from "axios";

// components
import LocationMarker from "../components/locationMarker";

// assets
import pin from "../assets/location-pin.png";
function Map() {

  // local states
  const [position, setPosition] = useState([51.505, -0.09]);
  const [locationDetails, setLocationDetails] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [showMultipleLocations, setShowMultipleLocations] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [savedLocations, setSavedLocations] = useState([]);
  const [connectLocations, setConnectLocations] = useState(false);

  // user ref
  const mapRef = useRef();

  const apiKey = "37b4cf9407c146caa22bf64efcc6ed65";

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
    let url;

    const [lat, lng] = searchText.split(",").map(parseFloat);
    if (!isNaN(lat) && !isNaN(lng)) {
      url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`;
    } else {
      url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
        searchText
      )}&apiKey=${apiKey}`;
    }

    try {
      const response = await axios.get(url);
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

  const handleSaveLocation = () => {
    const newLocation = {
      address,
      city,
      pincode,
      lat: position[0],
      lng: position[1],
    };

    setSavedLocations([...savedLocations, newLocation]);
    setAddress("");
    setCity("");
    setPincode("");
  };

  const mapContainer = () => {
    return (
      <MapContainer
        center={position}
        zoom={14}
        scrollWheelZoom={true}
        style={{ height: 660, width: "50%" }}
        whenCreated={(map) => (mapRef.current = map)}
      >
        <TileLayer
          url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${apiKey}`}
        />
        <LocationMarker
          connectLocations={connectLocations}
          savedLocations={savedLocations}
          mapRef={mapRef}
          position={position}
          locationDetails={locationDetails}
          customIcon={L.icon({
            iconUrl: pin,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
          })}
        />
      </MapContainer>
    );
  };

  const detailsContainer = () => {
    return (
      <Box
        sx={{
          width: "50%",
          backgroundColor: "#eee100",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <FormControlLabel
          control={
            <Switch
              checked={showMultipleLocations}
              onChange={(e) => setShowMultipleLocations(e.target.checked)}
              color="primary"
            />
          }
          label="Show Multiple Locations"
          sx={{ margin: 2 }}
        />
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
        {showMultipleLocations && (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
              <TextField
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                variant="outlined"
                sx={{ margin: 2 }}
              />
              <TextField
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                variant="outlined"
                sx={{ margin: 2 }}
              />
              <TextField
                label="Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                variant="outlined"
                sx={{ margin: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveLocation}
                sx={{ margin: 2 }}
              >
                Save Location
              </Button>
            </Box>

            <Box
              sx={{
                width: "50%",
                backgroundColor: "#eee",
                display: "flex",
                flexDirection: "column",
                padding: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <Typography variant="h6">Connect Locations</Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={connectLocations}
                      onChange={(e) => setConnectLocations(e.target.checked)}
                      color="primary"
                    />
                  }
                />
              </Box>
              {savedLocations.map((loc, index) => (
                <Box key={index} sx={{ marginBottom: 1 }}>
                  <Typography variant="subtitle1">{loc.address}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {loc.city}, {loc.pincode}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        height: 660,
        width: "96%",
        display: "flex",
        flexDirection: "row",
        padding: "2%",
      }}
    >
      {detailsContainer()}
      {mapContainer()}
    </Box>
  );
}

export default Map;
