import { Typography } from "@mui/joy";
import * as React from "react";
import { useSelector } from "react-redux";
import Appbar from "./appbar";

export default function Home() {
  const userDetail = useSelector((state) => state.auth.loggedinDetail);
  return (
    <div>
      <Appbar />
      <div className="container p-5 mt-5 bg-dark">
        <Typography sx={{ color: "#FFF" }}>Welcome {userDetail}</Typography>
      </div>
    </div>
  );
}
