import Analysis from "./pages/Analysis";
import Home from "./pages/Home";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#ffff00",
    },
    // secondary: "#ffff00",
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/analysis" element={<Analysis />} />
          </Routes>
          <ToastContainer />
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
