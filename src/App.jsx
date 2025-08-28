import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { addUser } from "./reducers/authSlice";
import { useTheme } from "./hooks/useTheme";

import { LoadingSpinner } from "./components/Loaders";
import ProtectedRoute from "./components/ProtectedRoute";
import LogoutOverlay from "./components/LogoutOverlay";

// Lazy load components
const Layout = React.lazy(() => import("./components/Layout"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Login = React.lazy(() => import("./pages/Login"));
const ManagersList = React.lazy(() => import("./pages/ManagersList"));
const TechniciansList = React.lazy(() => import("./pages/TechniciansList"));
const NotificationCreate = React.lazy(() => import("./pages/NotificationCreate"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout>
          <React.Suspense fallback={<LoadingSpinner />}>
            <Dashboard />
          </React.Suspense>
        </Layout>
      </ProtectedRoute>
    ),
    handle: {
      title: "Dashboard"
    }
  },
  {
    path: "/managers",
    element: (
      <ProtectedRoute>
        <Layout>
          <React.Suspense fallback={<LoadingSpinner />}>
            <ManagersList />
          </React.Suspense>
        </Layout>
      </ProtectedRoute>
    ),
    handle: {
      title: "Managers"
    }
  },
  {
    path: "/technicians",
    element: (
      <ProtectedRoute>
        <Layout>
          <React.Suspense fallback={<LoadingSpinner />}>
            <TechniciansList />
          </React.Suspense>
        </Layout>
      </ProtectedRoute>
    ),
    handle: {
      title: "Technicians"
    }
  },
  {
    path: "/notifications/create",
    element: (
      <ProtectedRoute>
        <Layout>
          <React.Suspense fallback={<LoadingSpinner />}>
            <NotificationCreate />
          </React.Suspense>
        </Layout>
      </ProtectedRoute>
    ),
    handle: {
      title: "Create Notification"
    }
  },
  {
    path: "/signin",
    element: (
      <ProtectedRoute loggedIn={true}>
        <React.Suspense fallback={<LoadingSpinner />}>
          <Login />
        </React.Suspense>
      </ProtectedRoute>
    )
  },
  {
    path: "/login",
    element: (
      <ProtectedRoute loggedIn={true}>
        <React.Suspense fallback={<LoadingSpinner />}>
          <Login />
        </React.Suspense>
      </ProtectedRoute>
    )
  },
  {
    path: "*",
    element: (
      <React.Suspense fallback={<LoadingSpinner />}>
        <NotFound />
      </React.Suspense>
    )
  },
]);

const App = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme(); // This will handle theme initialization
  
  useEffect(() => {
    const fetchUser = async () => {
      let user;
      if (localStorage.getItem("user")) {
        user = JSON.parse(localStorage.getItem("user"));
      } else if (Cookies.get("user")) {
        user = JSON.parse(Cookies.get("user"));
      }
      
      // Validate that user has required fields
      if (user && user.token && user.email) {
        dispatch(addUser(user));
      } else {
        // Clear invalid user data
        localStorage.removeItem("user");
        Cookies.remove("user");
        dispatch(addUser(null));
      }
      setIsLoading(false);
    };

    fetchUser();
  }, [dispatch]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <RouterProvider router={router} />
      <LogoutOverlay />
    </>
  );
};

export default App;