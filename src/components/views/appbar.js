import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Typography, Link } from "@mui/joy";
import Avatar from "@mui/material/Avatar";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "@mui/material";
import Sidebar from "./sidebar/sidebar";
export default function Appbar() {
  const userDetail = useSelector((state) => state.auth.user.username);
  const tablet768px = useMediaQuery("(min-width: 800px)");
  const mobile = useMediaQuery("(min-width: 425px)");
  const isDarkMode = useSelector((state) => state.auth.isDarkMode);

  return (
    <div className="appbar">
      <AppBar
        sx={{
          backgroundColor: isDarkMode
            ? "rgb(18, 18, 18)"
            : "rgb(255, 255, 255)", // Semi-transparent white
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            width: mobile ? "100%" : tablet768px ? "100%" : "100%",
            justifyContent: mobile
              ? "space-around"
              : tablet768px
              ? "space-around"
              : "space-evenly",
          }}
        >
          <Sidebar />
          <Typography
            level="title-lg"
            sx={{
              fontSize: mobile ? "18px" : tablet768px ? "25px" : "30px",
              fontFamily: '"Grey Qo", cursive',
              color: isDarkMode ? "#FFF" : "#242424",
              fontWeight: "bold",
            }}
            component={Link}
            href="/home"
            underline="none"
          >
            Instagram
          </Typography>
          <div
            sx={{
              width: mobile ? "30%" : tablet768px ? "25%" : "20%",
            }}
            className=" w-25 d-flex flex-row justify-content-evenly align-items-center"
          >
            <Avatar
              sx={{
                width: mobile ? 30 : tablet768px ? 35 : 40,
                height: mobile ? 30 : tablet768px ? 35 : 40,
              }}
            >
              {userDetail?.charAt(0).toUpperCase()}
            </Avatar>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
