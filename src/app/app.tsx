import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routing";
import AppProvider from "./provider.tsx";

createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>,
);
