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
import { useSelector } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

export default function Sidebar() {
  const [open, setOpen] = React.useState(false);
  const user = useSelector((state) => state.auth.user);
  const ListItems = ["Home", "Search", "Messages", "Notifications", "Create"];
  const icons = [
    <HomeIcon />,
    <SearchIcon />,
    <ChatBubbleIcon />,
    <NotificationsIcon />,
    <AddBoxOutlinedIcon />,
  ];
  const linkAdress = [
    "/home",
    "/search",
    "./messages",
    "/notifications",
    "/upload",
  ];

  return (
    <React.Fragment>
      <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        <MenuIcon />
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)} color="dark">
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
        >
          Instagram
        </DialogTitle>
        <DialogContent>
          <List>
            {ListItems.map((item, index) => (
              <ListItem
                component={Button}
                sx={{ backgroundColor: "#FFF", padding: 5 }}
                startDecorator={icons[index]}
              >
                <ListItemButton
                  onClick={() => setOpen(false)}
                  component={Link}
                  href={linkAdress[index]}
                  underline="none"
                >
                  {item}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            p: 1.5,
            pb: 2,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Avatar size="lg" />
          <div>
            <Typography level="title-md">{user.username}</Typography>
            <Typography level="body-sm">{user.email}</Typography>
          </div>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}

// import * as React from "react";
// import Avatar from "@mui/joy/Avatar";
// import Box from "@mui/joy/Box";
// import { Button } from "@mui/joy";
// import Drawer from "@mui/joy/Drawer";
// import DialogTitle from "@mui/joy/DialogTitle";
// import DialogContent from "@mui/joy/DialogContent";
// import List from "@mui/joy/List";
// import ListItem from "@mui/joy/ListItem";
// import ListItemButton from "@mui/joy/ListItemButton";
// import Typography from "@mui/joy/Typography";
// import ModalClose from "@mui/joy/ModalClose";
// import MenuIcon from "@mui/icons-material/Menu";
// import { useSelector } from "react-redux";
// import HomeIcon from "@mui/icons-material/Home";
// import SearchIcon from "@mui/icons-material/Search";
// import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

// export default function Sidebar() {
//   const [open, setOpen] = React.useState(false);
//   const user = useSelector((state) => state.auth.user);
//   const ListItems = ["Home", "Search", "Messages", "Notifications", "Create"];
//   const icons = [
//     <HomeIcon />,
//     <SearchIcon />,
//     <ChatBubbleIcon />,
//     <NotificationsIcon />,
//     <AddBoxOutlinedIcon />,
//   ];

//   return (
//     <React.Fragment>
//       <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
//         <MenuIcon />
//       </Button>
//       <Drawer open={open} onClose={() => setOpen(false)} color="dark">
//         <ModalClose />
//         <DialogTitle
//           sx={{
//             fontFamily: '"Grey Qo", cursive',
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             fontSize: "2rem",
//           }}
//         >
//           Instagram
//         </DialogTitle>
//         <DialogContent>
//           <List>
//             {ListItems.map((i) => {
//               return icons.map((j) => {
//                 return (
//                   <ListItem
//                     component={Button}
//                     sx={{ backgroundColor: "#FFF" }}
//                     startDecorator={j}
//                   >
//                     <ListItemButton onClick={() => setOpen(false)}>
//                       {i}
//                     </ListItemButton>
//                   </ListItem>
//                 );
//               });
//             })}
//           </List>
//         </DialogContent>
//         <Box
//           sx={{
//             display: "flex",
//             gap: 1,
//             p: 1.5,
//             pb: 2,
//             borderTop: "1px solid",
//             borderColor: "divider",
//           }}
//         >
//           <Avatar size="lg" />
//           <div>
//             <Typography level="title-md">{user.username}</Typography>
//             <Typography level="body-sm">{user.email}</Typography>
//           </div>
//         </Box>
//       </Drawer>
//     </React.Fragment>
//   );
// }
