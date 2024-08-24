import * as React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Typography, Box } from "@mui/joy";

export default function Loading() {
  return (
    <div className="container mt-5">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <InstagramIcon
          sx={{
            fontSize: "20rem",
            color: "#f09433",
            fill: "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        />
        <Typography
          level="title-lg"
          sx={{
            color: "#000",
          }}
        >
          Made By Adrin
        </Typography>
      </Box>
    </div>
  );
}
