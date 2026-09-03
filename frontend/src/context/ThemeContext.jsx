import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(
        () => localStorage.getItem("theme") || "dark"
    );

    useEffect(() => {
        if (theme === "light") {
            document.documentElement.dataset.theme = "light";

        } else {
            delete document.documentElement.dataset.theme;
        }
        localStorage.setItem("theme", theme);
    }, [theme])

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    }

    return (
        <ThemeContext.Provider value= {{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};