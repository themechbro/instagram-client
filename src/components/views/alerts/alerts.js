import Alert from "@mui/joy/Alert";
import Typography from "@mui/joy/Typography";
import { useSelector } from "react-redux";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import IconButton from "@mui/joy/IconButton";
import React, { useState } from "react";

export default function Alerts() {
  const [open, setOpen] = React.useState(true);
  const userDetail = useSelector((state) => state.auth.loggedinDetail);
  const color = "success";
  const handleClick = () => {
    setOpen(false);
  };

  const sx = () => {
    if (open === true) {
      return {
        display: "block",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      };
    } else {
      return { display: "none" };
    }
  };

  return (
    <div>
      <Alert
        color={color}
        endDecorator={
          <IconButton variant="soft" color={color} onClick={handleClick}>
            <CloseRoundedIcon />
          </IconButton>
        }
        sx={sx}
      >
        <Typography level="title-lg">Welcome back {userDetail}!</Typography>
      </Alert>
    </div>
  );
}
