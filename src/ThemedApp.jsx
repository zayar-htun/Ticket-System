import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { createContext, useMemo, useState, useEffect } from "react";
import App from "./App";
import { grey } from "@mui/material/colors";

export const themeContext = createContext();
export const UIContext = createContext();

export default function ThemedApp() {
    const storedMode = localStorage.getItem("selectedMode") || "dark"; // Default to "dark" if not found

    const [mode, setMode] = useState(storedMode);
    const [translate, setTranslate] = useState({});

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const [auth, setAuth] = useState(false);
    const [authUser, setAuthUser] = useState({});

    const theme = useMemo(() => {
        return createTheme({
            palette: {
                mode,
                ...(mode === "light"
                    ? {
                          banner: {
                              background: grey[300],
                          },
                          appbar: {
                              background: "#486284",
                          },
                          text: {
                              fade: grey[900],
                          },
                          bestCourse: {
                              background: "#FAFAFA",
                          },
                          buttonColor: {
                              backgroundColor: "#486284",
                          },
                      }
                    : {
                          banner: {
                              background: grey[900],
                          },
                          appbar: {
                              background: "#111",
                          },
                          text: {
                              fade: grey[700],
                          },
                          bestCourse: {
                              background: "#333333",
                          },
                          buttonColor: {
                              backgroundColor: "#cccccc",
                          },
                      }),
            },
        });
    }, [mode]);

    useEffect(() => {
        localStorage.setItem("selectedMode", mode); // Store the mode in localStorage
    }, [mode]);

    return (
        <themeContext.Provider
            value={{ mode, setMode, translate, setTranslate ,auth, setAuth,authUser, setAuthUser }}
        >
            <ThemeProvider theme={theme}>
                <UIContext.Provider
                    value={{
                        snackbarOpen,
                        setSnackbarOpen,
                        snackMessage,
                        setSnackMessage
                    }}
                >
                    <CssBaseline />
                    <App />
                </UIContext.Provider>
            </ThemeProvider>
        </themeContext.Provider>
    );
}
