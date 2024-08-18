import * as React from "react";
import { useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

export default function CreatePost({ open, setOpen }) {
  const userId = useSelector((state) => state.auth.user.id);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState(null);

  const uploadToBackend = async (e) => {
    e.preventDefault();

    if (!image || !caption) {
      return alert("Please provide both an image and a caption.");
    }

    const formData = new FormData();
    formData.append("image", image); // Append the image file
    formData.append("caption", caption); // Append the caption
    formData.append("userId", userId);

    try {
      const response = await axios.post(
        "http://localhost:3001/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Uploaded Successfully", response.data);
      setOpen(false); // Close the modal after successful upload
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };

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

  // Handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Preview image
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // You can handle the submission logic here
    console.log("Image:", image);
    console.log("Caption:", caption);
  };

  // Handle removing the selected image
  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog>
        <ModalClose onClick={() => setOpen(false)} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            justifyContent: "center",
            modalStyles,
          }}
        >
          <DialogTitle
            sx={{
              marginBottom: 5,
            }}
          >
            Create a New Post
          </DialogTitle>
          <DialogContent>
            <Box
              component="form"
              onSubmit={uploadToBackend}
              sx={{
                p: 3,
                border: "1px solid #ccc",
                borderRadius: 2,
                maxWidth: 500,
                margin: "auto",
              }}
            >
              <Grid container spacing={2} alignItems="center">
                {/* Image Upload */}
                <Grid item xs={12}>
                  <Button variant="contained" component="label">
                    Choose Image
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Button>
                </Grid>

                {/* Image Preview */}
                {preview && (
                  <>
                    <Grid item xs={12}>
                      <img
                        src={preview}
                        alt="Selected"
                        style={{
                          width: "100%",
                          maxHeight: 200,
                          objectFit: "contain",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleRemoveImage}
                      >
                        Remove Image
                      </Button>
                    </Grid>
                  </>
                )}
                {/* Caption Field */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Add a caption"
                    variant="outlined"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                  />
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={!image || !caption} // Disable if no image or caption
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
        </Box>
      </ModalDialog>
    </Modal>
  );
}
