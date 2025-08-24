import App from "./App";
import ErrorPage from "./ErrorPage";
import Login from "./Login";
import Home from "./Home";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
    ],
  },
];

export default routes;
