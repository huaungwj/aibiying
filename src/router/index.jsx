import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import routes from "../router/config";
import { Provider } from "react-redux";
import NavBar from "../components/NavBar/NavBar";

import User from "../views/User";

import store from "../store";
console.log(routes);
export default function RouteConfigExample() {
    return (
        <Provider store={store}>
            <Router>
                <NavBar />
                <Switch>
                    {routes.map((route, i) => {
                        console.log(route);
                        if (route.children) {
                            return <Route key={route.path}>
                                {
                                    route.redirect && <Redirect from={route.path} to={route.redirect} exact />
                                }
                                {route.children.map((childRoute, i) => {
                                    childRoute = {
                                        ...childRoute,
                                        path: route.path + childRoute.path
                                    };
                                    return <RouteWithSubRoutes key={childRoute.path} {...childRoute} />
                                })}
                            </Route>
                        }
                        return RouteWithSubRoutes(route);
                    })}
                </Switch>
                <User />
            </Router>
        </Provider>
    );
}

function RouteWithSubRoutes(route) {
    console.log(route);
    return (
        <Route
            key={route.path}
            exact
            path={route.path}
            component={route.component}
        />
    );
}
