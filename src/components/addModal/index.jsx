import React, { useEffect } from "react";

// MUI imports
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";

// other packages
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// firebase
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase-config";

// leaf let
import L from "leaflet";
import "leaflet-curve";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

// components
import { TextInput } from "../textInput";
// assets
import pin from "../../assets/pinLogo.png";

// initial state
const initialState = {
  companyName: "",
  address: "",
  city: "",
  pincode: "",
  state: "",
  country: "",
  link: "",
};

// styles
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "70vw", md: "33vw" },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: { xs: 2, md: 3 },
  borderRadius: 5,
  height: { xs: "80vh", md: "80vh" },
  display: "flex",
  flexDirection: "column",
};

const inputBoxStyle = {
  flex: 1,
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  scrollbarWidth: "none",
  scrollbarColor: "transparent transparent",
};

// custom icon
const customIcon = L.icon({
  iconUrl: pin,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// sample position
const samplePosition = [21.642491280846862, 78.83925616878989];

const AddPlaceModal = ({ open, onClose, placeDetails, apiKey }) => {
  // local states
  const [details, setDetails] = React.useState(initialState);
  const [clickedPosition, setClickedPosition] = React.useState(
    placeDetails?.position
  );
  const [err, setErr] = React.useState(initialState);
  const [locationDetails, setLocationDetails] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  // use ref
  const mapPositionRef = React.useRef();

  // use effects
  React.useEffect(() => {
    console.log(placeDetails);

    if (placeDetails) {
      setDetails(placeDetails.details);
      setClickedPosition(placeDetails.position);
      if (mapPositionRef.current) {
        mapPositionRef.current.setView(placeDetails.position, 15);
      }
    } else {
      setDetails(initialState);
    }
  }, [placeDetails, open]);

  // ------------------------------ Functionalities ------------------------------------

  const ClickHandler = ({ onClick }) => {
    useMapEvents({
      click(e) {
        onClick(e);
      },
    });
    return null;
  };

  const handleResetFields = () => {
    setDetails(initialState);
    setErr(initialState);
    setTimeout(() => {
      onClose();
    }, 100);
  };
  // add place
  const handleAddPlace = async () => {
    const newErr = {
      companyName: details.companyName ? "" : "Company name is required",
      address: details.address ? "" : "Address is required",
      link: details.link ? "" : "Map Link is required",
    };

    setErr(newErr);

    const hasErrors = Object.values(newErr).some((error) => error !== "");
    if (hasErrors) {
      return;
    }
    setLoading(true);
    try {
      const newPosition = clickedPosition;
      await addDoc(collection(db, "places"), {
        details: {
          companyName: details?.companyName,
          address: details?.address,
          link: details?.link,
        },
        position: newPosition,
      });

      toast.success("Client Added");
      handleResetFields();
    } catch (error) {
      console.error("Error adding place to Firestore:", error);
      toast.error("Error adding place to Firestore");
      handleResetFields();
    } finally {
      setLoading(false);
    }
  };

  // save changes
  const handleSave = async () => {
    const newErr = {
      companyName: details.companyName ? "" : "Company name is required",
      address: details.address ? "" : "Address is required",
      link: details.link ? "" : "Map Link is required",
    };

    setErr(newErr);

    const hasErrors = Object.values(newErr).some((error) => error !== "");
    if (hasErrors) {
      return;
    }
    setLoading(true);
    try {
      const newPosition = clickedPosition;

      const querySnapshot = await getDocs(collection(db, "places"));
      let docId = null;

      querySnapshot.forEach((doc) => {
        if (doc.data().details.companyName === details.companyName) {
          docId = doc.id;
        }
      });

      if (docId) {
        await updateDoc(doc(db, "places", docId), {
          details: {
            companyName: details.companyName,
            address: details.address,

            link: details?.link,
          },
          position: newPosition,
        });

        toast.success("Client Updated");
        // fetchPlaces();
        handleResetFields();
      } else {
        toast.error("Document not found for the given company name");
      }
    } catch (error) {
      console.error("Error updating place in Firestore:", error);
      toast.error("Error updating place in Firestore");
      handleResetFields();
    } finally {
      setLoading(false);
    }
  };

  // fetch details while
  const handleClick = async (event) => {
    const { latlng } = event;
    const { lat, lng } = latlng;
    console.log(latlng);
    try {
      // placeDetails
      //   ? setDetails((prevDetails) => ({
      //       companyName: placeDetails ? prevDetails.companyName : "",
      //       link: placeDetails ? prevDetails.link : "",
      //     }))
      //   : setDetails({
      //       companyName: "",
      //       address: "",
      //       link: "",
      //     });

      setClickedPosition([lat, lng]);
    } catch (error) {
      console.error("Error fetching location details:", error);
      toast.error("Error fetching location details");
    }
  };
  useEffect(() => {
    const url = details.link;
    const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    const match = url.match(regex);

    if (match) {
      const latitude = match[1];
      const longitude = match[2];
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      setClickedPosition([latitude, longitude]);
    }
  }, [details]);

  return (
    <Modal
      open={open}
      onClose={() => handleResetFields()}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <CancelIcon
          onClick={() => {
            handleResetFields();
          }}
          sx={{
            display: "flex",
            alignSelf: "flex-end",
            margin: 1,
            fontSize: { xs: 25, md: 30 },
          }}
        />

        <Box sx={inputBoxStyle}>
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            sx={{
              marginBottom: { xs: 1, md: 2 },
              fontSize: { xs: "18px", md: "20px" },
              fontWeight: "bold",
            }}
          >
            {placeDetails ? "Edit Place" : "Add New Place"}
          </Typography>
          <Box
            sx={{
              height: { xs: "50%", md: "50%" },
              width: "100%",
              marginY: { xs: 1, md: 2 },
            }}
          >
            <MapContainer
              center={clickedPosition || samplePosition}
              zoom={10}
              style={{ height: "100%", width: "100%" }}
              ref={mapPositionRef}
            >
              <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

              {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
              <Marker
                position={clickedPosition || samplePosition}
                icon={customIcon}
              />
              <ClickHandler onClick={handleClick} />
            </MapContainer>
          </Box>

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
          {/* 
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
          /> */}
          <TextInput
            label="Map Link"
            name="link"
            value={details.link}
            onChange={(e) => setDetails({ ...details, link: e.target.value })}
          />
        </Box>

        <Button
          sx={{
            color: "#fff",
            backgroundColor: "#0F67B1",
            padding: { xs: 2, md: 1 },
            mt: { xs: 1, md: 3 },
            width: "100%",
            height: { xs: "45px", md: "50px" },
            fontSize: { xs: "13px", md: "15px" },
            fontWeight: "bold",
          }}
          variant="contained"
          onClick={() => {
            placeDetails ? handleSave() : handleAddPlace();
          }}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} />
          ) : placeDetails ? (
            "Save Changes"
          ) : (
            "Add Client"
          )}
        </Button>
      </Box>
    </Modal>
  );
};
export default AddPlaceModal;
