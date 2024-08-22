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
import { format } from "date-fns";

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
      {posts.map((post) => {
        const fallbackDate = new Date();
        const formattedDate = post.createdAt
          ? format(new Date(post.createdAt), "MMM dd, yyyy HH:mm")
          : format(fallbackDate, "MMM dd, yyyy HH:mm");
        return (
          <Card
            key={post._id}
            variant="outlined"
            sx={{
              width: mobile ? "100%" : tablet768px ? "90%" : 600,
              "--Card-radius": (theme) => theme.vars.radius.xs,
              mx: "auto", // Center card horizontally
            }}
          >
            <CardContent
              orientation="horizontal"
              sx={{
                alignItems: "center",
                gap: 1,
                flexDirection: mobile ? "column" : "row",
                textAlign: mobile ? "center" : "left",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    m: "-2px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
                  },
                }}
              >
                <Avatar
                  size={mobile ? "md" : "sm"}
                  sx={{
                    p: 0.5,
                    border: "2px solid",
                    borderColor: "background.body",
                  }}
                >
                  {post.user.username.charAt(0).toUpperCase()}
                </Avatar>
              </Box>
              <Typography fontWeight="lg">
                {post.user.username || "Unknown User"} {/* Display username */}
              </Typography>
              <MoreHoriz />
              {/* <IconButton
                variant="plain"
                color="neutral"
                size="sm"
                sx={{ ml: "auto" }}
              /> */}
            </CardContent>
            <CardOverflow>
              <AspectRatio>
                <img
                  src={post.image[0].url}
                  alt={post.caption}
                  loading="lazy"
                />
              </AspectRatio>
            </CardOverflow>
            <CardContent>
              <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
                <IconButton
                  variant="plain"
                  color="neutral"
                  size={mobile ? "md" : "sm"}
                >
                  <FavoriteBorder />
                </IconButton>
                <IconButton
                  variant="plain"
                  color="neutral"
                  size={mobile ? "md" : "sm"}
                >
                  <ModeCommentOutlined />
                </IconButton>
                <IconButton
                  variant="plain"
                  color="neutral"
                  size={mobile ? "md" : "sm"}
                >
                  <SendOutlined />
                </IconButton>
                <IconButton
                  variant="plain"
                  color="neutral"
                  size={mobile ? "md" : "sm"}
                >
                  <BookmarkBorderRoundedIcon />
                </IconButton>
              </Box>
              <Typography fontSize={mobile ? "body-xs" : "body-sm"}>
                <Typography fontWeight="lg">{post.caption}</Typography>
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography fontSize={mobile ? "body-xs" : "body-sm"}>
                  8.1M Likes
                </Typography>
                <Typography
                  fontSize={mobile ? "caption" : "body-xs"}
                  sx={{ color: "text.tertiary" }}
                >
                  {formattedDate}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}
