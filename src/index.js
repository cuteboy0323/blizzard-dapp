import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";

// ** Import Providers
import MaterialThemeProvider from "./providers/theme";
import MuiSnackbarProvider from "./providers/snackbar";
import NotificationProvider from "./providers/notification";
import Web3Provider from "./providers/web3";
import PreloaderProvider from "./providers/preloader";

// ** Initialize Store
import Spinner from "./components/Spinner";

const App = lazy(() => import("./App"));

ReactDOM.render(
    <PreloaderProvider>
        <MaterialThemeProvider>
            <MuiSnackbarProvider>
                <NotificationProvider>
                    <Web3Provider>
                        <Suspense
                            fallback={<Spinner />}
                        >
                            <App />
                        </Suspense>
                    </Web3Provider>
                </NotificationProvider>
            </MuiSnackbarProvider>
        </MaterialThemeProvider>
    </PreloaderProvider>,
    document.getElementById("app-root")
);