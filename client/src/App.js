import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";

function App() {
  return (
    <>
    <Toaster/>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
