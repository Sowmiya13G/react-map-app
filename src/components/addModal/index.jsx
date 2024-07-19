// import CancelIcon from "@mui/icons-material/Cancel";
// import { Box, Button, Modal, Typography } from "@mui/material";
// import axios from "axios";
// import { addDoc, collection } from "firebase/firestore";
// import L from "leaflet";
// import "leaflet-curve";
// import "leaflet/dist/leaflet.css";
// import React from "react";
// import {
//   MapContainer,
//   Marker,
//   TileLayer,
//   Tooltip,
//   useMapEvents,
// } from "react-leaflet";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import pin from "../../assets/location-pin.png";
// import { db } from "../../firebase-config";
// import { TextInput } from "../textInput";

// const initialState = {
//   companyName: "",
//   address: "",
//   city: "",
//   pincode: "",
//   state: "",
//   country: "",
// };

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: { xs: 300, md: 700 },
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 3,
//   borderRadius: 5,
//   height: { xs: "90%", md: 700 },
//   display: "flex",
//   flexDirection: "column",
// };

// const inputBoxStyle = {
//   flex: 1,
//   overflowY: "scroll",
//   marginBottom: 2,
//   "&::-webkit-scrollbar": {
//     display: "none",
//   },
//   scrollbarWidth: "none",
//   scrollbarColor: "transparent transparent",
// };

// const AddPlaceModal = ({ open, onClose, onUpdate, placeDetails, apiKey, fetchPlaces }) => {
//   const [details, setDetails] = React.useState(initialState);
//   const [clickedPosition, setClickedPosition] = React.useState([0, 0]);

//   const [err, setErr] = React.useState(initialState);
//   const [locationDetails, setLocationDetails] = React.useState(null);

//   const mapRef = React.useRef();
//   const customIcon = L.icon({
//     iconUrl: pin,
//     iconSize: [40, 40],
//     iconAnchor: [20, 40],
//     popupAnchor: [0, -40],
//   });
//   React.useEffect(() => {
//     if (placeDetails) {
//       setDetails(placeDetails.details);
//       setClickedPosition(placeDetails.position);
//       if (mapRef.current) {
//         mapRef.current.flyTo(placeDetails.position, 15);
//       }
//     }
//   }, [placeDetails, open]);
//   const handleCloseModal = () => {
//     setDetails(initialState);
//     setErr(initialState);
//     onClose();
//   };

//   const ClickHandler = ({ onClick }) => {
//     const map = useMapEvents({
//       click(e) {
//         onClick(e);
//       },
//     });

//     return null;
//   };

//   const handleAddPlace = async () => {
//     const newErr = {
//       companyName: details.companyName ? "" : "Company name is required",
//       address: details.address ? "" : "Address is required",
//       city: details.city ? "" : "City is required",
//       pincode: details.pincode ? "" : "Pincode is required",
//       state: details.state ? "" : "State is required",
//       country: details.country ? "" : "Country is required",
//     };

//     setErr(newErr);

//     const hasErrors = Object.values(newErr).some((error) => error !== "");
//     if (hasErrors) {
//       return;
//     }

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
//         handleCloseModal()
//         fetchPlaces();
//       } else {
//         toast.error("Location not found");
//       }
//     } catch (error) {
//       console.error("Error adding place to Firestore:", error);
//       toast.error("Error adding place to Firestore");
//     }
//   };

//   const handleSave = () => {
//     if (Object.values(details).some((value) => !value)) {
//       toast.error("Please fill all fields");
//       return;
//     }
//     onUpdate({ ...details, position: clickedPosition });
//   };
//   const handleClick = async (event) => {
//     const { latlng } = event;
//     const { lat, lng } = latlng;
//     console.log("🚀 ~ handleClick ~ lat, lng :", lat, lng);
//     try {
//       const response = await axios.get(
//         `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`
//       );
//       console.log("API response:", response.data);

//       if (response.data && response.data.features.length > 0) {
//         const properties = response.data.features[0].properties;
//         setLocationDetails(properties);

//         setDetails({
//           companyName: "",
//           address: properties.address_line1 || "",
//           city: properties.city || "",
//           pincode: properties.postcode || "",
//           state: properties.state || "",
//           country: properties.country || "",
//         });

//         setClickedPosition([lat, lng]);
//       } else {
//         toast.error("Location details not found");
//       }
//     } catch (error) {
//       console.error("Error fetching location details:", error);
//       toast.error("Error fetching location details");
//     }
//   };
//   return (
//     <Modal
//       open={open}
//       onClose={onClose}
//       aria-labelledby="modal-title"
//       aria-describedby="modal-description"
//     >
//       <Box sx={style}>
//         <CancelIcon
//           onClick={handleCloseModal}
//           sx={{
//             display: "flex",
//             alignSelf: "flex-end",
//             margin: 1,
//           }}
//         />
//       </Box>
//       <Box
//         sx={{
//           position: "relative",
//           width: { xs: "90%", md: "60%" },
//           height: { xs: "90%", md: "80%" },
//           margin: "auto",
//           bgcolor: "background.paper",
//           boxShadow: 24,
//           p: 4,
//           borderRadius: 2,
//         }}
//       >
//         <Box sx={{ height: "300px", width: "100%", marginY: 2 }}>
//           <MapContainer
//             center={clickedPosition}
//             zoom={15}
//             style={{ height: "100%", width: "100%" }}
//             ref={mapRef}
//           >
//             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//             <Marker position={clickedPosition} icon={customIcon} />
//             <ClickHandler onClick={handleClick} />
//           </MapContainer>
//         </Box>
//         <Typography id="modal-title" variant="h6" component="h2">
//           {placeDetails ? "Edit Place" : "Add New Place"}
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
//           onClick={placeDetails? handleSave: handleAddPlace}
//         >
//           {placeDetails ? "Save Changes" : " Add Client"}
//         </Button>
//       </Box>
//     </Modal>
//   );
// };
// export default AddPlaceModal;
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, Button, Modal, Typography } from "@mui/material";
import axios from "axios";
import { addDoc, collection } from "firebase/firestore";
import L from "leaflet";
import "leaflet-curve";
import "leaflet/dist/leaflet.css";
import React from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import pin from "../../assets/location-pin.png";
import { db } from "../../firebase-config";
import { TextInput } from "../textInput";

const initialState = {
  companyName: "",
  address: "",
  city: "",
  pincode: "",
  state: "",
  country: "",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 300, md: 700 },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: 5,
  height: { xs: "90%", md: 700 },
  display: "flex",
  flexDirection: "column",
};

const inputBoxStyle = {
  flex: 1,
  overflowY: "scroll",
  marginBottom: 2,
  "&::-webkit-scrollbar": {
    display: "none",
  },
  scrollbarWidth: "none",
  scrollbarColor: "transparent transparent",
};

const AddPlaceModal = ({ open, onClose, onUpdate, placeDetails, apiKey, fetchPlaces }) => {
  const [details, setDetails] = React.useState(initialState);
  const [clickedPosition, setClickedPosition] = React.useState([0, 0]);
  const [err, setErr] = React.useState(initialState);
  const [locationDetails, setLocationDetails] = React.useState(null);

  const mapRef = React.useRef();
  const customIcon = L.icon({
    iconUrl: pin,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  React.useEffect(() => {
    if (placeDetails) {
      setDetails(placeDetails.details);
      setClickedPosition(placeDetails.position);
      if (mapRef.current) {
        mapRef.current.flyTo(placeDetails.position, 15);
      }
    }
  }, [placeDetails, open]);

  const handleCloseModal = () => {
    setDetails(initialState);
    setErr(initialState);
    onClose();
  };

  const ClickHandler = ({ onClick }) => {
    useMapEvents({
      click(e) {
        onClick(e);
      },
    });
    return null;
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
        handleCloseModal();
        fetchPlaces();
      } else {
        toast.error("Location not found");
      }
    } catch (error) {
      console.error("Error adding place to Firestore:", error);
      toast.error("Error adding place to Firestore");
    }
  };

  const handleSave = async () => {
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
      const newPosition = clickedPosition;

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

      toast.success("Client Updated");
      handleCloseModal();
      fetchPlaces();
    } catch (error) {
      console.error("Error updating place to Firestore:", error);
      toast.error("Error updating place to Firestore");
    }
  };

  const handleClick = async (event) => {
    const { latlng } = event;
    const { lat, lng } = latlng;
    try {
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`
      );

      if (response.data && response.data.features.length > 0) {
        const properties = response.data.features[0].properties;
        setLocationDetails(properties);

        setDetails({
          companyName: "",
          address: properties.address_line1 || "",
          city: properties.city || "",
          pincode: properties.postcode || "",
          state: properties.state || "",
          country: properties.country || "",
        });

        setClickedPosition([lat, lng]);
      } else {
        toast.error("Location details not found");
      }
    } catch (error) {
      console.error("Error fetching location details:", error);
      toast.error("Error fetching location details");
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <CancelIcon
          onClick={handleCloseModal}
          sx={{
            display: "flex",
            alignSelf: "flex-end",
            margin: 1,
          }}
        />
        {/* <Box
          sx={{
            position: "relative",
            width: { xs: "90%", md: "60%" },
            height: { xs: "90%", md: "80%" },
            margin: "auto",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        > */}
          <Box sx={{ height: "300px", width: "100%", marginY: 2 }}>
            <MapContainer
              center={clickedPosition}
              zoom={15}
              style={{ height: "100%", width: "100%" }}
              ref={mapRef}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={clickedPosition} icon={customIcon} />
              <ClickHandler onClick={handleClick} />
            </MapContainer>
          </Box>
          <Typography id="modal-title" variant="h6" component="h2" sx={{ marginTop: 2, marginBottom:2 }}>
            {placeDetails ? "Edit Place" : "Add New Place"}
          </Typography>
          <Box sx={inputBoxStyle}>
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
          </Box>

          <Button
            sx={{
              color: "#fff",
              backgroundColor: "#0F67B1",
              padding: 2,
              mt: 3,
              width: "100%",
            }}
            variant="contained"
            onClick={placeDetails ? handleSave : handleAddPlace}
          >
            {placeDetails ? "Save Changes" : " Add Client"}
          </Button>
        {/* </Box> */}
      </Box>
    </Modal>
  );
};
export default AddPlaceModal;
