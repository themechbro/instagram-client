import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import { Button, Link } from "@mui/joy";
import Drawer from "@mui/joy/Drawer";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import ModalClose from "@mui/joy/ModalClose";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import CreatePost from "../create/createPost";
import { useSelector, useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { logoutUser, toggleDarkMode } from "../../../redux/actions/authActions";
import { useMediaQuery } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Switch from "@mui/joy/Switch";

export default function Sidebar() {
  const tablet768px = useMediaQuery("(max-width: 768px)");
  const mobile = useMediaQuery("(max-width: 425px)");
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [createPostOpen, setCreatePostOpen] = React.useState(false);
  const user = useSelector((state) => state.auth.user);
  const [checked, setChecked] = React.useState(false);
  const isDarkMode = useSelector((state) => state.auth.isDarkMode);

  const handleClick = () => {
    dispatch(logoutUser());
    dispatch(toggleDarkMode(false));
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
    dispatch(toggleDarkMode(!isDarkMode));
  };

  return (
    <React.Fragment>
      <Button variant="plain" color="neutral" onClick={() => setOpen(true)}>
        <MenuIcon />
      </Button>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: isDarkMode ? "black" : "#FFF",
            color: "white", // Set text color to white for better visibility
            width: 300, // Adjust width of the Drawer if necessary
          },
        }}
      >
        <ModalClose />
        <DialogTitle
          sx={{
            fontFamily: '"Grey Qo", cursive',
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "2rem",
          }}
          component={Link}
          href="/home"
          underline="none"
        >
          Instagram
        </DialogTitle>
        <DialogContent>
          <List>
            <ListItem sx={{ padding: 3 }}>
              <ListItemButton component={Link} href="/home" underline="none">
                <HomeIcon />
                Home
              </ListItemButton>
            </ListItem>
            <ListItem sx={{ padding: 3 }}>
              <ListItemButton component={Link} href="/search" underline="none">
                <SearchIcon />
                Search
              </ListItemButton>
            </ListItem>
            <ListItem sx={{ padding: 3 }}>
              <ListItemButton
                component={Link}
                href="/messages"
                underline="none"
              >
                <ChatBubbleIcon />
                Messages
              </ListItemButton>
            </ListItem>
            <ListItem sx={{ padding: 3 }}>
              <ListItemButton
                component={Link}
                href="/notifications"
                underline="none"
              >
                <NotificationsIcon />
                Notifications
              </ListItemButton>
            </ListItem>
            <ListItem sx={{ padding: 3 }}>
              <ListItemButton
                component={Link}
                underline="none"
                onClick={() => setCreatePostOpen(true)}
              >
                <AddBoxOutlinedIcon />
                Create
              </ListItemButton>
            </ListItem>
          </List>
        </DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: mobile ? "column" : tablet768px ? "column" : "row",
            gap: 1,
            p: 1.5,
            pb: 2,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItem: "flex-end",
              padding: 1,
            }}
          >
            <Avatar size="lg">{user.username.charAt(0).toUpperCase()}</Avatar>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Typography level="title-md">{user.username}</Typography>
            <Typography level="body-sm">{user.email}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItem: "center",
              padding: 2,
              width: "50%",
            }}
          >
            <LogoutIcon
              onClick={handleClick}
              sx={{
                // fontSize: mobile ? "18px" : tablet768px ? "20px" : "24px",
                fontSize: "2rem",
                cursor: "pointer",
                color: "#242424",
                marginTop: 2,
              }}
            />

            <Switch
              sx={{
                "--Switch-trackRadius": "21px",
                "--Switch-trackWidth": "48px",
                "--Switch-trackHeight": "20px",
                padding: 2,
              }}
              checked={checked}
              onChange={handleChange}
              startDecorator={checked ? <DarkModeIcon /> : <LightModeIcon />}
            />
          </Box>
        </Box>
      </Drawer>

      {/* CreatePost Modal */}
      <CreatePost open={createPostOpen} setOpen={setCreatePostOpen} />
    </React.Fragment>
  );
}
