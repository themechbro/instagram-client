import { Typography, Box } from "@mui/joy";
import React from "react";
import { useState, useEffect } from "react";
import Appbar from "./appbar";
import Post from "./post";
import Alerts from "./alerts/alerts";
import AnimationSkeleton from "./skeleton/skeleton";

export default function Home() {
  const [showCard, setShowCard] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowCard(false);
    }, 5000);

    // Clear the timer if component unmounts
    return () => clearTimeout(timer);
  }, []); // Empty array ensures this effect runs only once after mount

  return (
    <div>
      <Appbar />
      <div className="container p-5 mt-5">
        <Alerts />
        {showCard ? (
          <Box
            sx={{
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 5,
              paddingTop: 6,
            }}
          >
            <AnimationSkeleton />
          </Box>
        ) : (
          <Box
            sx={{
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 5,
              paddingTop: 6,
            }}
          >
            <Post />
          </Box>
        )}
      </div>
    </div>
  );
}

// import { Typography, Box } from "@mui/joy";
// import * as React from "react";
// import { useSelector } from "react-redux";
// import Appbar from "./appbar";
// import Post from "./post";
// import Alerts from "./alerts/alerts";
// import AnimationSkeleton from "./skeleton/skeleton";

// export default function Home() {
//   const [showCard, setShowCard] = React.useState(true);
//   React.useEffect(
//     setTimeout(() => {
//       setShowCard(false);
//     }, 5000)
//   );

//   return (
//     <div>
//       <Appbar />
//       <div className="container p-5 mt-5">
//         <Alerts />
//         <Box
//           sx={{
//             backgroundColor: "#fff",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             marginTop: 10,
//             paddingTop: 10,
//           }}
//         >
//           {showCard ? <Post /> : <AnimationSkeleton />}
//         </Box>
//       </div>
//     </div>
//   );
// }
