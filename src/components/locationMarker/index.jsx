// import { Box, Button, Tooltip } from "@mui/material";
// import L, { Marker } from "leaflet";
// import "leaflet/dist/leaflet.css";
// import React, { useEffect } from "react";

// // function LocationMarker({ connectLocations, savedLocations, mapRef, position, locationDetails, customIcon }) {
// //   useEffect(() => {
// //     if (connectLocations && savedLocations.length > 1 && mapRef.current) {
// //       mapRef.current.eachLayer((layer) => {
// //         if (layer instanceof L.Polyline || layer instanceof L.Marker) {
// //           mapRef.current.removeLayer(layer);
// //         }
// //       });

// //       const polylinePoints = savedLocations.map((loc) => [loc.lat, loc.lng]);
// //       L.polyline(polylinePoints, { color: "red" }).addTo(mapRef.current);

// //       savedLocations.forEach((loc, index) => {
// //         L.marker([loc.lat, loc.lng], { icon: customIcon })
// //           .addTo(mapRef.current)
// //           .bindTooltip(`${loc.address}, ${loc.city}, ${loc.pincode}`)
// //           .openTooltip();
// //       });
// //     }
// //   }, [connectLocations, savedLocations, mapRef, customIcon]);
// function LocationMarker({ connectLocations, savedLocations, mapRef, position, locationDetails, customIcon }) {
//     useEffect(() => {
//       if (connectLocations && savedLocations.length > 1 && mapRef.current) {
//         console.log("Saved Locations:", savedLocations); // Check savedLocations array
//         mapRef.current.eachLayer((layer) => {
//           if (layer instanceof L.Polyline || layer instanceof L.Marker) {
//             console.log("Removing Layer:", layer); // Check layers being removed
//             mapRef.current.removeLayer(layer);
//           }
//         });

//         const polylinePoints = savedLocations.map((loc) => [loc.lat, loc.lng]);
//         console.log("Polyline Points:", polylinePoints); // Check polylinePoints array
//         L.polyline(polylinePoints, { color: "red" }).addTo(mapRef.current);

//         savedLocations.forEach((loc, index) => {
//           L.marker([loc.lat, loc.lng], { icon: customIcon })
//             .addTo(mapRef.current)
//             .bindTooltip(`${loc.address}, ${loc.city}, ${loc.pincode}`)
//             .openTooltip();
//         });
//       }
//     }, [connectLocations, savedLocations, mapRef, customIcon]);

//   return position === null ? null : (
//     <Box
//       sx={{
//         position: "absolute",
//         top: 5,
//         zIndex: 1000,
//         display: "flex",
//         flexDirection: "row",
//         right: 10,
//       }}
//     >
//       <Button
//         sx={{
//           color: "#fff",
//           backgroundColor: "#0F67B1",
//           padding: 2,
//         }}
//         onClick={() => mapRef.current.locate()}
//       >
//         {"current location"}
//       </Button>
//       <Marker position={position} icon={customIcon}>
//         <Tooltip direction="top" offset={[0, -40]}>
//           {locationDetails ? (
//             <>
//               <div>{locationDetails.formatted}</div>
//               <div>{locationDetails.city}</div>
//               <div>{locationDetails.country}</div>
//             </>
//           ) : (
//             "Loading..."
//           )}
//         </Tooltip>
//       </Marker>
//     </Box>
//   );
// }

// export default LocationMarker;

// curve features

// const createCurve = (points) => {
//   if (points.length < 2) return null;

//   const controlPoint = [
//     (points[0][0] + points[1][0]) / 2,
//     (points[0][1] + points[1][1]) / 2 - 0.01,
//   ];

//   return L.curve(["M", points[0], "Q", controlPoint, points[1]], {
//     color: "red",
//     weight: 2,
//   });
// };

// function Curves() {
//   const map = useMap();

//   React.useEffect(() => {
//     if (places.length > 1) {
//       // Clear existing curves
//       map.eachLayer((layer) => {
//         if (layer instanceof L.Polyline) {
//           map.removeLayer(layer);
//         }
//       });

//       places.forEach((place, index) => {
//         if (index < places.length - 1) {
//           const nextPlace = places[index + 1];
//           const curve = createCurve([place.position, nextPlace.position]);
//           if (curve) {
//             curve.addTo(map);
//           }
//         }
//       });
//     }
//   }, [places, map]);

//   return null;
// }

// add this below to location marker
{
  /* <Curves /> */
}

import React from "react";
import { Marker, Popup, Tooltip, Polyline } from "react-leaflet";

const LocationMarker = ({
  position,
  locationDetails,
  customIcon,
  savedLocations,
  connectLocations,
  mapRef,
  showMultipleLocations,
}) => {
  const renderTooltip = (details) => (
    <Tooltip>
      <span>{details}</span>
    </Tooltip>
  );

  return (
    <>
      <Marker position={position} icon={customIcon}>
        <Popup>
          {locationDetails ? (
            <div>
              <strong>{locationDetails.formatted}</strong>
              <br />
              <em>{`Lat: ${position[0]}, Lng: ${position[1]}`}</em>
            </div>
          ) : (
            <span>Loading...</span>
          )}
        </Popup>
        {locationDetails && renderTooltip(locationDetails.formatted)}
      </Marker>
      {showMultipleLocations &&
        savedLocations.map((loc, index) => (
          <Marker key={index} position={[loc.lat, loc.lng]} icon={customIcon}>
            <Popup>
              <div>
                <strong>{loc.address}</strong>
                <br />
                <em>{`Lat: ${loc.lat}, Lng: ${loc.lng}`}</em>
              </div>
            </Popup>
            {renderTooltip(loc.address)}
          </Marker>
        ))}
      {connectLocations && (
        <Polyline
          positions={savedLocations.map((loc) => [loc.lat, loc.lng])}
          color="blue"
        />
      )}
    </>
  );
};

export default LocationMarker;


// import MyLocationIcon from "@mui/icons-material/MyLocation";
// import { Box, Button, TextField } from "@mui/material";
// import Divider from "@mui/material/Divider";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import axios from "axios";
// import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
// import L from "leaflet";
// import "leaflet-curve";
// import "leaflet/dist/leaflet.css";
// import React from "react";
// import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import pin from "../assets/location-pin.png";
// import AddPlaceModal from "../components/addModal";
// import { db } from "../firebase-config";

// function Map() {
//   const samplePosition = [42.188779600000004, -71.45369788783867];
//   const apiKey = "37b4cf9407c146caa22bf64efcc6ed65";

//   // use ref
//   const mapRef = React.useRef();
//   // local states
//   const [position, setPosition] = React.useState(samplePosition);
//   const [locationDetails, setLocationDetails] = React.useState(null);
//   const [searchText, setSearchText] = React.useState("");
//   const [open, setOpen] = React.useState(false);
//   const [places, setPlaces] = React.useState([]);
//   const [openDrawer, setOpenDrawer] = React.useState(false);
//   const [selectedPlace, setSelectedPlace] = React.useState(null);

//   const toggleDrawer = (newOpen, place) => () => {
//     console.log("🚀 ~ toggleDrawer ~ place:", place);
//     setSelectedPlace(place);
//     setOpenDrawer(newOpen);
//   };
//   const customIcon = L.icon({
//     iconUrl: pin,
//     iconSize: [40, 40],
//     iconAnchor: [20, 40],
//     popupAnchor: [0, -40],
//   });

//   React.useEffect(() => {
//     // handleLocateMe();
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
//     }
//   };

//   const fetchPlaces = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "places"));
//       const fetchedPlaces = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         data: doc.data(),
//       }));
//       setPlaces(fetchedPlaces);
//     } catch (error) {
//       console.error("Error fetching places:", error);
//     }
//   };
//   const handleLocateMe = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setPosition([latitude, longitude]);
//           if (mapRef.current) {
//             mapRef.current.flyTo([latitude, longitude], 15);
//           }
//           fetchLocationDetails(latitude, longitude);
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//           toast.error("Unable to retrieve your location.");
//         }
//       );
//     } else {
//       toast.error("Geolocation is not supported by this browser.");
//     }
//   };

//   const handleSearch = async () => {
//     if (searchText.trim() === "") {
//       return;
//     }
//     try {
//       const response = await axios.get(
//         `https://api.geoapify.com/v1/geocode/search?text=${searchText}&apiKey=${apiKey}`
//       );
//       if (response.data && response.data.features.length > 0) {
//         const { lat, lon } = response.data.features[0].properties;
//         setPosition([lat, lon]);
//         mapRef.current.setView([lat, lon], 15);
//       } else {
//         toast.error("Location not found");
//       }
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//       toast.error("Error fetching search results");
//     }
//   };

//   const handleDelete = async () => {
//     if (!selectedPlace) {
//       toast.error("No place selected");
//       return;
//     }
  
//     try {
//       const placeDocRef = doc(db, "places", selectedPlace.id);
      
//       await deleteDoc(placeDocRef);
  
//       fetchPlaces();
//       setOpenDrawer(false);
//       toast.success("Place deleted successfully");
//     } catch (error) {
//       console.error("Error deleting place:", error);
//       toast.error("Error deleting place");
//     }
//   };

//   const handleEdit = () => {
//     if (!selectedPlace) {
//       toast.error("No place selected");
//       return;
//     }
  
//     setOpenDrawer(false);
  
//     setOpen(true);
//     const { position } = selectedPlace.data;
//     setPosition(position);
//     if (mapRef.current) {
//       mapRef.current.setView(position, 15);
//     }
//   };
  
//   const DrawerList = (
//     <Box
//       sx={{ width: { xs: 250, md: 500 } }}
//       role="presentation"
//       onClick={toggleDrawer(false)}
//     >
//       <List>
//         {selectedPlace ? (
//           <>
//             <ListItem>
//               <ListItemText
//                 primary={`Company Name: ${selectedPlace.data.details.companyName}`}
//               />
//             </ListItem>
//             <ListItem>
//               <ListItemText
//                 primary={`Address: ${selectedPlace.data.details.address}`}
//               />
//             </ListItem>
//             <ListItem>
//               <ListItemText
//                 primary={`City: ${selectedPlace.data.details.city}`}
//               />
//             </ListItem>
//             <ListItem>
//               <ListItemText
//                 primary={`Pincode: ${selectedPlace.data.details.pincode}`}
//               />
//             </ListItem>
//             <ListItem>
//               <ListItemText
//                 primary={`State: ${selectedPlace.data.details.state}`}
//               />
//             </ListItem>
//             <ListItem>
//               <ListItemText
//                 primary={`Country: ${selectedPlace.data.details.country}`}
//               />
//             </ListItem>

//             <Divider />
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: { xs: "column", md: "row" },
//                 padding: 3,
//                 alignItems: { md: "center" },
//                 width: "90%",
//                 justifyContent: { md: "space-between" },
//               }}
//             >
//               <Button
//                 variant="contained"
//                 sx={{
//                   width: { md: "45%" },
//                 }}
//                 onClick={handleDelete}
//               >
//                 DELETE
//               </Button>
//               <Button
//                 variant="contained"
//                 onClick={handleEdit}
//                 sx={{
//                   marginTop: { xs: 3, md: 0 },
//                   width: { md: "45%" },
//                 }}
//               >
//                 EDIT
//               </Button>
//             </Box>
//           </>
//         ) : (
//           <ListItem>
//             <ListItemText primary="Select a place to see details" />
//           </ListItem>
//         )}
//       </List>
//     </Box>
//   );
//   return (
//     <Box
//       sx={{
//         position: "relative",
//         height: { xs: 750, md: 1050 },
//         width: "calc(100vw - 40px)",
//         margin: 2,
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
//             fontWeight: "bold",
//           }}
//           variant="contained"
//           onClick={() => setOpen(true)}
//         >
//           ADD NEW CLIENT
//         </Button>
//       </Box>

//       <MapContainer
//         ref={mapRef}
//         center={position}
//         zoom={10}
//         style={{ height: "100%", width: "100%" }}
//       >
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         {places.map((place) => (
//           <Marker
//             key={place.id}
//             position={place.data.position}
//             icon={customIcon}
//             eventHandlers={{
//               click: toggleDrawer(true, place),
//             }}
//           >
//             <Tooltip direction="top" offset={[0, -35]} opacity={1} permanent>
//               {place.data.details.companyName}
//             </Tooltip>
//           </Marker>
//         ))}

//         <Marker position={position} icon={customIcon}>
//           {/* <Tooltip direction="top" offset={[0, -35]} opacity={1} permanent>
//             {locationDetails ? locationDetails.formatted : "Loading..."}
//           </Tooltip> */}
//         </Marker>
//       </MapContainer>

//       <Button
//         variant="contained"
//         onClick={handleLocateMe}
//         sx={{
//           position: "absolute",
//           top: { xs: "22%", md: "8%" },
//           right: 16,
//           display: "flex",
//           alignItems: "center",
//           gap: 2,
//           zIndex: 1000,
//         }}
//       >
//         <MyLocationIcon />
//       </Button>
//       <ToastContainer />

//       <AddPlaceModal
//         open={open}
//         handleClose={() => setOpen(false)}
//         fetchPlaces={fetchPlaces}
//         apiKey={apiKey}
//         position={position}
//         place={selectedPlace}
//       />

//       <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
//         {DrawerList}
//       </Drawer>
//     </Box>
//   );
// }

// export default Map;












// function AddPlaceModal({ open, handleClose, fetchPlaces, apiKey, place }) {
//   const [details, setDetails] = React.useState(initialState);
//   const [err, setErr] = React.useState(initialState);
//   const [clickedPosition, setClickedPosition] = React.useState(null);
//   const [locationDetails, setLocationDetails] = React.useState(null);

//   const samplePosition = [42.188779600000004, -71.45369788783867];

//   const customIcon = L.icon({
//     iconUrl: pin,
//     iconSize: [40, 40],
//     iconAnchor: [20, 40],
//     popupAnchor: [0, -40],
//   });



//   return (
//     <Modal
//       open={open}
//       onClose={handleCloseModal}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >

//         <MapContainer
//           center={samplePosition}
//           zoom={10}
//           style={{ height: "300px", width: "100%" }}
//         >
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//           {clickedPosition && (
//             <Marker position={clickedPosition} icon={customIcon} >
//               <Tooltip direction="top" offset={[0, -35]} opacity={1} permanent>

//                 {locationDetails
//                   ? `${locationDetails.city}, ${locationDetails.state}, ${locationDetails.country}`
//                   : "Loading..."}
//               </Tooltip>
//             </Marker>
//           )}
//           <ClickHandler onClick={handleClick} />
//         </MapContainer>

//         <Typography
//           sx={{ mb: 2, mt: 2, fontSize: { xs: 18, md: 22 } }}
//           id="modal-modal-title"
//           variant="h6"
//           component="h2"
//         >
//           Enter your company details
//         </Typography>

//         <Box sx={inputBoxStyle}>
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
//         </Box>

//         <Button
//           sx={{
//             color: "#fff",
//             backgroundColor: "#0F67B1",
//             padding: 2,
//             mt: 3,
//             width: "100%",
//           }}
//           variant="contained"
//           onClick={handleAddPlace}
//         >
//           Add Client
//         </Button>
//       </Box>
//     </Modal>
//   );
// }
