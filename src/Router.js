import React, { Suspense, lazy } from "react";
import Spinner from "./components/Spinner";
import BaseLayout from "./components/BaseLayout";

// ** Import Route Providers
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

const Vault = lazy(() => import("./pages/Vault"));
const Vaults = lazy(() => import("./pages/Vaults"));
const Swap = lazy(() => import("./pages/Swap-Coming"));

const history = createBrowserHistory({
    basename: "",
    forceRefresh: false,
});

const AppRouter = () => {
    return(
        <Router history={history}>
            <Suspense fallback={<Spinner />}>
                <Switch>
                    <Route path="/" exact>
                        <Redirect to="/vaults" />
                    </Route>
                    <BaseLayout>
                        <Route path="/vaults" exact component={Vaults} />
                        <Route path="/vault/:id" exact component={Vault} />
                        <Route path="/swap" exact component={Swap} />
                    </BaseLayout>
                </Switch>
            </Suspense>
        </Router>
    )
}

export default AppRouter;