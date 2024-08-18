import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import SendOutlined from "@mui/icons-material/SendOutlined";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import { useMediaQuery } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Post() {
  const tablet768px = useMediaQuery("(max-width: 800px)");
  const mobile = useMediaQuery("(max-width: 425px)");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from the server
    axios
      .get("http://localhost:3001/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {posts.map((post) => (
        <Card
          key={post._id}
          variant="outlined"
          sx={{ width: 600, height: "auto" }}
        >
          <CardContent sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ position: "relative" }}>
              <IconButton
                variant="plain"
                color="neutral"
                size="sm"
                sx={{ ml: "auto" }}
              >
                <MoreHoriz />
              </IconButton>
            </Box>
            <Typography fontWeight="lg">
              {" "}
              {post.user.username || "Unknown User"} {/* Display username */}
            </Typography>
          </CardContent>
          <CardOverflow>
            <AspectRatio>
              <img src={post.image[0].url} alt={post.caption} loading="lazy" />
            </AspectRatio>
          </CardOverflow>
          <CardContent>
            <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
              <IconButton variant="plain" color="neutral" size="sm">
                <FavoriteBorder />
              </IconButton>
              <IconButton variant="plain" color="neutral" size="sm">
                <ModeCommentOutlined />
              </IconButton>
              <IconButton variant="plain" color="neutral" size="sm">
                <SendOutlined />
              </IconButton>
              <IconButton variant="plain" color="neutral" size="sm">
                <BookmarkBorderRoundedIcon />
              </IconButton>
            </Box>
            <Typography fontSize="sm">
              <Typography fontWeight="lg">{post.caption}</Typography>
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography fontSize="sm">8.1M Likes</Typography>
              <Typography fontSize="10px" sx={{ color: "text.tertiary" }}>
                2 DAYS AGO
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
