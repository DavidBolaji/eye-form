import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootPage from "./pages/RootPage";
import AddPage from "./pages/AddPage";
import EditPage from "./pages/EditPage";
import "./index.css";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/Homepage";

const route = createBrowserRouter([
  {
    path: "/dashboard",
    element: <RootPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "add_user",
        element: <AddPage />,
      },
      {
        path: "edit_user/:id/:stage",
        element: <EditPage />,
      },
    ],
  },
  {
    path: "/",
    element: <LoginPage />,
  },
]);
function App() {
  return <RouterProvider router={route} />;
}

export default App;
