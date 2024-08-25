import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import CommentSection from "./commentSection";

const drawerBleeding = 56;

export default function MobileDrawer({ open, setOpen }) {
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      swipeAreaWidth={drawerBleeding}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <CommentSection />
    </SwipeableDrawer>
  );
}
