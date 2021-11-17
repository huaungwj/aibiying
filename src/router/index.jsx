import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "../router/config";
import { Provider } from "react-redux";
import NavBar from "../components/NavBar/NavBar";

import User from "../views/User";

import store from "../store";

export default function RouteConfigExample() {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <NavBar />
                    <Switch>
                        {routes.map((route, i) => (
                            <RouteWithSubRoutes key={i} {...route} />
                        ))}
                    </Switch>
                </div>
                <User />
            </Router>
        </Provider>
    );
}

function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            render={(props) => (
                <route.component {...props} routes={route.routes} />
            )}
        />
    );
}
