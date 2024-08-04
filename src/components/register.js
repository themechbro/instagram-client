import { Typography, Link } from "@mui/joy";
import * as React from "react";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import axios from "axios";

export default function Register() {
  const registerUserToBackend = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const username = e.target.username.value;
    const password = e.target.password.value;

    console.log(
      "Submitting form with email:",
      email,
      "and password:",
      password,
      "and Username:",
      username
    );

    try {
      const response = await axios.post("http://localhost:3001/register", {
        email,
        username,
        password,
      });

      console.log("User registered successfully:", response.data);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="register container-lg p-5 w-50 mt-5">
      <Card
        variant="outlined"
        sx={{
          maxHeight: "max-content",
          maxWidth: "100%",
          mx: "auto",
        }}
      >
        <Typography level="title-lg">Sign Up to Instagram</Typography>
        <Divider inset="none" />
        <CardContent
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(80px, 1fr))",
            gap: 1.5,
          }}
        >
          <form onSubmit={registerUserToBackend}>
            <FormControl sx={{ gridColumn: "1/-1" }}>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Enter your Email" name="email" />
            </FormControl>
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
            <CardActions sx={{ gridColumn: "1/-1" }}>
              <Button variant="solid" color="primary" type="submit">
                Sign Up
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
