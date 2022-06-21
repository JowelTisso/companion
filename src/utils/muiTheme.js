export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            light: "#5bac7e",
            main: "#1d9048",
            dark: "#046328",
            contrastText: "#fff",
          },
          secondary: {
            light: "#E9FFF2",
            main: "#c7fcde",
            dark: "#9CD7C8",
            contrastText: "#046328",
          },
        }
      : {
          primary: {
            light: "#5bac7e",
            main: "#1d9048",
            dark: "#046328",
            contrastText: "#fff",
          },
          secondary: {
            light: "#E9FFF2",
            main: "#c7fcde",
            dark: "#9CD7C8",
            contrastText: "#046328",
          },
        }),
  },
  typography: {
    htmlFontSize: 12,
  },
});
