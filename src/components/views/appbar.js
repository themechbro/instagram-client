import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box, Typography } from "@mui/joy";
import Avatar from "@mui/material/Avatar";
import { useSelector, useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { logoutUser } from "../../redux/actions/authActions";

export default function Appbar() {
  const userDetail = useSelector((state) => state.auth.loggedinDetail);
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
            justifyContent: "space-between",
          }}
        >
          <Typography level="title-lg">Instagram</Typography>
          <div className=" w-25 d-flex flex-row justify-content-evenly align-items-center">
            <Avatar>{userDetail?.charAt(0).toUpperCase()}</Avatar>
            <LogoutIcon onClick={handleClick} />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
