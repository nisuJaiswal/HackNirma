import React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../components/Header.jsx";
import Dropzone from "react-dropzone";
import { Box, Stack, Typography } from "@mui/material";
import { TypeAnimation } from "react-type-animation";

const Home = () => {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "20ch",
        "&:focus": {
          width: "40ch",
        },
      },
    },
  }));
  return (
    <>
      <Header />
      <Box
        sx={{
          width: "100%",
          minHeight: "90vh",
          // height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            sx={{ borderRadius: 2, paddingLeft: 0 }}
            style={{ border: "2px solid black" }}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search> */}
        <Box
          sx={{
            width: "80%",
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            style={{
              flex: ".5",
            }}
            p={4}
            gap={3}
          >
            <Typography variant="h3" style={{ color: "blueviolet" }}>
              No more troubles of 
            </Typography>
            <Typography variant="h2">
              <TypeAnimation
                sequence={[
                  "NDA Contracts",
                  1000,
                  "Case Studies",
                  1000,
                  "Research Papers",
                  500,
                ]}
                speed={50}
                style={{ fontSize: 30, fontWeight: "semibold" }}
                repeat={Infinity}
              />
            </Typography>
            {/* <Typography variant="h5">Say goodbye to PDF overwhelm</Typography> */}

            <Typography variant="caption" style={{ fontSize: 15 }}>
              Tired of slogging through long NDAs and research papers? Our tool
              saves you from that snooze-fest by helping you find answers
              lightning fast. No more late-night cram sessions, just efficient
              studying for even the laziest of students.
            </Typography>
          </Stack>
          {/* <img style={{ flex: '.5' }} src="/image.svg" width={"400px"} height={"400px"} /> */}
          <img
            style={{ flex: ".5", objectFit: "cover" }}
            src="/3.jpg"
            width={"400px"}
            height={"400px"}
          />
        </Box>
      </Box>
    </>
  );
};

export default Home;

// With our app, you can upload any PDF and receive a concise summary of the content, as well as accurate answers to any questions you may have about the material.
