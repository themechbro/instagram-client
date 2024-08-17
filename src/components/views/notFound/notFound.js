import * as React from "react";
import { Box, Typography, Link } from "@mui/joy";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import { useMediaQuery } from "@mui/material";

export default function NotFound() {
  const tablet768px = useMediaQuery("(max-width: 800px)");
  const mobile = useMediaQuery("(max-width: 425px)");

  return (
    <div className="container">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30,
          padding: 3,
        }}
      >
        <Typography sx={{ color: "red" }}>
          <ErrorOutlinedIcon sx={{ fontSize: "4rem" }} />
        </Typography>
        <Typography
          level={mobile ? "title-lg" : tablet768px ? "h3" : "h1"}
          sx={{ marginBottom: 5 }}
        >
          Sorry, this page isn't available.
        </Typography>
        <Typography level={mobile ? "body-lg" : tablet768px ? "h6" : "h3"}>
          The link you followed may be broken, or the page may have been
          removed. <Link href="/home">Go back to Instagram.</Link>
        </Typography>
      </Box>
    </div>
  );
}
