import React from "react";

// MUI imports
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { Box, Button, Modal, Typography } from "@mui/material";
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
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
// components
import AddPlaceModal from "../components/addModal";
import MarkerClusterGroup from "../components/clusterGroup";
import Onboarding from "../components/onboarding";

// assets
import pin from "../assets/location-pin.png";
import dbLogo from "../assets/dbLogo.png";
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
  const [showOnboarding, setShowOnboarding] = React.useState(true);
  const [modal, setModal] = React.useState(true);
  // use ref
  const mapRef = React.useRef();

  // use effects
  React.useEffect(() => {
    fetchLocationDetails(position[0], position[1]);
    fetchPlaces();
  }, [position]);

  React.useEffect(() => {
    setTimeout(() => {
      setModal(false);
    }, 3000);
  }, []);
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

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
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
        <img
          src={dbLogo}
          alt="Logo"
          style={{
            width: "15%",
            height: 50,
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
            alignSelf: "end",
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
        <MarkerClusterGroup>
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
        </MarkerClusterGroup>
      </MapContainer>
    );
  };

  const DrawerList = (
    <Box
      sx={{ width: { xs: 250, md: 650 } }}
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
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: "18px", md: "20px" },
                    }}
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
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: "18px", md: "20px" },
                    }}
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
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: "18px", md: "20px" },
                    }}
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
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: "18px", md: "20px" },
                    }}
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
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: "18px", md: "20px" },
                    }}
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
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: "18px", md: "20px" },
                    }}
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
        height: { xs: "100vh", md: "100vh" },
        width: "calc(100vw - 40px)",
      }}
    >
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

      <Modal
        open={modal}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#ffffff30" ,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1300,
          width: "100vw",
          height: "100vh",
        }}
      >
        <Onboarding onComplete={handleOnboardingComplete} />
      </Modal>
    </Box>
  );
};

export default Map;
