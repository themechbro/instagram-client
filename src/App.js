import Loading from "./components/loading";
import Login from "./components/login";
import Register from "./components/register";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./components/views/home";
import { useSelector, useDispatch } from "react-redux";
import { checkAuthStatus } from "./redux/actions/authActions";
import NotFound from "./components/views/notFound/notFound";
import { Box } from "@mui/joy";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const [loadingAfterLogin, setLoadingAfterLogin] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true); // For initial loading state

  // Check auth status when the app loads
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  // Handle loading after successful login
  useEffect(() => {
    if (isLoggedIn) {
      setLoadingAfterLogin(true);
      setTimeout(() => {
        setLoadingAfterLogin(false);
      }, 3000); // Show loading for 3 seconds after login
    }
  }, [isLoggedIn]);

  return (
    <Router>
      <Box className="App">
        <Routes>
          {/* Initial route shows loading and then redirects to login */}
          <Route
            path="/"
            element={
              <RedirectWithLoading
                initialLoading={initialLoading}
                setInitialLoading={setInitialLoading}
              />
            }
          />

          {/* Login and Register routes */}
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            path="/register"
            element={isLoggedIn ? <Navigate to="/home" /> : <Register />}
          />

          {/* Protected route for Home */}
          <Route
            path="/home"
            element={
              loadingAfterLogin ? (
                <Loading />
              ) : isLoggedIn ? (
                <Home />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* NotFound Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </Router>
  );
}

// A component to handle redirection with a loading screen
function RedirectWithLoading({ initialLoading, setInitialLoading }) {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false); // Stop showing the initial loading
      navigate("/login"); // Redirect to login page after 5 seconds
    }, 5000); // 5000ms = 5 seconds

    return () => clearTimeout(timer);
  }, [navigate, setInitialLoading]);

  return initialLoading ? <Loading /> : null;
}

export default App;

// import "./App.css";
// import Loading from "./components/loading";
// import Login from "./components/login";
// import Register from "./components/register";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
//   useNavigate,
// } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Home from "./components/views/home";
// import { useSelector, useDispatch } from "react-redux";
// import { checkAuthStatus } from "./redux/actions/authActions";
// import NotFound from "./components/views/notFound/notFound";

// function App() {
//   const isloggedIn = useSelector((state) => state.auth.isLoggedIn);
//   const isLoading = useSelector((state) => state.auth.isLoading);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(checkAuthStatus());
//   }, [dispatch]);

//   const [loadingAfterLogin, setLoadingAfterLogin] = useState(false);

//   useEffect(() => {
//     if (isloggedIn) {
//       setLoadingAfterLogin(true);
//       setTimeout(() => {
//         setLoadingAfterLogin(false);
//       }, 3000);
//     }
//   }, [isloggedIn]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       // After 5 seconds, redirect to login page
//       navigate("/login");
//     }, 5000); // 5000ms = 5 seconds

//     // Cleanup the timer when the component unmounts
//     return () => clearTimeout(timer);
//   }, [navigate]);

//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Loading />} />
//           <Route
//             path="/login"
//             element={isloggedIn ? <Navigate to="/home" /> : <Login />}
//           />
//           <Route path="/register" element={<Register />} />

//           {/* Protected Routes */}
//           {/* <Route
//             path="/home"
//             element={isloggedIn ? <Home /> : <Navigate to="/login" />}
//           /> */}
//           <Route
//             path="/home"
//             element={
//               isLoading || loadingAfterLogin ? (
//                 <Loading />
//               ) : isloggedIn ? (
//                 <Home />
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//           <Route
//             path="*"
//             element={isloggedIn ? <NotFound /> : <Navigate to="/login" />}
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
