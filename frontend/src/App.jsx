import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [count, setCount] = useState(0);

  const isAuth = localStorage.getItem("isAuth");

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: isAuth ? <Navigate to="/dashboard" /> : <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/upload",

      element: (
        <ProtectedRoute>
          <Upload />
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={appRouter} />;
}

export default App;
