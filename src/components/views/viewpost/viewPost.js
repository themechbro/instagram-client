import * as React from "react";
import { useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import ViewPostCard from "./viewPostCard";
import CommentSection from "./commentSection";
import { useMediaQuery } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

export default function ViewPostModal({ open, setOpen }) {
  const tablet768px = useMediaQuery("(max-width: 800px)");
  const mobile = useMediaQuery("(max-width: 425px)");
  const isDarkMode = useSelector((state) => state.auth.isDarkMode);
  console.log(isDarkMode);
  const modalStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px", // Rounded corners
    outline: "none", // Remove default outline
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog
        layout="center"
        sx={{ backgroundColor: isDarkMode ? "black" : "#FFF" }}
      >
        <ModalClose onClick={() => setOpen(false)} />
        <Box
          sx={{
            display: "flex",
            flexDirection: mobile ? "column" : tablet768px ? "row" : "row",
            justifyContent: "space-evenly",
            padding: 5,

            backgroundColor: isDarkMode ? "black" : "#FFF",
          }}
        >
          <ViewPostCard />
          <CommentSection />
        </Box>
      </ModalDialog>
    </Modal>
  );
}
