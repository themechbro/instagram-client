import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box, Typography } from "@mui/joy";
import Avatar from "@mui/material/Avatar";
import { useSelector, useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { logoutUser } from "../../redux/actions/authActions";
import { useMediaQuery } from "@mui/material";

export default function Appbar() {
  const userDetail = useSelector((state) => state.auth.loggedinDetail);
  const tablet768px = useMediaQuery("(min-width: 800px)");

  const mobile = useMediaQuery("(min-width: 425px)");
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logoutUser());
  };
  return (
    <div className="appbar">
      <AppBar>
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
          <Typography
            level="title-lg"
            sx={{
              fontSize: mobile ? "18px" : tablet768px ? "20px" : "24px",
            }}
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

            <LogoutIcon
              onClick={handleClick}
              sx={{
                fontSize: mobile ? "18px" : tablet768px ? "20px" : "24px",
              }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
