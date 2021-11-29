import React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import "../assets/scss/index.scss";

// ** Declare Theme Provider
const MaterialThemeProvider = ({ children }) => {
    // const themeConfig = {
    //     palette: {
    //         type: "dark",
    //         primary: {
    //             main: "#161522",
    //         },
    //         secondary: {
    //             main: "#da00ff"
    //         },
    //         background: {
    //             default: "#161522",
    //             paper: "#181837",
    //         },
    //     },
    //     typography: {
    //         fontFamily: "'DM Sans', sans-serif",
    //         fontSize: 14,
    //     },
    //     custom: {
    //         base: {
    //             dark: "#121227",
    //             darken: "#121227",
    //             base: "#da00ff"
    //         },
    //         fontColor: "rgb(191, 191, 191)"
    //     },
    //     shape: {
    //         borderRadius: 6
    //     },
    //     overrides: {
    //         MuiIconButton: {
    //             root: {
    //                 borderRadius: 6
    //             }
    //         },
    //         MuiTooltip: {
    //             popper: {
    //                 padding: 0,
    //                 background: "red",
    //                 height: 0
    //             },
    //             arrow: {
    //                 color: "#492b66"
    //             },
    //             tooltip: {
    //                 background: "#492b66 !important",
    //                 fontSize: 14,
    //                 fontWeight: "100"
    //             }
    //         }
    //     }
    // }

    const themeConfig = {
        palette: {
            mode: "dark",

            primary: {
                main: "#da00ff"
            },
            secondary: {
                main: "rgb(191, 191, 191)"
            },
            background: {
                default: "#121227",
                paper: "#181837"
            },
            common: {
                black: "#121227",
                white: "#26264e"
            }
        },
        shape: {
            borderRadius: 12
        },
        typography: {
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
        },
        components: {
            MuiTooltip: {
                styleOverrides: {
                    arrow: {
                        color: "#492b66"
                    },
                    tooltip: {
                        background: "#492b66 !important",
                        fontSize: 14,
                        color: "rgb(191, 191, 191)",
                        fontWeight: "100"
                    }
                }
            }
        }
    }

    const theme = createTheme(themeConfig);
    return (
        <ThemeProvider theme={theme} >
            <CssBaseline />
            {children}
        </ThemeProvider >
    );
};
export default MaterialThemeProvider;