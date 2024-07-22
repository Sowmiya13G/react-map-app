import React from "react";

// MUI imports
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { Box, Button, TextField, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

// other packages
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//firebase
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";

//leaflet
import L from "leaflet";
import "leaflet-curve";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";

// components
import AddPlaceModal from "../components/addModal";

// assets
import pin from "../assets/location-pin.png";

// map key
const apiKey = "37b4cf9407c146caa22bf64efcc6ed65";

// custom icon
const customIcon = L.icon({
  iconUrl: pin,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// sample position
const samplePosition = [21.642491280846862, 78.83925616878989];

const Map = () => {
  // local states
  const [position, setPosition] = React.useState(samplePosition);
  const [locationDetails, setLocationDetails] = React.useState(null);
  const [searchText, setSearchText] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [places, setPlaces] = React.useState([]);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [selectedPlace, setSelectedPlace] = React.useState(null);
  const [placeDetails, setPlaceDetails] = React.useState(null);

  // use ref
  const mapRef = React.useRef();

  // use effects
  React.useEffect(() => {
    fetchLocationDetails(position[0], position[1]);
    fetchPlaces();
  }, [position]);

  // ------------------------------ functionalities -----------------------------------------

  // fetch local details from map
  const fetchLocationDetails = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`
      );
      setLocationDetails(
        response.data.features.length > 0
          ? response.data.features[0].properties
          : null
      );
    } catch (error) {
      console.error("Error fetching location details:", error);
    }
  };

  // fetch places from firebase fire store
  const fetchPlaces = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "places"));
      const fetchedPlaces = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setPlaces(fetchedPlaces);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  // fetch current location
  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setPosition([latitude, longitude]);
          mapRef.current?.flyTo([latitude, longitude], 15);
          fetchLocationDetails(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Unable to retrieve your location.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  // search
  const handleSearch = async () => {
    if (searchText.trim() === "") return;

    try {
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${searchText}&apiKey=${apiKey}`
      );
      if (response.data.features.length > 0) {
        const { lat, lon } = response.data.features[0].properties;
        setPosition([lat, lon]);
        mapRef.current?.setView([lat, lon], 15);
      } else {
        toast.error("Location not found");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      toast.error("Error fetching search results");
    }
  };

  // delete added place
  const handleDelete = async () => {
    if (!selectedPlace) {
      toast.error("No place selected");
      return;
    }

    try {
      await deleteDoc(doc(db, "places", selectedPlace.id));
      fetchPlaces();
      setOpenDrawer(false);
      toast.success("Place deleted successfully");
    } catch (error) {
      console.error("Error deleting place:", error);
      toast.error("Error deleting place");
    }
  };

  // handle edit
  const handleEdit = () => {
    if (!selectedPlace) {
      toast.error("No place selected");
      return;
    }

    setOpenDrawer(false);
    setOpen(true);

    const { position } = selectedPlace.data;
    setPosition(position);

    if (mapRef.current) {
      mapRef.current.flyTo(position, 15);
    }

    setPlaceDetails(selectedPlace.data);
  };

  // update place details
  const handleUpdatePlace = async (updatedPlace) => {
    if (!selectedPlace) return;

    try {
      await updateDoc(doc(db, "places", selectedPlace.id), updatedPlace);
      fetchPlaces();
      setOpen(false);
      toast.success("Place updated successfully");
    } catch (error) {
      console.error("Error updating place:", error);
      toast.error("Error updating place");
    }
  };

  // ------------------- Custom Styles -----------------------
  const listStyle = {
    fontSize: { xs: "14px", md: "25px" },
  };
  const boldStyle = {
    fontWeight: "bold",
  };

  const semiBoldStyle = {
    fontWeight: 600,
  };

  const buttonContainer = {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    padding: 3,
    alignItems: { md: "center" },
    width: "90%",
    justifyContent: { md: "space-between" },
    marginRight: { xs: "2%" },
  };

  // --------------------- Render UI ----------------------------------

  // render search and button

  const header = () => {
    return (
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
            "& .MuiInputBase-root": {
              height: "40px",
            },
            "& .MuiInputLabel-root": {
              fontSize: "14px",
            },
            "& .MuiInputBase-input": {
              fontSize: "14px",
            },
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <Button
          sx={{
            color: "#fff",
            backgroundColor: "#0F67B1",
            padding: 1,
            width: { xs: "100%", md: "18%" },
            fontWeight: "bold",
            fontSize: { xs: "14px" },
          }}
          variant="contained"
          onClick={() => setOpen(true)}
        >
          ADD NEW CLIENT
        </Button>
      </Box>
    );
  };

  const mapContainer = () => {
    return (
      <MapContainer
        ref={mapRef}
        center={position}
        zoom={10}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {places.map((place) => (
          <Marker
            key={place.id}
            position={place.data.position}
            icon={customIcon}
            eventHandlers={{
              click: () => {
                setSelectedPlace(place);
                setOpenDrawer(true);
              },
            }}
          >
            <Tooltip direction="top" offset={[0, -35]} opacity={1} permanent>
              {place.data.details.companyName}
            </Tooltip>
          </Marker>
        ))}
        <Marker position={position} icon={customIcon} />
      </MapContainer>
    );
  };

  const DrawerList = (
    <Box
      sx={{ width: { xs: 250, md: 700 } }}
      role="presentation"
      onClick={() => setOpenDrawer(false)}
    >
      <List>
        {selectedPlace ? (
          <>
            <ListItem>
              <ListItemText
                sx={listStyle}
                primary={
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{ fontWeight: 600 }}
                  >
                    {`Company Name: ${selectedPlace.data.details.companyName}`}
                  </Typography>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{ fontWeight: 600 }}
                  >
                    {`Address: ${selectedPlace.data.details.address}`}
                  </Typography>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{ fontWeight: 600 }}
                  >
                    {`City: ${selectedPlace.data.details.city}`}
                  </Typography>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{ fontWeight: 600 }}
                  >
                    {`Pincode: ${selectedPlace.data.details.pincode}`}
                  </Typography>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{ fontWeight: 600 }}
                  >
                    {`State: ${selectedPlace.data.details.state}`}
                  </Typography>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{ fontWeight: 600 }}
                  >
                    {`Country: ${selectedPlace.data.details.country}`}
                  </Typography>
                }
              />
            </ListItem>

            <Divider />
            <Box sx={buttonContainer}>
              <Button
                variant="contained"
                sx={{ width: { md: "45%", xs: "85%" } }}
                onClick={handleDelete}
              >
                DELETE
              </Button>
              <Button
                variant="contained"
                onClick={handleEdit}
                sx={{
                  marginTop: { xs: 3, md: 0 },
                  width: { md: "45%", xs: "85%" },
                }}
              >
                EDIT
              </Button>
            </Box>
          </>
        ) : (
          <ListItem>
            <ListItemText primary="Select a place to see details" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "80vh", md: "86vh" },
        width: "calc(100vw - 40px)",
        margin: 2,
      }}
    >
      {header()}
      {mapContainer()}

      <Button
        variant="contained"
        sx={{
          position: "absolute",
          top: { xs: "20%", md: "13%" },
          right: 16,
          zIndex: 1000,
        }}
        onClick={handleLocateMe}
      >
        <MyLocationIcon />
      </Button>

      <AddPlaceModal
        open={open}
        onClose={() => setOpen(false)}
        onUpdatePlace={handleUpdatePlace}
        place={selectedPlace}
        handleClose={() => setOpen(false)}
        apiKey={apiKey}
        fetchPlaces={fetchPlaces}
        placeDetails={selectedPlace ? selectedPlace.data : null}
      />

      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        {DrawerList}
      </Drawer>

      <ToastContainer />
    </Box>
  );
};

export default Map;
