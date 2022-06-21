import "./App.css";
import { useEffect, useMemo } from "react";
import AllRoutes from "./routes/AllRoutes";
import { Toaster } from "react-hot-toast";
import { toastOption } from "./utils/toastOption";
import { useDispatch, useSelector } from "react-redux";
import { loadPosts } from "./store/postSlice";
import { ThemeProvider } from "@mui/material";
import {
  darkThemeVariables,
  getDesignTokens,
  lightThemeVariables,
} from "./utils/muiTheme";
import { createTheme } from "@mui/material";

function App() {
  // Update the theme only if the mode changes
  const { mode } = useSelector((state) => state.theme);
  const muiTheme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const { status } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(loadPosts());
    }
  }, [dispatch, status]);

  return (
    <ThemeProvider theme={muiTheme}>
      <div className="App" data-theme={mode}>
        <Toaster position="bottom-left" toastOptions={toastOption} />
        <AllRoutes />
      </div>
    </ThemeProvider>
  );
}

export default App;
