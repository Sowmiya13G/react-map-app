import React from "react";

// MUI imports
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// other packages
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Draggable from "react-draggable";
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
import dbLogo from "../assets/dbLogo.png";
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
const samplePosition = [13.0234298, 80.2085125];

const Map = () => {
  // local states
  const [position, setPosition] = React.useState(samplePosition);
  const [locationDetails, setLocationDetails] = React.useState(null);
  const [searchText, setSearchText] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [places, setPlaces] = React.useState([]);
  const [selectedPlace, setSelectedPlace] = React.useState(null);
  console.log(selectedPlace);
  const [placeDetails, setPlaceDetails] = React.useState(null);
  const [showOnboarding, setShowOnboarding] = React.useState(true);
  const [modal, setModal] = React.useState(true);
  const [detailsModalOpen, setDetailsModalOpen] = React.useState(false);
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
    }, 30000);
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
  // delete added place
  const handleDelete = async () => {
    if (!selectedPlace) {
      toast.error("No place selected");
      return;
    }

    try {
      await deleteDoc(doc(db, "places", selectedPlace.id));
      fetchPlaces();
      setDetailsModalOpen(false);
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

    setDetailsModalOpen(false);
    setOpen(true);

    const { position } = selectedPlace.data;
    setPosition(position);

    if (mapRef.current) {
      mapRef.current.flyTo(position, 15);
    }

    setPlaceDetails(selectedPlace.data);
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
    flexDirection: { xs: "column" },
    justifyContent: { md: "flex-end" },
    gap: 2,
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
            width: "145px",
            height: "50px",
            objectFit:"contain"
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
          onClick={() => {
            setOpen(true);
          }}
        >
          ADD NEW CLIENT
        </Button>
      </Box>
    );
  };
  const apiKey = "37b4cf9407c146caa22bf64efcc6ed65";

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
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
        {/* <TileLayer url="https://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png" /> */}
        {/* <TileLayer
          url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${apiKey}`}
        /> */}
        <MarkerClusterGroup>
          {places.map((place) => (
            <Marker
              key={place.id}
              position={place.data.position}
              icon={customIcon}
              eventHandlers={{
                click: () => {
                  setSelectedPlace(place);
                  setDetailsModalOpen(true);
                },
              }}
            >
              <Tooltip direction="top" offset={[0, -35]} opacity={1} permanent>
                {place.data.details.companyName}
              </Tooltip>
            </Marker>
          ))}
          {/* <Marker position={position} icon={customIcon} /> */}
        </MarkerClusterGroup>
      </MapContainer>
    );
  };

  // render location details
  const renderLocationDetails = () => {
    if (!selectedPlace) return null;
    const { companyName, address, country, state, city, pincode, link } =
      selectedPlace?.data?.details;
    return (
      <List
        sx={{
          width: "90%",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              ...listStyle,
              ...boldStyle,
            }}
          >
            {companyName}
          </Typography>
          <Box onClick={() => setDetailsModalOpen(false)}>
            <CancelIcon />
          </Box>
        </Box>
        <Divider />

        <Box
          sx={{ display: "flex", alignItems: "start", flexDirection: "column" }}
        >
          <Typography sx={{ padding: 1 }}>
            <span style={semiBoldStyle}>Address:</span> {address}
          </Typography>
          <Typography sx={{ padding: 1 }}>
            <span style={semiBoldStyle}>City:</span> {city}
          </Typography>
          <Typography sx={{ padding: 1 }}>
            <span style={semiBoldStyle}>Pin Code:</span> {pincode}
          </Typography>
          <Typography sx={{ padding: 1 }}>
            <span style={semiBoldStyle}>State:</span> {state}
          </Typography>
          <Typography sx={{ padding: 1 }}>
            <span style={semiBoldStyle}>Country:</span> {country}
          </Typography>
          <Typography sx={{ padding: 1, display: "flex", flexWrap: "wrap" }}>
            <span style={semiBoldStyle}>Link:</span>{" "}
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "blue" }}
            >
              {link}
            </a>
          </Typography>
        </Box>

        <Box sx={{ position: "absolute", right: 0, top: "18%" }}>
          <Box sx={buttonContainer}>
            <Box onClick={handleEdit}>
              <EditLocationAltIcon />
            </Box>
            <Box onClick={handleDelete}>
              <DeleteIcon />
            </Box>
          </Box>
        </Box>
      </List>
    );
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "100vh", md: "90vh" },
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
          onClose={() => {
            setOpen(false);
            setSelectedPlace(null);
          }}
          apiKey={apiKey}
          fetchPlaces={fetchPlaces}
          placeDetails={selectedPlace ? selectedPlace.data : null}
        />
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
          backgroundColor: "transparent",
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

      {Boolean(detailsModalOpen) && (
        <Draggable>
          <Box
            sx={{
              width: { md: "25%" },
              backgroundColor: "#fff",
              borderTopRightRadius: 50,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              boxShadow: 10,
              position: "absolute",
              bottom: "10%",
              right: "10%",
              p: 1,
              zIndex: 3000,
            }}
          >
            {renderLocationDetails()}
          </Box>
        </Draggable>
      )}
    </Box>
  );
};

export default Map;
