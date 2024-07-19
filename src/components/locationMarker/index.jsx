import { Box, Button, Tooltip } from "@mui/material";
import L, { Marker } from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect } from "react";


// function LocationMarker({ connectLocations, savedLocations, mapRef, position, locationDetails, customIcon }) {
//   useEffect(() => {
//     if (connectLocations && savedLocations.length > 1 && mapRef.current) {
//       mapRef.current.eachLayer((layer) => {
//         if (layer instanceof L.Polyline || layer instanceof L.Marker) {
//           mapRef.current.removeLayer(layer);
//         }
//       });

//       const polylinePoints = savedLocations.map((loc) => [loc.lat, loc.lng]);
//       L.polyline(polylinePoints, { color: "red" }).addTo(mapRef.current);

//       savedLocations.forEach((loc, index) => {
//         L.marker([loc.lat, loc.lng], { icon: customIcon })
//           .addTo(mapRef.current)
//           .bindTooltip(`${loc.address}, ${loc.city}, ${loc.pincode}`)
//           .openTooltip();
//       });
//     }
//   }, [connectLocations, savedLocations, mapRef, customIcon]);
function LocationMarker({ connectLocations, savedLocations, mapRef, position, locationDetails, customIcon }) {
    useEffect(() => {
      if (connectLocations && savedLocations.length > 1 && mapRef.current) {
        console.log("Saved Locations:", savedLocations); // Check savedLocations array
        mapRef.current.eachLayer((layer) => {
          if (layer instanceof L.Polyline || layer instanceof L.Marker) {
            console.log("Removing Layer:", layer); // Check layers being removed
            mapRef.current.removeLayer(layer);
          }
        });
  
        const polylinePoints = savedLocations.map((loc) => [loc.lat, loc.lng]);
        console.log("Polyline Points:", polylinePoints); // Check polylinePoints array
        L.polyline(polylinePoints, { color: "red" }).addTo(mapRef.current);
  
        savedLocations.forEach((loc, index) => {
          L.marker([loc.lat, loc.lng], { icon: customIcon })
            .addTo(mapRef.current)
            .bindTooltip(`${loc.address}, ${loc.city}, ${loc.pincode}`)
            .openTooltip();
        });
      }
    }, [connectLocations, savedLocations, mapRef, customIcon]);
  
  return position === null ? null : (
    <Box
      sx={{
        position: "absolute",
        top: 5,
        zIndex: 1000,
        display: "flex",
        flexDirection: "row",
        right: 10,
      }}
    >
      <Button
        sx={{
          color: "#fff",
          backgroundColor: "#0F67B1",
          padding: 2,
        }}
        onClick={() => mapRef.current.locate()}
      >
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
    </Box>
  );
}

export default LocationMarker;
