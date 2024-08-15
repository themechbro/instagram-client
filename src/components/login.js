import { Typography, Link, Box, Form } from "@mui/joy";
import * as React from "react";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import Checkbox from "@mui/joy/Checkbox";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

export default function Login() {
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     const username = e.target.username.value;
  //     const password = e.target.password.value;
  //     console.log("Submitting loginData", username, password);

  //     try {
  //       const response = await axios.post("http://localhost:3001/login", {
  //         username: username, // Passport uses "username" field for authentication
  //         password,
  //       });

  //       console.log("Login successful:", response.data);
  //     } catch (error) {
  //       console.error("Error logging in:", error);
  //     }
  //   };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const tablet768px = useMediaQuery("(max-width: 800px)");
  const mobile = useMediaQuery("(max-width: 425px)");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    // console.log("Form submitted", { username, password });
    dispatch(loginUser(username, password));
  };

  return (
    <div className="login container-lg p-5 w-50 mt-5">
      <Card variant="outlined" sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 3 }}>
        <Typography
          level="h1"
          sx={{
            mb: 2,
            fontFamily: '"Grey Qo", cursive',
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Instagram
        </Typography>

        <form onSubmit={handleSubmit}>
          <FormControl sx={{ mb: 2 }}>
            <FormLabel>Username</FormLabel>
            <Input placeholder="Enter your Username" name="username" />
          </FormControl>
          <FormControl sx={{ mb: 2 }}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your Password"
              name="password"
            />
          </FormControl>
          <FormControl sx={{ mb: 2 }}>
            <Checkbox label="Remember Me" />
          </FormControl>
          <Button type="submit" fullWidth>
            Login
          </Button>
        </form>

        <Box
          sx={{
            mb: 2,
            fontFamily: '"Grey Qo", cursive',
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography level="title-lg" sx={{ mb: 2 }}>
            Don't have an account ?{" "}
            <Link href="/register" underline="none">
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Card>

      {/* <Card variant="outlined" sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 3 }}>
        <Typography level="title-lg">Login to Instagram</Typography>
        <Divider inset="none" />
        <CardContent
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(80px, 1fr))",
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              width: tablet768px ? "100%" : "100%",
            }}
          >
             <form> 
            <FormControl
              sx={{ gridColumn: "1/-1" }}
              component="form"
              onSubmit={handleSubmit}
              className="login-form"
            >
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="Enter your Username"
                name="username"
              />
            </FormControl>
            <FormControl sx={{ gridColumn: "1/-1" }}>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="Enter your Instagram password"
                type="password"
                name="password"
              />
            </FormControl>
            <Checkbox label="Remember Me" sx={{ gridColumn: "1/-1", my: 1 }} />
            <CardActions sx={{ gridColumn: "1/-1" }}>
              <Button variant="solid" color="primary" type="submit">
                Login
              </Button>
            </CardActions>
           </form> 
          </Box>
        </CardContent>
      </Card> */}
    </div>
  );
}
