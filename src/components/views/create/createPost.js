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
import { IconButton } from "@mui/joy";
import { FolderDelete } from "@mui/icons-material";
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
          }}
        >
          <DialogTitle
            sx={{
              marginBottom: 3,
              fontSize: "1.5rem",
              fontWeight: "bold",
              textAlign: "center",
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
                borderRadius: 2,
                maxWidth: 500,
                margin: "auto",
                backgroundColor: "#f9f9f9",
                boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
              }}
            >
              {/* Image Upload Section */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <Button
                  variant="contained"
                  component="label"
                  sx={{ marginBottom: 2 }}
                >
                  Choose Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>
                {/* Image Preview Section */}
                {preview && (
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      maxWidth: 400,
                      marginBottom: 2,
                    }}
                  >
                    <img
                      src={preview}
                      alt="Selected"
                      style={{
                        width: "100%",
                        borderRadius: 8,
                        objectFit: "contain",
                        boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
                      }}
                    />
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        color: "#fff",
                      }}
                      onClick={handleRemoveImage}
                    >
                      <FolderDelete />
                    </IconButton>
                  </Box>
                )}
              </Box>

              {/* Caption Field Section */}
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Add a caption"
                    variant="outlined"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    multiline
                    rows={3}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderRadius: 4,
                        },
                      },
                    }}
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
                    sx={{
                      backgroundColor: "#3f51b5",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#303f9f",
                      },
                      borderRadius: 4,
                    }}
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

    // <Modal open={open} onClose={() => setOpen(false)}>
    //   <ModalDialog>
    //     <ModalClose onClick={() => setOpen(false)} />
    //     <Box
    //       sx={{
    //         display: "flex",
    //         flexDirection: "column",
    //         alignItems: "center",
    //         padding: "20px",
    //         justifyContent: "center",
    //         modalStyles,
    //       }}
    //     >
    //       <DialogTitle
    //         sx={{
    //           marginBottom: 5,
    //         }}
    //       >
    //         Create a New Post
    //       </DialogTitle>
    //       <DialogContent>
    //         <Box
    //           component="form"
    //           onSubmit={uploadToBackend}
    //           sx={{
    //             p: 3,
    //             border: "1px solid #ccc",
    //             borderRadius: 2,
    //             maxWidth: 500,
    //             margin: "auto",
    //           }}
    //         >
    //           <Grid container spacing={2} alignItems="center">
    //             {/* Image Upload */}
    //             <Grid item xs={12}>
    //               <Button variant="contained" component="label">
    //                 Choose Image
    //                 <input
    //                   type="file"
    //                   hidden
    //                   accept="image/*"
    //                   onChange={handleImageChange}
    //                 />
    //               </Button>
    //             </Grid>

    //             {/* Image Preview */}
    //             {preview && (
    //               <>
    //                 <Grid item xs={12}>
    //                   <img
    //                     src={preview}
    //                     alt="Selected"
    //                     style={{
    //                       width: "100%",
    //                       maxHeight: 200,
    //                       objectFit: "contain",
    //                     }}
    //                   />
    //                 </Grid>
    //                 <Grid item xs={12}>
    //                   <Button
    //                     variant="outlined"
    //                     color="secondary"
    //                     onClick={handleRemoveImage}
    //                   >
    //                     Remove Image
    //                   </Button>
    //                 </Grid>
    //               </>
    //             )}
    //             {/* Caption Field */}
    //             <Grid item xs={12}>
    //               <TextField
    //                 fullWidth
    //                 label="Add a caption"
    //                 variant="outlined"
    //                 value={caption}
    //                 onChange={(e) => setCaption(e.target.value)}
    //               />
    //             </Grid>

    //             {/* Submit Button */}
    //             <Grid item xs={12}>
    //               <Button
    //                 type="submit"
    //                 variant="contained"
    //                 color="primary"
    //                 fullWidth
    //                 disabled={!image || !caption} // Disable if no image or caption
    //               >
    //                 Submit
    //               </Button>
    //             </Grid>
    //           </Grid>
    //         </Box>
    //       </DialogContent>
    //     </Box>
    //   </ModalDialog>
    // </Modal>
  );
}
