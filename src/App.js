import "./App.css";
import Loading from "./components/loading";
import Login from "./components/login";
import Register from "./components/register";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import Home from "./components/views/home";
import { useSelector, useDispatch } from "react-redux";
import { checkAuthStatus } from "./redux/actions/authActions";

function App() {
  const isloggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoadingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={isloggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

function LoadingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      navigate("/login");
    }, 3000); // redirect to /login after 3 seconds

    return () => clearInterval(intervalId);
  }, [navigate]);

  return <Loading />;
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
//   useNavigate,
// } from "react-router-dom";
// import { useEffect } from "react";

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           {setInterval()}
//           <Route path="/" element={<Loading />}></Route>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// function LoadingPage() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       navigate("/login");
//     }, 5000); // redirect to /login after 3 seconds

//     return () => clearInterval(intervalId);
//   }, [navigate]);

//   return <Loading />;
// }

// export default App;
