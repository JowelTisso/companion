import "./App.css";
import AllRoutes from "./routes/AllRoutes";
import { Toaster } from "react-hot-toast";
import { toastOption } from "./utils/toastOption";

function App() {
  return (
    <div className="App">
      <Toaster position="bottom-left" toastOptions={toastOption} />
      <AllRoutes />
    </div>
  );
}

export default App;
