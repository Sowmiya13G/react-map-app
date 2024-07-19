// import React, { useState, useEffect, useRef } from "react";
// import { Box, Button, TextField } from "@mui/material";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import axios from "axios";
// import {
//   MapContainer,
//   Marker,
//   Popup,
//   TileLayer,
//   Tooltip,
//   useMapEvents,
// } from "react-leaflet";
// import MyLocationIcon from "@mui/icons-material/MyLocation";
// import pin from "../assets/location-pin.png";

// function Map() {
//   const samplePosition = [51.505, -0.09];
//   const apiKey = "37b4cf9407c146caa22bf64efcc6ed65";
//   const [position, setPosition] = useState(samplePosition);
//   console.log("🚀 ~ Map ~ position:", JSON.stringify(position));
//   const [locationDetails, setLocationDetails] = useState(null);
//   const [searchText, setSearchText] = useState("");
//   const mapRef = useRef();

//   const customIcon = L.icon({
//     iconUrl: pin,
//     iconSize: [40, 40],
//     iconAnchor: [20, 40],
//     popupAnchor: [0, -40],
//   });

//   useEffect(() => {
//     fetchLocationDetails(position[0], position[1]);
//   }, [position]);

//   const fetchLocationDetails = async (lat, lng) => {
//     try {
//       const response = await axios.get(
//         `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`
//       );
//       if (response.data && response.data.features.length > 0) {
//         setLocationDetails(response.data.features[0].properties);
//       } else {
//         setLocationDetails(null);
//       }
//     } catch (error) {
//       console.error("Error fetching location details:", error);
//       setLocationDetails(null);
//     }
//   };

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(
//         `https://api.geoapify.com/v1/geocode/search?text=${searchText}&apiKey=${apiKey}`
//       );
//       if (response.data && response.data.features.length > 0) {
//         const { lat, lon } = response.data.features[0].properties;
//         setPosition([lat, lon]);
//         mapRef.current.flyTo([lat, lon], mapRef.current.getZoom());
//       } else {
//         console.log("Location not found");
//       }
//     } catch (error) {
//       console.error("Error searching location:", error);
//     }
//   };

//   function LocationMarker() {
//     const map = useMapEvents({
//       click() {
//         map.locate();
//       },
//       locationfound(e) {
//         setPosition([e.latlng.lat, e.latlng.lng]);
//         map.flyTo(e.latlng, map.getZoom());
//       },
//     });

//     return position === null ? null : (
//       <Box
//         sx={{
//           position: "absolute",
//           top: 5,
//           zIndex: 1000,
//           display: "flex",
//           flexDirection: "row",
//           right: 10,
//         }}
//       >
//         <Button
//           sx={{
//             color: "#fff",
//             backgroundColor: "#0F67B1",
//             padding: 2,
//           }}
//         >
//           <MyLocationIcon sx={{ mx: 1 }} position={position} />{" "}
//           {"current location"}
//         </Button>
//         <Marker position={position} icon={customIcon}>
//           <Tooltip direction="top" offset={[0, -40]}>
//             {locationDetails ? (
//               <>
//                 <div>{locationDetails.formatted}</div>
//                 <div>{locationDetails.city}</div>
//                 <div>{locationDetails.country}</div>
//               </>
//             ) : (
//               "Loading..."
//             )}
//           </Tooltip>
//         </Marker>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         height: 660,
//         width: "96%",
//         display: "flex",
//         flexDirection: "row",
//         padding: "2%",
//       }}
//     >
//       <Box
//         sx={{
//           width: "50%",
//           backgroundColor: "#eee100",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <TextField
//           label="Search location"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           variant="outlined"
//           sx={{ margin: 2 }}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               handleSearch();
//             }
//           }}
//         />
//       </Box>
//       <Box
//         sx={{
//           width: "50%",
//           backgroundColor: "#eee",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <MapContainer
//           center={position || samplePosition}
//           zoom={14}
//           scrollWheelZoom={true}
//           style={{ height: "100%", width: "100%" }}
//           ref={mapRef}
//         >
//           <TileLayer
//             url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${apiKey}`}
//           />
//           <LocationMarker />
//         </MapContainer>
//       </Box>
//     </Box>
//   );
// }

// export default Map;


// import React, { useState, useEffect, useRef } from "react";
// import { Box, Button, TextField , Switch, FormControlLabel} from "@mui/material";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import axios from "axios";
// import {
//   MapContainer,
//   Marker,
//   Popup,
//   TileLayer,
//   Tooltip,
//   useMapEvents,
// } from "react-leaflet";
// import MyLocationIcon from "@mui/icons-material/MyLocation";
// import pin from "../assets/location-pin.png";

// function Map() {
//   const samplePosition = [51.505, -0.09];
//   const apiKey = "37b4cf9407c146caa22bf64efcc6ed65";
//   const [position, setPosition] = useState(samplePosition);

//   const [locationDetails, setLocationDetails] = useState(null);
//   const [searchText, setSearchText] = useState("");
//   const [showMultipleLocations, setShowMultipleLocations] = useState(false);
//   const mapRef = useRef();

//   const customIcon = L.icon({
//     iconUrl: pin,
//     iconSize: [40, 40],
//     iconAnchor: [20, 40],
//     popupAnchor: [0, -40],
//   });

//   useEffect(() => {
//     fetchLocationDetails(position[0], position[1]);
//   }, [position]);

//   const fetchLocationDetails = async (lat, lng) => {
//     try {
//       const response = await axios.get(
//         `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`
//       );
//       if (response.data && response.data.features.length > 0) {
//         setLocationDetails(response.data.features[0].properties);
//       } else {
//         setLocationDetails(null);
//       }
//     } catch (error) {
//       console.error("Error fetching location details:", error);
//       setLocationDetails(null);
//     }
//   };

//   const handleSearch = async () => {
//     let url;
    
//     const [lat, lng] = searchText.split(",").map(parseFloat);
//     if (!isNaN(lat) && !isNaN(lng)) {
//       url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`;
//     } else {
//       url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
//         searchText
//       )}&apiKey=${apiKey}`;
//     }
  
//     try {
//       const response = await axios.get(url);
//       if (response.data && response.data.features.length > 0) {
//         const { lat, lon } = response.data.features[0].properties;
//         setPosition([lat, lon]);
//         mapRef.current.flyTo([lat, lon], mapRef.current.getZoom());
//       } else {
//         console.log("Location not found");
//       }
//     } catch (error) {
//       console.error("Error searching location:", error);
//     }
//   };
  

//   function LocationMarker() {
//     const map = useMapEvents({
//       click() {
//         map.locate();
//       },
//       locationfound(e) {
//         setPosition([e.latlng.lat, e.latlng.lng]);
//         map.flyTo(e.latlng, map.getZoom());
//       },
//     });

//     return position === null ? null : (
//       <Box
//         sx={{
//           position: "absolute",
//           top: 5,
//           zIndex: 1000,
//           display: "flex",
//           flexDirection: "row",
//           right: 10,
//         }}
//       >
//         <Button
//           sx={{
//             color: "#fff",
//             backgroundColor: "#0F67B1",
//             padding: 2,
//           }}
//           onClick={() => map.locate()}
//         >
//           <MyLocationIcon sx={{ mx: 1 }} position={position} />{" "}
//           {"current location"}
//         </Button>
//         <Marker position={position} icon={customIcon}>
//           <Tooltip direction="top" offset={[0, -40]}>
//             {locationDetails ? (
//               <>
//                 <div>{locationDetails.formatted}</div>
//                 <div>{locationDetails.city}</div>
//                 <div>{locationDetails.country}</div>
//               </>
//             ) : (
//               "Loading..."
//             )}
//           </Tooltip>
//         </Marker>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         height: 660,
//         width: "96%",
//         display: "flex",
//         flexDirection: "row",
//         padding: "2%",
//       }}
//     >
//       <Box
//         sx={{
//           width: "50%",
//           backgroundColor: "#eee100",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//               <FormControlLabel
//           control={
//             <Switch
//               checked={showMultipleLocations}
//               onChange={(e) => setShowMultipleLocations(e.target.checked)}
//               color="primary"
//             />
//           }
//           label="Show Multiple Locations"
//           sx={{ margin: 2 }}
//         />
//         <TextField
//           label="Search location"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           variant="outlined"
//           sx={{ margin: 2 }}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               handleSearch();
//             }
//           }}
//         />
//       </Box>
//       <Box
//         sx={{
//           width: "50%",
//           backgroundColor: "#eee",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <MapContainer
//           center={position || samplePosition}
//           zoom={14}
//           scrollWheelZoom={true}
//           style={{ height: "100%", width: "100%" }}
//           ref={mapRef}
//         >
//           <TileLayer
//             url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${apiKey}`}
//           />
//           <LocationMarker />
//         </MapContainer>
//       </Box>
//     </Box>
//   );
// }

// export default Map;














import React, { useState, useEffect, useRef } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Switch,
//   FormControlLabel,
//   Typography,
// } from "@mui/material";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import axios from "axios";
// import {
//   MapContainer,
//   Marker,
//   TileLayer,
//   Tooltip,
//   useMapEvents,
// } from "react-leaflet";
// import MyLocationIcon from "@mui/icons-material/MyLocation";
// import pin from "../assets/location-pin.png";

// function Map() {
//   const samplePosition = [51.505, -0.09];
//   const apiKey = "37b4cf9407c146caa22bf64efcc6ed65";
//   const [position, setPosition] = useState(samplePosition);

//   const [locationDetails, setLocationDetails] = useState(null);
//   const [searchText, setSearchText] = useState("");
//   const [showMultipleLocations, setShowMultipleLocations] = useState(false);
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [savedLocations, setSavedLocations] = useState([]);
//   const mapRef = useRef();

//   const customIcon = L.icon({
//     iconUrl: pin,
//     iconSize: [40, 40],
//     iconAnchor: [20, 40],
//     popupAnchor: [0, -40],
//   });

//   useEffect(() => {
//     fetchLocationDetails(position[0], position[1]);
//   }, [position]);

//   const fetchLocationDetails = async (lat, lng) => {
//     try {
//       const response = await axios.get(
//         `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`
//       );
//       if (response.data && response.data.features.length > 0) {
//         setLocationDetails(response.data.features[0].properties);
//       } else {
//         setLocationDetails(null);
//       }
//     } catch (error) {
//       console.error("Error fetching location details:", error);
//       setLocationDetails(null);
//     }
//   };

//   const handleSearch = async () => {
//     let url;

//     const [lat, lng] = searchText.split(",").map(parseFloat);
//     if (!isNaN(lat) && !isNaN(lng)) {
//       url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`;
//     } else {
//       url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
//         searchText
//       )}&apiKey=${apiKey}`;
//     }

//     try {
//       const response = await axios.get(url);
//       if (response.data && response.data.features.length > 0) {
//         const { lat, lon } = response.data.features[0].properties;
//         setPosition([lat, lon]);
//         mapRef.current.flyTo([lat, lon], mapRef.current.getZoom());
//       } else {
//         console.log("Location not found");
//       }
//     } catch (error) {
//       console.error("Error searching location:", error);
//     }
//   };

//   const handleSaveLocation = () => {
//     const newLocation = {
//       address,
//       city,
//       pincode,
//     };

//     setSavedLocations([...savedLocations, newLocation]);
//     setAddress("");
//     setCity("");
//     setPincode("");
//   };

//   function LocationMarker() {
//     const map = useMapEvents({
//       click() {
//         map.locate();
//       },
//       locationfound(e) {
//         setPosition([e.latlng.lat, e.latlng.lng]);
//         map.flyTo(e.latlng, map.getZoom());
//       },
//     });
  
//     useEffect(() => {
//       if (showMultipleLocations) {
//         // Clear existing markers
//         mapRef.current.eachLayer((layer) => {
//           if (layer instanceof L.Marker) {
//             mapRef.current.removeLayer(layer);
//           }
//         });
  
//         // Add markers for saved locations
//         savedLocations.forEach((loc) => {
//           if (loc.lat && loc.lng) { // Check if lat and lng are defined
//             const marker = L.marker([loc.lat, loc.lng], { icon: customIcon }).addTo(
//               mapRef.current
//             );
//             marker.bindTooltip(
//               `<b>${loc.address}</b><br>${loc.city}, ${loc.pincode}`
//             );
//           }
//         });
//       }
//     }, [showMultipleLocations, savedLocations]);

//     return position === null ? null : (
//       <Box
//         sx={{
//           position: "absolute",
//           top: 5,
//           zIndex: 1000,
//           display: "flex",
//           flexDirection: "row",
//           right: 10,
//         }}
//       >
//         <Button
//           sx={{
//             color: "#fff",
//             backgroundColor: "#0F67B1",
//             padding: 2,
//           }}
//           onClick={() => map.locate()}
//         >
//           <MyLocationIcon sx={{ mx: 1 }} position={position} />{" "}
//           {"current location"}
//         </Button>
//         <Marker position={position} icon={customIcon}>
//           <Tooltip direction="top" offset={[0, -40]}>
//             {locationDetails ? (
//               <>
//                 <div>{locationDetails.formatted}</div>
//                 <div>{locationDetails.city}</div>
//                 <div>{locationDetails.country}</div>
//               </>
//             ) : (
//               "Loading..."
//             )}
//           </Tooltip>
//         </Marker>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         height: 660,
//         width: "96%",
//         display: "flex",
//         flexDirection: "row",
//         padding: "2%",
//       }}
//     >
//       <Box
//         sx={{
//           width: "50%",
//           backgroundColor: "#eee100",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <FormControlLabel
//           control={
//             <Switch
//               checked={showMultipleLocations}
//               onChange={(e) => setShowMultipleLocations(e.target.checked)}
//               color="primary"
//             />
//           }
//           label="Show Multiple Locations"
//           sx={{ margin: 2 }}
//         />

//         <TextField
//           label="Search location"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           variant="outlined"
//           sx={{ margin: 2 }}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               handleSearch();
//             }
//           }}
//         />
//         {showMultipleLocations && (
//           <Box sx={{ display: "flex", flexDirection: "row" }}>
//             <Box sx={{ display: "flex", flexDirection: "column" , width:"50%"}}>
//               <TextField
//                 label="Address"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 variant="outlined"
//                 sx={{ margin: 2 }}
//               />
//               <TextField
//                 label="City"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//                 variant="outlined"
//                 sx={{ margin: 2 }}
//               />
//               <TextField
//                 label="Pincode"
//                 value={pincode}
//                 onChange={(e) => setPincode(e.target.value)}
//                 variant="outlined"
//                 sx={{ margin: 2 }}
//               />
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleSaveLocation}
//                 sx={{ margin: 2 }}
//               >
//                 Save Location
//               </Button>
//             </Box>

//             <Box
//               sx={{
//                 width: "50%",
//                 backgroundColor: "#eee",
//                 display: "flex",
//                 flexDirection: "column",
//                 padding: 2,
//               }}
//             >
//               <Typography variant="h6" sx={{ marginBottom: 2 }}>
//                 Saved Locations
//               </Typography>
//               {savedLocations.map((loc, index) => (
//                 <Box key={index} sx={{ marginBottom: 1 }}>
//                   <Typography variant="subtitle1">{loc.address}</Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     {loc.city}, {loc.pincode}
//                   </Typography>
//                 </Box>
//               ))}
//             </Box>
//           </Box>
//         )}
//       </Box>

//       <MapContainer
//         center={position || samplePosition}
//         zoom={14}
//         scrollWheelZoom={true}
//         style={{ height: 660, width: "50%" }}
//         ref={mapRef}
//       >
//         <TileLayer
//           url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${apiKey}`}
//         />
//         <LocationMarker />
//       </MapContainer>
//     </Box>
//   );
// }

// export default Map;


import React, { useState, useEffect, useRef } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Switch,
//   FormControlLabel,
//   Typography,
// } from "@mui/material";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import axios from "axios";
// import {
//   MapContainer,
//   Marker,
//   TileLayer,
//   Tooltip,
//   useMapEvents,
// } from "react-leaflet";
// import MyLocationIcon from "@mui/icons-material/MyLocation";
// import pin from "../assets/location-pin.png";

// function Map() {
//   const samplePosition = [51.505, -0.09];
//   const apiKey = "37b4cf9407c146caa22bf64efcc6ed65";
//   const [position, setPosition] = useState(samplePosition);
//   const [locationDetails, setLocationDetails] = useState(null);
//   const [searchText, setSearchText] = useState("");
//   const [showMultipleLocations, setShowMultipleLocations] = useState(false);
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [savedLocations, setSavedLocations] = useState([]);
//   const [connectLocations, setConnectLocations] = useState(false); 
//   const mapRef = useRef();

//   const customIcon = L.icon({
//     iconUrl: pin,
//     iconSize: [40, 40],
//     iconAnchor: [20, 40],
//     popupAnchor: [0, -40],
//   });

//   useEffect(() => {
//     fetchLocationDetails(position[0], position[1]);
//   }, [position]);

//   const fetchLocationDetails = async (lat, lng) => {
//     try {
//       const response = await axios.get(
//         `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`
//       );
//       if (response.data && response.data.features.length > 0) {
//         setLocationDetails(response.data.features[0].properties);
//       } else {
//         setLocationDetails(null);
//       }
//     } catch (error) {
//       console.error("Error fetching location details:", error);
//       setLocationDetails(null);
//     }
//   };

//   const handleSearch = async () => {
//     let url;

//     const [lat, lng] = searchText.split(",").map(parseFloat);
//     if (!isNaN(lat) && !isNaN(lng)) {
//       url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`;
//     } else {
//       url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
//         searchText
//       )}&apiKey=${apiKey}`;
//     }

//     try {
//       const response = await axios.get(url);
//       if (response.data && response.data.features.length > 0) {
//         const { lat, lon } = response.data.features[0].properties;
//         setPosition([lat, lon]);
//         mapRef.current.flyTo([lat, lon], mapRef.current.getZoom());
//       } else {
//         console.log("Location not found");
//       }
//     } catch (error) {
//       console.error("Error searching location:", error);
//     }
//   };

//   const handleSaveLocation = () => {
//     const newLocation = {
//       address,
//       city,
//       pincode,
//       lat: position[0],
//       lng: position[1],
//     };

//     setSavedLocations([...savedLocations, newLocation]);
//     setAddress("");
//     setCity("");
//     setPincode("");
//   };

//   function LocationMarker({ connectLocations }) {
//     const map = useMapEvents({
//       click() {
//         map.locate();
//       },
//       locationfound(e) {
//         setPosition([e.latlng.lat, e.latlng.lng]);
//         map.flyTo(e.latlng, map.getZoom());
//       },
//     });
  
//     useEffect(() => {
//       if (connectLocations && savedLocations.length > 1) {
//         // Clear existing polylines
//         mapRef.current.eachLayer((layer) => {
//           if (layer instanceof L.Polyline) {
//             mapRef.current.removeLayer(layer);
//           }
//         });
  
//         // Create polyline between saved locations
//         const polylinePoints = savedLocations.map((loc) => [loc.lat, loc.lng]);
//         L.polyline(polylinePoints, { color: "red" }).addTo(mapRef.current);
  
//         // Add markers for saved locations
//         savedLocations.forEach((loc) => {
//           L.marker([loc.lat, loc.lng], { icon: customIcon })
//             .addTo(mapRef.current)
//             .bindPopup(`${loc.address}, ${loc.city}, ${loc.pincode}`);
//         });
//       }
//     }, [connectLocations, savedLocations]);
  
//     return position === null ? null : (
//       <Box
//         sx={{
//           position: "absolute",
//           top: 5,
//           zIndex: 1000,
//           display: "flex",
//           flexDirection: "row",
//           right: 10,
//         }}
//       >
//         <Button
//           sx={{
//             color: "#fff",
//             backgroundColor: "#0F67B1",
//             padding: 2,
//           }}
//           onClick={() => map.locate()}
//         >
//           <MyLocationIcon sx={{ mx: 1 }} position={position} />{" "}
//           {"current location"}
//         </Button>
//         <Marker position={position} icon={customIcon}>
//           <Tooltip direction="top" offset={[0, -40]}>
//             {locationDetails ? (
//               <>
//                 <div>{locationDetails.formatted}</div>
//                 <div>{locationDetails.city}</div>
//                 <div>{locationDetails.country}</div>
//               </>
//             ) : (
//               "Loading..."
//             )}
//           </Tooltip>
//         </Marker>
//       </Box>
//     );
//   }
  

//   const mapContainer = () => {
//     return (
//       <MapContainer
//         center={position || samplePosition}
//         zoom={14}
//         scrollWheelZoom={true}
//         style={{ height: 660, width: "50%" }}
//         ref={mapRef}
//       >
//         <TileLayer
//           url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${apiKey}`}
//         />
//         <LocationMarker connectLocations={connectLocations} />
//       </MapContainer>
//     );
//   };

//   const detailsContainer = () => {
//     return (
//       <Box
//         sx={{
//           width: "50%",
//           backgroundColor: "#eee100",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <FormControlLabel
//           control={
//             <Switch
//               checked={showMultipleLocations}
//               onChange={(e) => setShowMultipleLocations(e.target.checked)}
//               color="primary"
//             />
//           }
//           label="Show Multiple Locations"
//           sx={{ margin: 2 }}
//         />
//         <TextField
//           label="Search location"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           variant="outlined"
//           sx={{ margin: 2 }}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               handleSearch();
//             }
//           }}
//         />
//         {showMultipleLocations && (
//           <Box sx={{ display: "flex", flexDirection: "row" }}>
//             <Box
//               sx={{ display: "flex", flexDirection: "column", width: "50%" }}
//             >
//               <TextField
//                 label="Address"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 variant="outlined"
//                 sx={{ margin: 2 }}
//               />
//               <TextField
//                 label="City"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//                 variant="outlined"
//                 sx={{ margin: 2 }}
//               />
//               <TextField
//                 label="Pincode"
//                 value={pincode}
//                 onChange={(e) => setPincode(e.target.value)}
//                 variant="outlined"
//                 sx={{ margin: 2 }}
//               />
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleSaveLocation}
//                 sx={{ margin: 2 }}
//               >
//                 Save Location
//               </Button>
//             </Box>

//             <Box
//               sx={{
//                 width: "50%",
//                 backgroundColor: "#eee",
//                 display: "flex",
//                 flexDirection: "column",
//                 padding: 2,
//               }}
//             >
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "row",
//                   alignItems: "center",
//                   justifyContent: "space-around",
//                 }}
//               >
//                 <Typography variant="h6">Connect Locations</Typography>
//                 <FormControlLabel
//                   control={
//                     <Switch
//                       checked={connectLocations}
//                       onChange={(e) => setConnectLocations(e.target.checked)}
//                       color="primary"
//                     />
//                   }
//                 />
//               </Box>
//               {savedLocations.map((loc, index) => (
//                 <Box key={index} sx={{ marginBottom: 1 }}>
//                   <Typography variant="subtitle1">{loc.address}</Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     {loc.city}, {loc.pincode}
//                   </Typography>
//                 </Box>
//               ))}
//             </Box>
//           </Box>
//         )}
//       </Box>
//     );
//   };

//   return (
//     <Box
//       sx={{
//         height: 660,
//         width: "96%",
//         display: "flex",
//         flexDirection: "row",
//         padding: "2%",
//       }}
//     >
//       {detailsContainer()}
//       {mapContainer()}
//     </Box>
//   );
// }

// export default Map;

// // import React, { useState, useEffect, useRef } from "react";
// // import {
// //   Box,
// //   Button,
// //   TextField,
// //   Switch,
// //   FormControlLabel,
// //   Typography,
// // } from "@mui/material";
// // import L from "leaflet";
// // import "leaflet/dist/leaflet.css";
// // import axios from "axios";
// // import {
// //   MapContainer,
// //   Marker,
// //   TileLayer,
// //   Tooltip,
// //   useMapEvents,
// //   Polyline,
// // } from "react-leaflet";
// // import MyLocationIcon from "@mui/icons-material/MyLocation";
// // import pin from "../assets/location-pin.png";

// // function Map() {
// //   const samplePosition = [51.505, -0.09];
// //   const apiKey = "37b4cf9407c146caa22bf64efcc6ed65";
// //   const [position, setPosition] = useState(samplePosition);
// //   const [locationDetails, setLocationDetails] = useState(null);
// //   const [searchText, setSearchText] = useState("");
// //   const [showMultipleLocations, setShowMultipleLocations] = useState(false);
// //   const [address, setAddress] = useState("");
// //   const [city, setCity] = useState("");
// //   const [pincode, setPincode] = useState("");
// //   const [savedLocations, setSavedLocations] = useState([]);
// //   const [connectLocations, setConnectLocations] = useState(false); // Toggle state
// //   const mapRef = useRef();

// //   const customIcon = L.icon({
// //     iconUrl: pin,
// //     iconSize: [40, 40],
// //     iconAnchor: [20, 40],
// //     popupAnchor: [0, -40],
// //   });

// //   useEffect(() => {
// //     fetchLocationDetails(position[0], position[1]);
// //   }, [position]);

// //   const fetchLocationDetails = async (lat, lng) => {
// //     try {
// //       const response = await axios.get(
// //         `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`
// //       );
// //       if (response.data && response.data.features.length > 0) {
// //         setLocationDetails(response.data.features[0].properties);
// //       } else {
// //         setLocationDetails(null);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching location details:", error);
// //       setLocationDetails(null);
// //     }
// //   };

// //   const handleSearch = async () => {
// //     let url;

// //     const [lat, lng] = searchText.split(",").map(parseFloat);
// //     if (!isNaN(lat) && !isNaN(lng)) {
// //       url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`;
// //     } else {
// //       url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
// //         searchText
// //       )}&apiKey=${apiKey}`;
// //     }

// //     try {
// //       const response = await axios.get(url);
// //       if (response.data && response.data.features.length > 0) {
// //         const { lat, lon } = response.data.features[0].properties;
// //         setPosition([lat, lon]);
// //         mapRef.current.flyTo([lat, lon], mapRef.current.getZoom());
// //       } else {
// //         console.log("Location not found");
// //       }
// //     } catch (error) {
// //       console.error("Error searching location:", error);
// //     }
// //   };

// //   const handleSaveLocation = () => {
// //     const newLocation = {
// //       address,
// //       city,
// //       pincode,
// //       lat: position[0],
// //       lng: position[1],
// //     };

// //     setSavedLocations([...savedLocations, newLocation]);
// //     setAddress("");
// //     setCity("");
// //     setPincode("");
// //   };

// //   function LocationMarker({ connectLocations }) {
// //     const map = useMapEvents({
// //       click() {
// //         map.locate();
// //       },
// //       locationfound(e) {
// //         setPosition([e.latlng.lat, e.latlng.lng]);
// //         map.flyTo(e.latlng, map.getZoom());
// //       },
// //     });

// //     useEffect(() => {
// //       if (connectLocations && savedLocations.length > 1) {
// //         // Clear existing markers
// //         mapRef.current.eachLayer((layer) => {
// //           if (layer instanceof L.Marker) {
// //             mapRef.current.removeLayer(layer);
// //           }
// //         });

// //         // Add markers for saved locations
// //         savedLocations.forEach((loc, index) => {
// //           L.marker([loc.lat, loc.lng], { icon: customIcon })
// //             .addTo(mapRef.current)
// //             .bindTooltip(
// //               `<div>${loc.address}</div><div>${loc.city}, ${loc.pincode}</div>`
// //             );
// //         });

// //         // Create polyline between saved locations
// //         const polylinePoints = savedLocations.map((loc) => [loc.lat, loc.lng]);
// //         L.polyline(polylinePoints, { color: 'red' }).addTo(mapRef.current);
// //       } else {
// //         // Clear all markers and polylines
// //         mapRef.current.eachLayer((layer) => {
// //           mapRef.current.removeLayer(layer);
// //         });
// //       }
// //     }, [connectLocations, savedLocations]);

// //     return position === null ? null : (
// //       <Box
// //         sx={{
// //           position: "absolute",
// //           top: 5,
// //           zIndex: 1000,
// //           display: "flex",
// //           flexDirection: "row",
// //           right: 10,
// //         }}
// //       >
// //         <Button
// //           sx={{
// //             color: "#fff",
// //             backgroundColor: "#0F67B1",
// //             padding: 2,
// //           }}
// //           onClick={() => map.locate()}
// //         >
// //           <MyLocationIcon sx={{ mx: 1 }} position={position} />{" "}
// //           {"current location"}
// //         </Button>
// //         <Marker position={position} icon={customIcon}>
// //           <Tooltip direction="top" offset={[0, -40]}>
// //             {locationDetails ? (
// //               <>
// //                 <div>{locationDetails.formatted}</div>
// //                 <div>{locationDetails.city}</div>
// //                 <div>{locationDetails.country}</div>
// //               </>
// //             ) : (
// //               "Loading..."
// //             )}
// //           </Tooltip>
// //         </Marker>
// //       </Box>
// //     );
// //   }

// //   return (
// //     <Box
// //       sx={{
// //         height: 660,
// //         width: "96%",
// //         display: "flex",
// //         flexDirection: "row",
// //         padding: "2%",
// //       }}
// //     >
// //       <Box
// //         sx={{
// //           width: "50%",
// //           backgroundColor: "#eee100",
// //           display: "flex",
// //           flexDirection: "column",
// //         }}
// //       >
// //         <FormControlLabel
// //           control={
// //             <Switch
// //               checked={showMultipleLocations}
// //               onChange={(e) => setShowMultipleLocations(e.target.checked)}
// //               color="primary"
// //             />
// //           }
// //           label="Show Multiple Locations"
// //           sx={{ margin: 2 }}
// //         />

// //         {showMultipleLocations && (
// //           <Box sx={{ display: "flex", flexDirection: "row" }}>
// //             <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
// //               <TextField
// //                 label="Address"
// //                 value={address}
// //                 onChange={(e) => setAddress(e.target.value)}
// //                 variant="outlined"
// //                 sx={{ margin: 2 }}
// //               />
// //               <TextField
// //                 label="City"
// //                 value={city}
// //                 onChange={(e) => setCity(e.target.value)}
// //                 variant="outlined"
// //                 sx={{ margin: 2 }}
// //               />
// //               <TextField
// //                 label="Pincode"
// //                 value={pincode}
// //                 onChange={(e) => setPincode(e.target.value)}
// //                 variant="outlined"
// //                 sx={{ margin: 2 }}
// //               />
// //               <Button
// //                 variant="contained"
// //                 color="primary"
// //                 onClick={handleSaveLocation}
// //                 sx={{ margin: 2 }}
// //               >
// //                 Save Location
// //               </Button>
// //             </Box>

// //             <Box
// //               sx={{
// //                 width: "50%",
// //                 backgroundColor: "#eee",
// //                 display: "flex",
// //                 flexDirection: "column",
// //                 padding: 2,
// //               }}
// //             >
// //               <Typography variant="h6" sx={{ marginBottom: 2 }}>
// //                 Saved Locations
// //               </Typography>
// //               {savedLocations.map((loc, index) => (
// //                 <Box key={index} sx={{ marginBottom: 1 }}>
// //                   <Typography variant="subtitle1">{loc.address}</Typography>
// //                   <Typography variant="body2" color="textSecondary">
// //                     {loc.city}, {loc.pincode}
// //                   </Typography>
// //                 </Box>
// //               ))}
// //               <FormControlLabel
// //                 control={
// //                   <Switch
// //                     checked={connectLocations}
// //                     onChange={(e) => setConnectLocations(e.target.checked)}
// //                     color="primary"
// //                   />
// //                 }
// //                 label="Connect Locations"
// //                 sx={{ marginTop: 2 }}
// //               />
// //             </Box>
// //           </Box>
// //         )}
// //       </Box>

// //       <MapContainer
// //         center={position || samplePosition}
// //         zoom={14}
// //         scrollWheelZoom={true}
// //         style={{ height: 660, width: "50%" }}
// //         ref={mapRef}
// //       >
// //         <TileLayer
// //           url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${apiKey}`}
// //         />
// //         <LocationMarker connectLocations={connectLocations} />
// //       </MapContainer>
// //     </Box>
// //   );
// // }

// // export default Map;



// // imports----------------
// import React, { useEffect, useRef, useState } from "react";

// // material UI
// import {
//   Box,
//   Button,
//   FormControlLabel,
//   Switch,
//   TextField,
//   Typography,
// } from "@mui/material";

// // leaflet
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import { MapContainer, TileLayer } from "react-leaflet";

// // other packages
// import axios from "axios";

// // components
// import LocationMarker from "../components/locationMarker";

// // assets
// import pin from "../assets/location-pin.png";
// function Map() {

//   // local states
//   const [position, setPosition] = useState([51.505, -0.09]);
//   const [locationDetails, setLocationDetails] = useState(null);
//   const [searchText, setSearchText] = useState("");
//   const [showMultipleLocations, setShowMultipleLocations] = useState(false);
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [savedLocations, setSavedLocations] = useState([]);
//   const [connectLocations, setConnectLocations] = useState(false);

//   // user ref
//   const mapRef = useRef();

//   const apiKey = "37b4cf9407c146caa22bf64efcc6ed65";

//   useEffect(() => {
//     fetchLocationDetails(position[0], position[1]);
//   }, [position]);

//   const fetchLocationDetails = async (lat, lng) => {
//     try {
//       const response = await axios.get(
//         `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`
//       );
//       if (response.data && response.data.features.length > 0) {
//         setLocationDetails(response.data.features[0].properties);
//       } else {
//         setLocationDetails(null);
//       }
//     } catch (error) {
//       console.error("Error fetching location details:", error);
//       setLocationDetails(null);
//     }
//   };

//   const handleSearch = async () => {
//     let url;

//     const [lat, lng] = searchText.split(",").map(parseFloat);
//     if (!isNaN(lat) && !isNaN(lng)) {
//       url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`;
//     } else {
//       url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
//         searchText
//       )}&apiKey=${apiKey}`;
//     }

//     try {
//       const response = await axios.get(url);
//       if (response.data && response.data.features.length > 0) {
//         const { lat, lon } = response.data.features[0].properties;
//         setPosition([lat, lon]);
//         mapRef.current.flyTo([lat, lon], mapRef.current.getZoom());
//       } else {
//         console.log("Location not found");
//       }
//     } catch (error) {
//       console.error("Error searching location:", error);
//     }
//   };

//   const handleSaveLocation = () => {
//     const newLocation = {
//       address,
//       city,
//       pincode,
//       lat: position[0],
//       lng: position[1],
//     };

//     setSavedLocations([...savedLocations, newLocation]);
//     setAddress("");
//     setCity("");
//     setPincode("");
//   };

//   const mapContainer = () => {
//     return (
//       <MapContainer
//         center={position}
//         zoom={14}
//         scrollWheelZoom={true}
//         style={{ height: 660, width: "50%" }}
//         whenCreated={(map) => (mapRef.current = map)}
//       >
//         <TileLayer
//           url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${apiKey}`}
//         />
//         <LocationMarker
//           connectLocations={connectLocations}
//           savedLocations={savedLocations}
//           mapRef={mapRef}
//           position={position}
//           locationDetails={locationDetails}
//           customIcon={L.icon({
//             iconUrl: pin,
//             iconSize: [40, 40],
//             iconAnchor: [20, 40],
//             popupAnchor: [0, -40],
//           })}
//         />
//       </MapContainer>
//     );
//   };

//   const detailsContainer = () => {
//     return (
//       <Box
//         sx={{
//           width: "50%",
//           backgroundColor: "#eee100",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <FormControlLabel
//           control={
//             <Switch
//               checked={showMultipleLocations}
//               onChange={(e) => setShowMultipleLocations(e.target.checked)}
//               color="primary"
//             />
//           }
//           label="Show Multiple Locations"
//           sx={{ margin: 2 }}
//         />
//         <TextField
//           label="Search location"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           variant="outlined"
//           sx={{ margin: 2 }}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               handleSearch();
//             }
//           }}
//         />
//         {showMultipleLocations && (
//           <Box sx={{ display: "flex", flexDirection: "row" }}>
//             <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
//               <TextField
//                 label="Address"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 variant="outlined"
//                 sx={{ margin: 2 }}
//               />
//               <TextField
//                 label="City"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//                 variant="outlined"
//                 sx={{ margin: 2 }}
//               />
//               <TextField
//                 label="Pincode"
//                 value={pincode}
//                 onChange={(e) => setPincode(e.target.value)}
//                 variant="outlined"
//                 sx={{ margin: 2 }}
//               />
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleSaveLocation}
//                 sx={{ margin: 2 }}
//               >
//                 Save Location
//               </Button>
//             </Box>

//             <Box
//               sx={{
//                 width: "50%",
//                 backgroundColor: "#eee",
//                 display: "flex",
//                 flexDirection: "column",
//                 padding: 2,
//               }}
//             >
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "row",
//                   alignItems: "center",
//                   justifyContent: "space-around",
//                 }}
//               >
//                 <Typography variant="h6">Connect Locations</Typography>
//                 <FormControlLabel
//                   control={
//                     <Switch
//                       checked={connectLocations}
//                       onChange={(e) => setConnectLocations(e.target.checked)}
//                       color="primary"
//                     />
//                   }
//                 />
//               </Box>
//               {savedLocations.map((loc, index) => (
//                 <Box key={index} sx={{ marginBottom: 1 }}>
//                   <Typography variant="subtitle1">{loc.address}</Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     {loc.city}, {loc.pincode}
//                   </Typography>
//                 </Box>
//               ))}
//             </Box>
//           </Box>
//         )}
//       </Box>
//     );
//   };

//   return (
//     <Box
//       sx={{
//         height: 660,
//         width: "96%",
//         display: "flex",
//         flexDirection: "row",
//         padding: "2%",
//       }}
//     >
//       {detailsContainer()}
//       {mapContainer()}
//     </Box>
//   );
// }

// export default Map;

// import React, { useEffect, useRef, useState } from "react";
// import { Box, Button, FormControlLabel, Switch, TextField, Typography } from "@mui/material";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import { MapContainer, TileLayer } from "react-leaflet";
// import axios from "axios";
// import LocationMarker from "../components/locationMarker";
// import pin from "../assets/location-pin.png";

// function Map() {
//   const [position, setPosition] = useState([51.505, -0.09]);
//   const [locationDetails, setLocationDetails] = useState(null);
//   const [searchText, setSearchText] = useState("");
//   const [showMultipleLocations, setShowMultipleLocations] = useState(false);
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [savedLocations, setSavedLocations] = useState([]);
//   const [connectLocations, setConnectLocations] = useState(false);
//   const mapRef = useRef();
//   const apiKey = "37b4cf9407c146caa22bf64efcc6ed65";

//   useEffect(() => {
//     fetchLocationDetails(position[0], position[1]);
//   }, [position]);

//   const fetchLocationDetails = async (lat, lng) => {
//     try {
//       const response = await axios.get(
//         `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`
//       );
//       if (response.data && response.data.features.length > 0) {
//         setLocationDetails(response.data.features[0].properties);
//       } else {
//         setLocationDetails(null);
//       }
//     } catch (error) {
//       console.error("Error fetching location details:", error);
//       setLocationDetails(null);
//     }
//   };

//   const handleSearch = async () => {
//     let url;
//     const [lat, lng] = searchText.split(",").map(parseFloat);
//     if (!isNaN(lat) && !isNaN(lng)) {
//       url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`;
//     } else {
//       url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
//         searchText
//       )}&apiKey=${apiKey}`;
//     }

//     try {
//       const response = await axios.get(url);
//       if (response.data && response.data.features.length > 0) {
//         const { lat, lon } = response.data.features[0].properties;
//         setPosition([lat, lon]);
//         mapRef.current.flyTo([lat, lon], mapRef.current.getZoom());
//       } else {
//         console.log("Location not found");
//       }
//     } catch (error) {
//       console.error("Error searching location:", error);
//     }
//   };

//   const handleSaveLocation = () => {
//     const newLocation = {
//       address,
//       city,
//       pincode,
//       lat: position[0],
//       lng: position[1],
//     };

//     setSavedLocations((prev) => [...prev, newLocation]);
//     setAddress("");
//     setCity("");
//     setPincode("");
//   };

//   const mapContainer = () => (
//     <MapContainer
//       center={position}
//       zoom={14}
//       scrollWheelZoom={true}
//       style={{ height: 660, width: "50%" }}
//       whenCreated={(map) => (mapRef.current = map)}
//     >
//       <TileLayer
//         url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${apiKey}`}
//       />
//       <LocationMarker
//         connectLocations={connectLocations}
//         savedLocations={savedLocations}
//         mapRef={mapRef}
//         position={position}
//         locationDetails={locationDetails}
//         customIcon={L.icon({
//           iconUrl: pin,
//           iconSize: [40, 40],
//           iconAnchor: [20, 40],
//           popupAnchor: [0, -40],
//         })}
//         showMultipleLocations={showMultipleLocations}
//       />
//     </MapContainer>
//   );

//   const detailsContainer = () => (
//     <Box
//       sx={{
//         width: "50%",
//         backgroundColor: "#eee100",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       <FormControlLabel
//         control={
//           <Switch
//             checked={showMultipleLocations}
//             onChange={(e) => setShowMultipleLocations(e.target.checked)}
//             color="primary"
//           />
//         }
//         label="Show Multiple Locations"
//         sx={{ margin: 2 }}
//       />
//       <TextField
//         label="Search location"
//         value={searchText}
//         onChange={(e) => setSearchText(e.target.value)}
//         variant="outlined"
//         sx={{ margin: 2 }}
//         onKeyDown={(e) => {
//           if (e.key === "Enter") {
//             handleSearch();
//           }
//         }}
//       />
//       {showMultipleLocations && (
//         <Box sx={{ display: "flex", flexDirection: "row" }}>
//           <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
//             <TextField
//               label="Address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               variant="outlined"
//               sx={{ margin: 2 }}
//             />
//             <TextField
//               label="City"
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               variant="outlined"
//               sx={{ margin: 2 }}
//             />
//             <TextField
//               label="Pincode"
//               value={pincode}
//               onChange={(e) => setPincode(e.target.value)}
//               variant="outlined"
//               sx={{ margin: 2 }}
//             />
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSaveLocation}
//               sx={{ margin: 2 }}
//             >
//               Save Location
//             </Button>
//           </Box>

//           <Box
//             sx={{
//               width: "50%",
//               backgroundColor: "#eee",
//               display: "flex",
//               flexDirection: "column",
//               padding: 2,
//             }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "row",
//                 alignItems: "center",
//                 justifyContent: "space-around",
//               }}
//             >
//               <Typography variant="h6">Connect Locations</Typography>
//               <FormControlLabel
//                 control={
//                   <Switch
//                     checked={connectLocations}
//                     onChange={(e) => setConnectLocations(e.target.checked)}
//                     color="primary"
//                   />
//                 }
//               />
//             </Box>
//             {savedLocations.map((loc, index) => (
//               <Box key={index} sx={{ marginBottom: 1 }}>
//                 <Typography variant="subtitle1">{loc.address}</Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   {loc.city}, {loc.pincode}
//                 </Typography>
//               </Box>
//             ))}
//           </Box>
//         </Box>
//       )}
//     </Box>
//   );

//   return (
//     <Box
//       sx={{
//         height: 660,
//         width: "96%",
//         display: "flex",
//         flexDirection: "row",
//         padding: "2%",
//       }}
//     >
//       {detailsContainer()}
//       {mapContainer()}
//     </Box>
//   );
// }

// export default Map;


// import React from "react";

// // material UI
// import CancelIcon from "@mui/icons-material/Cancel";
// import MyLocationIcon from "@mui/icons-material/MyLocation";
// import { Box, Button, Modal, TextField, Typography } from "@mui/material";

// // Leaf let
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-curve";
// import {
//   MapContainer,
//   Marker,
//   TileLayer,
//   Polyline,
//   Tooltip,
//   useMapEvents,
// } from "react-leaflet";

// // other packages
// import axios from "axios";

// // firebase
// import { addDoc, collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase-config";

// //assets
// import pin from "../assets/location-pin.png";

// function Map() {
//   const samplePosition = [42.188779600000004, -71.45369788783867];
//   const apiKey = "37b4cf9407c146caa22bf64efcc6ed65";
//   const [position, setPosition] = React.useState(samplePosition);
//   const [locationDetails, setLocationDetails] = React.useState(null);
//   const [searchText, setSearchText] = React.useState("");
//   const [modalSearchText, setModalSearchText] = React.useState("");
//   const [modalPincode, setModalPincode] = React.useState("");
//   const [open, setOpen] = React.useState(false);
//   const [places, setPlaces] = React.useState([]);
//   const mapRef = React.useRef();

//   const customIcon = L.icon({
//     iconUrl: pin,
//     iconSize: [40, 40],
//     iconAnchor: [20, 40],
//     popupAnchor: [0, -40],
//   });

//   React.useEffect(() => {
//     fetchLocationDetails(position[0], position[1]);
//     fetchPlaces();
//   }, [position]);

//   const fetchLocationDetails = async (lat, lng) => {
//     try {
//       const response = await axios.get(
//         `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`
//       );
//       if (response.data && response.data.features.length > 0) {
//         setLocationDetails(response.data.features[0].properties);
//       } else {
//         setLocationDetails(null);
//       }
//     } catch (error) {
//       console.error("Error fetching location details:", error);
//       setLocationDetails(null);
//     }
//   };

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(
//         `https://api.geoapify.com/v1/geocode/search?text=${searchText}&apiKey=${apiKey}`
//       );
//       if (response.data && response.data.features.length > 0) {
//         const { lat, lon } = response.data.features[0].properties;
//         setPosition([lat, lon]);
//         mapRef.current.flyTo([lat, lon], mapRef.current.getZoom());
//       } else {
//         console.log("Location not found");
//       }
//     } catch (error) {
//       console.error("Error searching location:", error);
//     }
//   };

//   const handleAddPlace = async () => {
//     try {
//       const response = await axios.get(
//         `https://api.geoapify.com/v1/geocode/search?text=${modalSearchText}&apiKey=${apiKey}`
//       );
//       if (response.data && response.data.features.length > 0) {
//         const { lat, lon } = response.data.features[0].properties;
//         const newPosition = [lat, lon];

//         await addDoc(collection(db, "places"), {
//           details: modalSearchText,
//           pincode: modalPincode,
//           position: newPosition,
//         });

//         console.log("Place added to Firestore");
//         setOpen(false);
//         setModalSearchText("");
//         setModalPincode("");
//         fetchPlaces();
//       } else {
//         console.log("Location not found");
//       }
//     } catch (error) {
//       console.error("Error adding place to Firestore:", error);
//     }
//   };
//   const fetchPlaces = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "places"));
//       const placesData = querySnapshot.docs.map((doc) => doc.data());
//       setPlaces(placesData);
//     } catch (error) {
//       console.error("Error fetching places from Firestore:", error);
//     }
//   };
//   const createCurve = (points) => {
//     if (points.length < 2) return [];

//     return L.curve(
//       [
//         'M',
//         points[0],
//         'Q',
//         [(points[0][0] + points[1][0]) / 2, points[0][1]],
//         points[1]
//       ],
//       { color: 'red', weight: 2 }
//     );
//   };

//   const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 300,
//     bgcolor: "background.paper",
//     boxShadow: 24,
//     p: 3,
//     borderRadius: 5,
//   };
//   function LocationMarker() {
//     const map = useMapEvents({
//       click() {
//         map.locate();
//       },
//       locationfound(e) {
//         setPosition([e.latlng.lat, e.latlng.lng]);
//         map.flyTo(e.latlng, map.getZoom());
//       },
//     });

//     return position === null ? null : (
//       <Box
//         sx={{
//           position: "absolute",
//           top: 5,
//           zIndex: 1000,
//           display: "flex",
//           flexDirection: "row",
//           right: 10,
//         }}
//       >
//         <Button
//           sx={{
//             color: "#fff",
//             backgroundColor: "#0F67B1",
//             padding: 2,
//           }}
//         >
//           <MyLocationIcon sx={{ mx: 1 }} position={position} />{" "}
//           {"current location"}
//         </Button>
//         <Marker position={position} icon={customIcon}>
//           <Tooltip direction="top" offset={[0, -40]}>
//             {locationDetails ? (
//               <>
//                 <div>{locationDetails.formatted}</div>
//                 <div>{locationDetails.city}</div>
//                 <div>{locationDetails.country}</div>
//               </>
//             ) : (
//               "Loading..."
//             )}
//           </Tooltip>
//         </Marker>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         height: { xs: 900, md: 600 },
//         width: "96%",
//         display: "flex",
//         flexDirection: "column",
//         padding: "2%",
//       }}
//     >
//       <TextField
//         label="Search location"
//         value={searchText}
//         onChange={(e) => setSearchText(e.target.value)}
//         variant="outlined"
//         sx={{ margin: 2 }}
//         onKeyDown={(e) => {
//           if (e.key === "Enter") {
//             handleSearch();
//           }
//         }}
//       />

//       <MapContainer
//         center={position}
//         zoom={14}
//         scrollWheelZoom={true}
//         style={{ height: "100%", width: "100%" }}
//         ref={mapRef}
//       >
//         <TileLayer
//           url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${apiKey}`}
//         />
//         <LocationMarker />
//         {places.map((place, index) => (
//           <Marker key={index} position={place.position} icon={customIcon}>
//             <Tooltip direction="top" offset={[0, -40]}>
//               <div>{place.details}</div>
//               <div>{place.pincode}</div>
//             </Tooltip>
//           </Marker>
//         ))}
//         {places.length > 1 && (
//           <Polyline
//             positions={places.map((place) => place.position)}
//             color="red"
//             weight={2}
//             opacity={0.7}
//           />
//         )}
//       </MapContainer>

//       <Button
//         sx={{
//           color: "#fff",
//           backgroundColor: "#0F67B1",
//           padding: 2,
//           marginTop: 2,
//         }}
//         onClick={() => setOpen(true)}
//       >
//         OPEN MODAL
//       </Button>
//       <Modal
//         open={open}
//         onClose={() => setOpen(false)}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Button
//             sx={{
//               position: "absolute",
//               right: 0,
//               top: "6%",
//             }}
//             onClick={() => setOpen(false)}
//           >
//             <CancelIcon />
//           </Button>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Add more Markers
//           </Typography>
//           <TextField
//             label="Enter Details"
//             value={modalSearchText}
//             onChange={(e) => setModalSearchText(e.target.value)}
//             variant="outlined"
//             sx={{
//               width: "100%",
//               marginTop: 2,
//             }}
//           />
//           <TextField
//             label="Enter Pincode"
//             value={modalPincode}
//             onChange={(e) => setModalPincode(e.target.value)}
//             variant="outlined"
//             sx={{
//               width: "100%",
//               marginTop: 2,
//             }}
//           />
//           <Button
//             sx={{
//               color: "#fff",
//               backgroundColor: "#0F67B1",
//               padding: 2,
//               width: "100%",
//               marginTop: 2,
//             }}
//             onClick={handleAddPlace}
//           >
//             ADD PLACE
//           </Button>
//         </Box>
//       </Modal>
//     </Box>
//   );
// }

// export default Map;
// import React from "react";
// import CancelIcon from "@mui/icons-material/Cancel";
// import MyLocationIcon from "@mui/icons-material/MyLocation";
// import { Box, Button, Modal, TextField, Typography } from "@mui/material";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-curve";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   MapContainer,
//   Marker,
//   TileLayer,
//   Tooltip,
//   useMapEvents,
//   useMap,
// } from "react-leaflet";

// import axios from "axios";
// import { addDoc, collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase-config";
// import pin from "../assets/location-pin.png";
// import { TextInput } from "../components/textInput";

// const initialState = {
//   companyName: "",
//   address: "",
//   city: "",
//   pincode: "",
//   state: "",
//   country: "",
// };

// function Map() {
//   const samplePosition = [42.188779600000004, -71.45369788783867];
//   const apiKey = "37b4cf9407c146caa22bf64efcc6ed65";

//   // use ref
//   const mapRef = React.useRef();
//   const modalMapRef = React.useRef();
//   // local states
//   const [position, setPosition] = React.useState(samplePosition);
//   const [locationDetails, setLocationDetails] = React.useState(null);
//   const [searchText, setSearchText] = React.useState("");
//   const [open, setOpen] = React.useState(false);
//   const [places, setPlaces] = React.useState([]);

//   const [details, setDetails] = React.useState(initialState);
//   const [err, setErr] = React.useState(initialState);

//   const customIcon = L.icon({
//     iconUrl: pin,
//     iconSize: [40, 40],
//     iconAnchor: [20, 40],
//     popupAnchor: [0, -40],
//   });

//   React.useEffect(() => {
//     fetchLocationDetails(position[0], position[1]);
//     fetchPlaces();
//   }, [position]);

//   const fetchLocationDetails = async (lat, lng) => {
//     try {
//       const response = await axios.get(
//         `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`
//       );
//       if (response.data && response.data.features.length > 0) {
//         setLocationDetails(response.data.features[0].properties);
//       } else {
//         setLocationDetails(null);
//       }
//     } catch (error) {
//       console.error("Error fetching location details:", error);
//       setLocationDetails(null);
//     }
//   };

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(
//         `https://api.geoapify.com/v1/geocode/search?text=${searchText}&apiKey=${apiKey}`
//       );
//       if (response.data && response.data.features.length > 0) {
//         const { lat, lon } = response.data.features[0].properties;
//         setPosition([lat, lon]);
//         mapRef.current.flyTo([lat, lon], mapRef.current.getZoom());
//       } else {
//         toast.error("Location not found");
//       }
//     } catch (error) {
//       toast.error("Error searching location");
//       console.error("Error searching location:", error);
//     }
//   };

//   const handleAddPlace = async () => {
//     try {
//       const address = `${details.address}, ${details.city}, ${details.state}, ${details.country}`;
//       const response = await axios.get(
//         `https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=${apiKey}`
//       );
//       if (response.data && response.data.features.length > 0) {
//         const { lat, lon } = response.data.features[0].properties;
//         const newPosition = [lat, lon];

//         await addDoc(collection(db, "places"), {
//           details: {
//             companyName: details?.companyName,
//             address: details?.address,
//             city: details?.city,
//             pincode: details?.pincode,
//             state: details?.state,
//             country: details?.country,
//           },
//           position: newPosition,
//         });

//         toast.success("Client Added");
//         setOpen(false);
//         fetchPlaces();
//       } else {
//         toast.error("Location not found");
//       }
//     } catch (error) {
//       toast.error("Error adding place to Firestore");
//       console.error("Error adding place to Firestore:", error);
//     }
//   };

//   const fetchPlaces = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "places"));
//       const placesData = querySnapshot.docs.map((doc) => doc.data());
//       setPlaces(placesData);
//     } catch (error) {
//       console.error("Error fetching places from Firestore:", error);
//       // toast.error("Error fetching places from Firestore");
//     }
//   };

//   const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 300,
//     bgcolor: "background.paper",
//     boxShadow: 24,
//     p: 3,
//     borderRadius: 5,
//   };
//   function LocationMarker() {
//     const map = useMapEvents({
//       click() {
//         map.locate();
//       },
//       locationfound(e) {
//         setPosition([e.latlng.lat, e.latlng.lng]);
//         map.flyTo(e.latlng, map.getZoom());
//       },
//     });

//     return position === null ? null : (
//       <Box
//         sx={{
//           position: "absolute",
//           top: 5,
//           zIndex: 1000,
//           display: "flex",
//           flexDirection: "row",
//           right: 10,
//         }}
//       >
//         <Button
//           sx={{
//             color: "#fff",
//             backgroundColor: "#0F67B1",
//             padding: 2,
//           }}
//         >
//           <MyLocationIcon sx={{ mx: 1 }} position={position} />{" "}
//           {"current location"}
//         </Button>
//         <Marker position={position} icon={customIcon}>
//           <Tooltip direction="top" offset={[0, -40]}>
//             {locationDetails ? (
//               <>
//                 <div>{locationDetails.formatted}</div>
//                 <div>{locationDetails.city}</div>
//                 <div>{locationDetails.country}</div>
//               </>
//             ) : (
//               "Loading..."
//             )}
//           </Tooltip>
//         </Marker>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         height: { xs: 900, md: 800 },
//         width: "96%",
//         display: "flex",
//         flexDirection: "column",
//         padding: "2%",
//       }}
//     >
//       <Box
//         sx={{
//           width: "100%",
//           display: "flex",
//           flexDirection: { xs: "column", md: "row" },
//           alignItems: "center",
//           justifyContent: "space-between",
//           marginBottom: 2,
//         }}
//       >
//         <TextField
//           label="Search location"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           variant="outlined"
//           sx={{
//             width: { xs: "100%", md: "80%" },
//             marginBottom: { xs: 2, md: 0 },
//           }}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               handleSearch();
//             }
//           }}
//         />

//         <Button
//           sx={{
//             color: "#fff",
//             backgroundColor: "#0F67B1",
//             padding: 2,
//             width: { xs: "100%", md: "18%" },
//           }}
//           onClick={() => setOpen(true)}
//         >
//           ADD CLIENT
//         </Button>
//       </Box>

//       <MapContainer
//         center={position}
//         zoom={14}
//         scrollWheelZoom={true}
//         style={{ height: "100%", width: "100%" }}
//         ref={mapRef}
//       >
//         <TileLayer
//           url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${apiKey}`}
//         />
//         <LocationMarker />
//         {places.map((place, index) => (
//           <Marker key={index} position={place.position} icon={customIcon}>
//             <Tooltip direction="top" offset={[0, -40]}>
//               <div>{place.details}</div>
//               <div>{place.pincode}</div>
//             </Tooltip>
//           </Marker>
//         ))}
//       </MapContainer>

//       <Modal
//         open={open}
//         onClose={() => setOpen(false)}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Button
//             sx={{
//               position: "absolute",
//               right: 0,
//               top: "2%",
//             }}
//             onClick={() => setOpen(false)}
//           >
//             <CancelIcon />
//           </Button>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Add More Clients
//           </Typography>
//           <Box
//             sx={{ height: 300, width: "100%", marginBottom: 2, marginTop: 2 }}
//           >
//             <MapContainer
//               center={position}
//               zoom={14}
//               scrollWheelZoom={true}
//               style={{ height: "100%", width: "100%" }}
//               ref={modalMapRef}
//             >
//               <TileLayer
//                 url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${apiKey}`}
//               />
//               <Marker position={position} icon={customIcon}>
//                 <Tooltip direction="top" offset={[0, -40]}>
//                   {locationDetails ? (
//                     <>
//                       <div>{locationDetails.formatted}</div>
//                       <div>{locationDetails.city}</div>
//                       <div>{locationDetails.country}</div>
//                     </>
//                   ) : (
//                     "Loading..."
//                   )}
//                 </Tooltip>
//               </Marker>
//             </MapContainer>
//           </Box>
//           <Typography
//             sx={{ mb: 2, fontSize: { xs: 18, md: 22 } }}
//             id="modal-modal-title"
//             variant="h6"
//             component="h2"
//           >
//             Enter your company details
//           </Typography>
//           <TextInput
//             label="Company Name"
//             name="companyName"
//             value={details.companyName}
//             onChange={(e) =>
//               setDetails({ ...details, companyName: e.target.value })
//             }
//             onBlur={() => {
//               if (!details.companyName)
//                 setErr({ ...err, companyName: "This field is required" });
//               else setErr({ ...err, companyName: "" });
//             }}
//             err={err.companyName}
//           />

//           <TextInput
//             label="Address"
//             name="address"
//             value={details.address}
//             onChange={(e) =>
//               setDetails({ ...details, address: e.target.value })
//             }
//             onBlur={() => {
//               if (!details.address)
//                 setErr({ ...err, address: "This field is required" });
//               else setErr({ ...err, address: "" });
//             }}
//             err={err.address}
//           />

//           <TextInput
//             label="City"
//             name="city"
//             value={details.city}
//             onChange={(e) => setDetails({ ...details, city: e.target.value })}
//             onBlur={() => {
//               if (!details.city)
//                 setErr({ ...err, city: "This field is required" });
//               else setErr({ ...err, city: "" });
//             }}
//             err={err.city}
//           />

//           <TextInput
//             label="Pincode"
//             name="pincode"
//             value={details.pincode}
//             onChange={(e) =>
//               setDetails({ ...details, pincode: e.target.value })
//             }
//             onBlur={() => {
//               if (!details.pincode)
//                 setErr({ ...err, pincode: "This field is required" });
//               else setErr({ ...err, pincode: "" });
//             }}
//             err={err.pincode}
//           />

//           <TextInput
//             label="State"
//             name="state"
//             value={details.state}
//             onChange={(e) => setDetails({ ...details, state: e.target.value })}
//             onBlur={() => {
//               if (!details.state)
//                 setErr({ ...err, state: "This field is required" });
//               else setErr({ ...err, state: "" });
//             }}
//             err={err.state}
//           />

//           <TextInput
//             label="Country"
//             name="country"
//             value={details.country}
//             onChange={(e) =>
//               setDetails({ ...details, country: e.target.value })
//             }
//             onBlur={() => {
//               if (!details.country)
//                 setErr({ ...err, country: "This field is required" });
//               else setErr({ ...err, country: "" });
//             }}
//             err={err.country}
//           />

//           <Button
//             sx={{
//               color: "#fff",
//               backgroundColor: "#0F67B1",
//               padding: 2,
//               width: "100%",
//               marginTop: 2,
//             }}
//             onClick={handleAddPlace}
//           >
//             ADD CLIENT
//           </Button>
//         </Box>
//       </Modal>
//     </Box>
//   );
// }

// export default Map;

import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-curve";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  useMapEvents,
} from "react-leaflet";

import axios from "axios";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import pin from "../assets/location-pin.png";
import { TextInput } from "../components/textInput";

const initialState = {
  companyName: "",
  address: "",
  city: "",
  pincode: "",
  state: "",
  country: "",
};

function Sample() {
  const samplePosition = [42.188779600000004, -71.45369788783867];
  const apiKey = "37b4cf9407c146caa22bf64efcc6ed65";

  // use ref
  const mapRef = React.useRef();
  const modalMapRef = React.useRef();
  // local states
  const [position, setPosition] = React.useState(samplePosition);
  const [locationDetails, setLocationDetails] = React.useState(null);
  const [searchText, setSearchText] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [places, setPlaces] = React.useState([]);

  const [details, setDetails] = React.useState(initialState);
  const [err, setErr] = React.useState(initialState);

  const customIcon = L.icon({
    iconUrl: pin,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  React.useEffect(() => {
    fetchLocationDetails(position[0], position[1]);
    fetchPlaces();
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
        toast.error("Location not found");
      }
    } catch (error) {
      console.error("Error searching location:", error);
      toast.error("Error searching location");
    }
  };

  const handleAddPlace = async () => {
    const newErr = {
      companyName: details.companyName ? "" : "Company name is required",
      address: details.address ? "" : "Address is required",
      city: details.city ? "" : "City is required",
      pincode: details.pincode ? "" : "Pincode is required",
      state: details.state ? "" : "State is required",
      country: details.country ? "" : "Country is required",
    };

    setErr(newErr);

    const hasErrors = Object.values(newErr).some((error) => error !== "");
    if (hasErrors) {
      return;
    }

    try {
      const address = `${details.address}, ${details.city}, ${details.state}, ${details.country}`;
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=${apiKey}`
      );
      if (response.data && response.data.features.length > 0) {
        const { lat, lon } = response.data.features[0].properties;
        const newPosition = [lat, lon];

        await addDoc(collection(db, "places"), {
          details: {
            companyName: details?.companyName,
            address: details?.address,
            city: details?.city,
            pincode: details?.pincode,
            state: details?.state,
            country: details?.country,
          },
          position: newPosition,
        });

        toast.success("Client Added");
        setOpen(false);
        fetchPlaces();
      } else {
        toast.error("Location not found");
      }
    } catch (error) {
      console.error("Error adding place to Firestore:", error);
      toast.error("Error adding place to Firestore");
    }
  };

  const fetchPlaces = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "places"));
      const placesData = querySnapshot.docs.map((doc) => doc.data());
      setPlaces(placesData);
    } catch (error) {
      console.error("Error fetching places from Firestore:", error);
      toast.error("Error fetching places from Firestore");
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
    borderRadius: 5,
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
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: { xs: 900, md: 800 },
        width: "96%",
        display: "flex",
        flexDirection: "column",
        padding: "2%",
      }}
    >
      <ToastContainer />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <TextField
          label="Search location"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          variant="outlined"
          sx={{
            width: { xs: "100%", md: "80%" },
            marginBottom: { xs: 2, md: 0 },
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <Button
          sx={{
            color: "#fff",
            backgroundColor: "#0F67B1",
            padding: 2,
            width: { xs: "100%", md: "18%" },
          }}
          onClick={() => setOpen(true)}
        >
          ADD CLIENT
        </Button>
      </Box>

      <MapContainer
        center={position}
        zoom={14}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
      >
        <TileLayer
          url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${apiKey}`}
        />
        <LocationMarker />
        {places.map((place, index) => (
          <Marker key={index} position={place.position} icon={customIcon}>
            <Tooltip direction="top" offset={[0, -40]}>
              <div>{place.details.companyName}</div>
              <div>{place.details.address}</div>
              <div>{place.details.city}</div>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CancelIcon
            onClick={() => {
              setOpen(false);
              setDetails(initialState);
              setErr(initialState);
            }}
            sx={{ float: "right", cursor: "pointer" }}
          />
          <Typography
            sx={{ mb: 2, fontSize: { xs: 18, md: 22 } }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Enter your company details
          </Typography>

          <TextInput
            label="Company Name"
            name="companyName"
            value={details.companyName}
            onChange={(e) =>
              setDetails({ ...details, companyName: e.target.value })
            }
            onBlur={() => {
              if (!details.companyName)
                setErr({ ...err, companyName: "This field is required" });
              else setErr({ ...err, companyName: "" });
            }}
            err={err.companyName}
          />

          <TextInput
            label="Address"
            name="address"
            value={details.address}
            onChange={(e) =>
              setDetails({ ...details, address: e.target.value })
            }
            onBlur={() => {
              if (!details.address)
                setErr({ ...err, address: "This field is required" });
              else setErr({ ...err, address: "" });
            }}
            err={err.address}
          />

          <TextInput
            label="City"
            name="city"
            value={details.city}
            onChange={(e) => setDetails({ ...details, city: e.target.value })}
            onBlur={() => {
              if (!details.city)
                setErr({ ...err, city: "This field is required" });
              else setErr({ ...err, city: "" });
            }}
            err={err.city}
          />

          <TextInput
            label="Pincode"
            name="pincode"
            value={details.pincode}
            onChange={(e) =>
              setDetails({ ...details, pincode: e.target.value })
            }
            onBlur={() => {
              if (!details.pincode)
                setErr({ ...err, pincode: "This field is required" });
              else setErr({ ...err, pincode: "" });
            }}
            err={err.pincode}
          />

          <TextInput
            label="State"
            name="state"
            value={details.state}
            onChange={(e) => setDetails({ ...details, state: e.target.value })}
            onBlur={() => {
              if (!details.state)
                setErr({ ...err, state: "This field is required" });
              else setErr({ ...err, state: "" });
            }}
            err={err.state}
          />

          <TextInput
            label="Country"
            name="country"
            value={details.country}
            onChange={(e) =>
              setDetails({ ...details, country: e.target.value })
            }
            onBlur={() => {
              if (!details.country)
                setErr({ ...err, country: "This field is required" });
              else setErr({ ...err, country: "" });
            }}
            err={err.country}
          />

          <Button
            sx={{
              color: "#fff",
              backgroundColor: "#0F67B1",
              padding: 2,
              mt: 3,
              width: "100%",
            }}
            onClick={handleAddPlace}
          >
            Add Place
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default Sample;
