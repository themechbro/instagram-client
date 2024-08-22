import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Typography from "@mui/joy/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Button } from "@mui/joy";

export default function Suggestions() {
  const [users, setUsers] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const limit = 4;
  const currentUserId = useSelector((state) => state.auth.user._id); // Adjust to your state structure

  const fetchUsers = async (skip) => {
    try {
      const response = await axios.get("http://localhost:3001/users", {
        params: { userId: currentUserId, limit, skip },
      });
      const fetchedUsers = response.data;
      if (fetchedUsers.length < limit) {
        setHasMore(false); // No more users to fetch
      }
      setUsers((prevUsers) => [...prevUsers, ...fetchedUsers]);
      setSkip((prevSkip) => prevSkip + limit);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(skip);
  }, []);

  const handleViewMore = () => {
    fetchUsers(skip);
  };

  return (
    <Box
      sx={{
        width: 420,
        position: "sticky",
        top: 0, // Adjust this value as needed
        alignSelf: "flex-start", // Ensure it sticks to the top
      }}
    >
      <Typography
        id="ellipsis-list-demo"
        level="body-xs"
        textTransform="uppercase"
        sx={{ letterSpacing: "0.15rem" }}
      >
        Suggestions for you
      </Typography>
      <List
        aria-labelledby="ellipsis-list-demo"
        sx={{ "--ListItemDecorator-size": "56px" }}
      >
        {users.map((user) => (
          <ListItem key={user._id}>
            <ListItemDecorator>
              <Avatar>{users.username?.charAt(0).toUpperCase()} </Avatar>
              {/* Placeholder Avatar */}
            </ListItemDecorator>
            <ListItemContent>
              <Typography level="title-sm">{user.username}</Typography>
              <Typography level="body-sm" noWrap>
                {user.email}
              </Typography>
            </ListItemContent>
          </ListItem>
        ))}
      </List>
      {hasMore && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Link onClick={handleViewMore}>View More</Link>
        </Box>
      )}
    </Box>
  );
}

// import * as React from "react";
// import Avatar from "@mui/joy/Avatar";
// import Box from "@mui/joy/Box";
// import List from "@mui/joy/List";
// import ListItem from "@mui/joy/ListItem";
// import ListItemContent from "@mui/joy/ListItemContent";
// import ListItemDecorator from "@mui/joy/ListItemDecorator";
// import Typography from "@mui/joy/Typography";

// export default function Suggestions() {
//   return (
//     <Box sx={{ width: 320 }}>
//       <Typography
//         id="ellipsis-list-demo"
//         level="body-xs"
//         textTransform="uppercase"
//         sx={{ letterSpacing: "0.15rem" }}
//       >
//         Inbox
//       </Typography>
//       <List
//         aria-labelledby="ellipsis-list-demo"
//         sx={{ "--ListItemDecorator-size": "56px" }}
//       >
//         <ListItem>
//           <ListItemDecorator>
//             <Avatar src="/static/images/avatar/1.jpg" />
//           </ListItemDecorator>
//           <ListItemContent>
//             <Typography level="title-sm">Brunch this weekend?</Typography>
//             <Typography level="body-sm" noWrap>
//               I&apos;ll be in your neighborhood doing errands this Tuesday.
//             </Typography>
//           </ListItemContent>
//         </ListItem>
//         <ListItem>
//           <ListItemDecorator>
//             <Avatar src="/static/images/avatar/2.jpg" />
//           </ListItemDecorator>
//           <ListItemContent>
//             <Typography level="title-sm">Summer BBQ</Typography>
//             <Typography level="body-sm" noWrap>
//               Wish I could come, but I&apos;m out of town this Friday.
//             </Typography>
//           </ListItemContent>
//         </ListItem>
//       </List>
//     </Box>
//   );
// }
