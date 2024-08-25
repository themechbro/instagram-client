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
  const [following, setFollowing] = useState({});
  const limit = 4;
  const currentUserId = useSelector((state) => state.auth.user._id); // Adjust to your state structure
  const isDarkMode = useSelector((state) => state.auth.isDarkMode);

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

  const handleFollow = async (userId) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/${userId}/follow`,
        { followerId: currentUserId } // Make sure currentUserId is correctly defined
      );
      setFollowing((prevState) => ({
        ...prevState,
        [userId]: true, // Mark this user as followed
      }));
    } catch (error) {
      console.error("Error following user:", error);
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
              <Typography
                level="title-sm"
                sx={{ color: isDarkMode ? "#FFF" : "black" }}
              >
                {user.username}
              </Typography>
              <Typography
                level="body-sm"
                noWrap
                sx={{ color: isDarkMode ? "#FFF" : "black" }}
              >
                {user.email}
              </Typography>
            </ListItemContent>
            <Button
              size="sm"
              variant="solid"
              color="primary"
              onClick={() => handleFollow(user._id)}
              disabled={following[user._id]} // Disable button if already following
              sx={{
                backgroundColor: following[user._id] ? "grey" : "primary.main",
              }}
            >
              {following[user._id] ? "Following" : "Follow"}
            </Button>
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
