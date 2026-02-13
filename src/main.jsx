// Exteral Modules
import "./i18n";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Local Modules
import RootProvider from "./RootProvider";

// Global CSS
import "./index.css";

// App
import App from "./App";

// Layouts
import Minimalist from "@/layouts/Minimalist";
import Classic from "@/layouts/Classic";

// Pages
import Home from "@page/Home/Home";
import Login from "@page/Login/Login";
import Help from "@page/Help/Help";
import About from "@page/About/About";
import Gallery from "@page/Gallery/Gallery";
import Profile from "@page/Profile/Profile";
import Notifications from "@page/Notifications/Notifications";
import Logout from "@page/Logout/Logout";
import Dashboard from "@page/Dashboard/Dashboard";
import Marker from "@page/Marker/Marker";
import Music from "@page/Music/Music";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <Classic />,
        children: [
          { index: true, element: <Home /> },
          { path: "about", element: <About /> },
          { path: "release_notes", element: <About /> },
          { path: "credits", element: <About /> },
          { path: "gallery", element: <Gallery /> },
          { path: "notifications", element: <Notifications /> },
          { path: "profile/", element: <Profile /> },
          { path: "profile/:id", element: <Profile /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "dashboard/marker", element: <Marker /> },
          { path: "music", element: <Music /> },
        ],
      },
      {
        element: <Minimalist />,
        children: [
          { path: "login", element: <Login /> },
          { path: "help", element: <Help /> },
          { path: "logout", element: <Logout /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RootProvider>
    <RouterProvider router={router} />
  </RootProvider>,
);
