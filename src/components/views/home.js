import { Typography, Box } from "@mui/joy";
import * as React from "react";
import { useSelector } from "react-redux";
import Appbar from "./appbar";
import Post from "./post";
import Alerts from "./alerts/alerts";

export default function Home() {
  
  return (
    <div>
      <Appbar />
      <div className="container p-5 mt-5">
        <Alerts />
        <Box
          sx={{
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            paddingTop: 10,
          }}
        >
          <Post />
        </Box>
      </div>
    </div>
  );
}
