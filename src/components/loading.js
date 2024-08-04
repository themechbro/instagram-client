import * as React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Typography } from "@mui/joy";

export default function Loading() {
  return (
    <div className="container mt-5">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Typography level="h1">Loading Instagram</Typography>
        <InstagramIcon sx={{ fontSize: "20rem" }} />
      </div>
    </div>
  );
}
