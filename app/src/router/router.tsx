import App from "modules/components/App/App";
import { ErrorPage } from "pages/error";
import SuccessPage from "pages/success";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/success",
    element: <SuccessPage />,
    errorElement: <ErrorPage />,
  },
]);
