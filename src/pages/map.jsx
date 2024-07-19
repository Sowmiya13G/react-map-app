import MyLocationIcon from "@mui/icons-material/MyLocation";
import { Box, Button, TextField } from "@mui/material";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import L from "leaflet";
import "leaflet-curve";
import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import pin from "../assets/location-pin.png";
import AddPlaceModal from "../components/addModal";
import { db } from "../firebase-config";

const apiKey = "37b4cf9407c146caa22bf64efcc6ed65";

const customIcon = L.icon({
  iconUrl: pin,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const Map = () => {
  const mapRef = React.useRef();
  const [position, setPosition] = React.useState([
    42.188779600000004, -71.45369788783867,
  ]);
  const [locationDetails, setLocationDetails] = React.useState(null);
  const [searchText, setSearchText] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [places, setPlaces] = React.useState([]);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [selectedPlace, setSelectedPlace] = React.useState(null);
  const [placeDetails, setPlaceDetails] = React.useState(null);
  React.useEffect(() => {
    fetchLocationDetails(position[0], position[1]);
    fetchPlaces();
  }, [position]);

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

  const DrawerList = (
    <Box
      sx={{ width: { xs: 250, md: 500 } }}
      role="presentation"
      onClick={() => setOpenDrawer(false)}
    >
      <List>
        {selectedPlace ? (
          <>
            <ListItem>
              <ListItemText
                primary={`Company Name: ${selectedPlace.data.details.companyName}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`Address: ${selectedPlace.data.details.address}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`City: ${selectedPlace.data.details.city}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`Pincode: ${selectedPlace.data.details.pincode}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`State: ${selectedPlace.data.details.state}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`Country: ${selectedPlace.data.details.country}`}
              />
            </ListItem>

            <Divider />
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                padding: 3,
                alignItems: { md: "center" },
                width: "90%",
                justifyContent: { md: "space-between" },
              }}
            >
              <Button
                variant="contained"
                sx={{ width: { md: "45%" } }}
                onClick={handleDelete}
              >
                DELETE
              </Button>
              <Button
                variant="contained"
                onClick={handleEdit}
                sx={{ marginTop: { xs: 3, md: 0 }, width: { md: "45%" } }}
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
        height: { xs: 750, md: 1050 },
        width: "calc(100vw - 40px)",
        margin: 2,
      }}
    >
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
            if (e.key === "Enter") handleSearch();
          }}
        />
        <Button
          sx={{
            color: "#fff",
            backgroundColor: "#0F67B1",
            padding: 2,
            width: { xs: "100%", md: "18%" },
            fontWeight: "bold",
          }}
          variant="contained"
          onClick={() => setOpen(true)}
        >
          ADD NEW CLIENT
        </Button>
      </Box>

      <MapContainer
        ref={mapRef}
        center={position}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
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

      <Button
        variant="contained"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        onClick={handleLocateMe}
        startIcon={<MyLocationIcon />}
      >
        Locate Me
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
