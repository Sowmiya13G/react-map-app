import Map from "./pages/map";
import "./App.css";
function App() {
  return (
    <div className="App">
      <Map />
    </div>
  );
}

export default App;
{
  /* <TextField
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
        /> */
}