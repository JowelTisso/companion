import "./App.css";
import { useEffect } from "react";
import AllRoutes from "./routes/AllRoutes";
import { Toaster } from "react-hot-toast";
import { toastOption } from "./utils/toastOption";
import { useDispatch, useSelector } from "react-redux";
import { loadPosts } from "./store/postSlice";

function App() {
  const { status } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(loadPosts());
    }
  }, [dispatch, status]);

  return (
    <div className="App">
      <Toaster position="bottom-left" toastOptions={toastOption} />
      <AllRoutes />
    </div>
  );
}

export default App;
