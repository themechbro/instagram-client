import { Typography, Link } from "@mui/joy";
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

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    // console.log("Form submitted", { username, password });
    dispatch(loginUser(username, password));
  };

  return (
    <div className="login container-lg p-5 w-50 mt-5">
      <Card
        variant="outlined"
        sx={{
          maxHeight: "max-content",
          maxWidth: "100%",
          mx: "auto",
          // to make the demo resizable
        }}
      >
        <Typography level="title-lg">Login to Instagram</Typography>
        <Divider inset="none" />
        <CardContent
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(80px, 1fr))",
            gap: 1.5,
          }}
        >
          <form onSubmit={handleSubmit}>
            <FormControl sx={{ gridColumn: "1/-1" }}>
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
        </CardContent>
      </Card>
    </div>
  );
}
