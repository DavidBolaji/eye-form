import {
  createBrowserRouter,
  RouterProvider,
  UNSAFE_useScrollRestoration,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import RootPage from "./pages/RootPage";
import AddPage from "./pages/AddPage";
import EditPage from "./pages/EditPage";
import "./index.css";

const route = createBrowserRouter([
  {
    path: "/",
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
]);
function App() {
  return <RouterProvider router={route} />;
}

export default App;
