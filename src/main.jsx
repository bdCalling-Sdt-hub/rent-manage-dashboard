import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/store.js";
import { Toaster } from "sonner";
import router from "./components/Routes/Routes.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Toaster position="top-right" richColors />
    <RouterProvider router={router} />
  </Provider>
);
