import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import SendOutlined from "@mui/icons-material/SendOutlined";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import { useMediaQuery } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function ViewPostCard() {
  const post = useSelector((state) => state.auth.viewPost);
  const isDarkMode = useSelector((state) => state.auth.isDarkMode);

  console.log(post);
  const tablet768px = useMediaQuery("(max-width: 800px)");
  const mobile = useMediaQuery("(max-width: 425px)");

  return (
    <Card
      key={post._id}
      variant="outlined"
      sx={{
        width: mobile ? "100%" : tablet768px ? "90%" : 800,
        "--Card-radius": (theme) => theme.vars.radius.xs,
        // mx: "auto", // Center card horizontally
        backgroundColor: isDarkMode ? "black" : "#FFF",
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
        <Typography
          fontWeight="lg"
          sx={{ color: isDarkMode ? "#FFF" : "black" }}
        >
          {post.user.username || "Unknown User"} {/* Display username */}
        </Typography>
        <MoreHoriz />
      </CardContent>
      <CardOverflow>
        <AspectRatio>
          <img src={post.image[0].url} alt={post.caption} loading="lazy" />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
          <IconButton
            variant="plain"
            color="neutral"
            size={mobile ? "md" : "sm"}
            sx={{ color: isDarkMode ? "#FFF" : "black" }}
          >
            <FavoriteBorder />
          </IconButton>
          <IconButton
            variant="plain"
            color="neutral"
            size={mobile ? "md" : "sm"}
            sx={{ color: isDarkMode ? "#FFF" : "black" }}
          >
            <SendOutlined />
          </IconButton>
          <IconButton
            variant="plain"
            color="neutral"
            size={mobile ? "md" : "sm"}
            sx={{ color: isDarkMode ? "#FFF" : "black" }}
          >
            <BookmarkBorderRoundedIcon />
          </IconButton>
        </Box>
        <Typography fontSize={mobile ? "body-xs" : "body-sm"}>
          <Typography
            fontWeight="lg"
            sx={{ color: isDarkMode ? "#FFF" : "black" }}
          >
            {post.caption}
          </Typography>
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography
            fontSize={mobile ? "body-xs" : "body-sm"}
            sx={{ color: isDarkMode ? "#FFF" : "black" }}
          >
            8.1M Likes
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
