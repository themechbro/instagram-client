import { Typography, Box } from "@mui/joy";
import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import FormatBold from "@mui/icons-material/FormatBold";
import FormatItalic from "@mui/icons-material/FormatItalic";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Check from "@mui/icons-material/Check";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import { formatDistanceToNow } from "date-fns";
import { Grid } from "@mui/material";

export default function CommentSection() {
  const [italic, setItalic] = React.useState(false);
  const [fontWeight, setFontWeight] = React.useState("normal");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [comment, setComment] = React.useState("");
  const [fetchedComment, setFetchedComment] = React.useState([]);
  const userId = useSelector((state) => state.auth.user.id);
  const postId = useSelector((state) => state.auth.viewPost.id);
  const [error, setError] = React.useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/comment/${postId}`
        );
        setFetchedComment(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleSendComment = async () => {
    if (!comment.trim()) {
      setError("Comment cannot be empty!");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3001/comment", {
        postId: postId,
        userId: userId,
        content: comment,
      });
      const fetchComments = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/comment/${postId}`
          );
          setFetchedComment(response.data);
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      };

      fetchComments();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
      }}
    >
      <Typography
        level="h1"
        sx={{
          fontFamily: "Roboto Condensed, sans-serif",
        }}
      >
        Comments
      </Typography>

      <Box
        sx={{
          width: "100%",
          marginTop: 5,
        }}
      >
        <List
          sx={{
            marginBottom: 5,
          }}
        >
          {fetchedComment.map((item) => {
            return (
              <ListItem
                variant="soft"
                sx={{
                  borderRadius: "sm",
                }}
              >
                <ListItemDecorator
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "space-between",
                  }}
                >
                  <Typography
                    level="title-lg"
                    sx={{
                      fontFamily: "Roboto Condensed",
                      fontWeight: "900",
                    }}
                    component={Grid}
                    xs={5}
                  >
                    {item.user.username}
                  </Typography>
                </ListItemDecorator>
                <ListItemContent
                  component={Grid}
                  xs={7}
                  sx={{ padding: 1, marginBottom: 2 }}
                >
                  <Typography level="body-lg">{item.content}</Typography>
                  <Typography level="body-sm">
                    {formatDistanceToNow(new Date(item.createdAt), {
                      addSuffix: true,
                    })}
                  </Typography>
                </ListItemContent>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box>
        <FormControl error={!!error}>
          <FormLabel>Your comment</FormLabel>
          <Textarea
            error={error ? true : false}
            placeholder="Type something here…"
            minRows={3}
            value={comment} // Bind comment state to Textarea
            onChange={(e) => setComment(e.target.value)}
            endDecorator={
              <Box
                sx={{
                  display: "flex",
                  gap: "var(--Textarea-paddingBlock)",
                  pt: "var(--Textarea-paddingBlock)",
                  borderTop: "1px solid",
                  borderColor: "divider",
                  flex: "auto",
                }}
              >
                <IconButton
                  variant="plain"
                  color="neutral"
                  onClick={(event) => setAnchorEl(event.currentTarget)}
                >
                  <FormatBold />
                  <KeyboardArrowDown fontSize="md" />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                  size="sm"
                  placement="bottom-start"
                  sx={{ "--ListItemDecorator-size": "24px" }}
                >
                  {["200", "normal", "bold"].map((weight) => (
                    <MenuItem
                      key={weight}
                      selected={fontWeight === weight}
                      onClick={() => {
                        setFontWeight(weight);
                        setAnchorEl(null);
                      }}
                      sx={{ fontWeight: weight }}
                    >
                      <ListItemDecorator>
                        {fontWeight === weight && <Check fontSize="sm" />}
                      </ListItemDecorator>
                      {weight === "200" ? "lighter" : weight}
                    </MenuItem>
                  ))}
                </Menu>
                <IconButton
                  variant={italic ? "soft" : "plain"}
                  color={italic ? "primary" : "neutral"}
                  aria-pressed={italic}
                  onClick={() => setItalic((bool) => !bool)}
                >
                  <FormatItalic />
                </IconButton>
                <Button sx={{ ml: "auto" }} onClick={handleSendComment}>
                  Send
                </Button>
              </Box>
            }
            sx={{
              minWidth: 300,
              fontWeight,
              fontStyle: italic ? "italic" : "initial",
            }}
          />
        </FormControl>
      </Box>
    </Box>
  );
}
