import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { useEffect } from "react";

import NavBar from "../components/NavBar/NavBar";
import routes from "../router/config";
import User from "../views/User";
import store from "../store";
import { StorageTokenName } from "../api";
import * as UserAction from "../store/actions/user";

// console.log(routes);

export default function RouteConfigExample() {
    useEffect(() => {
        try {
            const userInfo = JSON.parse(localStorage.getItem(StorageTokenName));
            store.dispatch(UserAction.setUserInfo(userInfo));
        } catch (error) {
            console.log("Invalid userinfo. You must login");
        }
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <NavBar />
                <Switch>
                    {routes.map((route, i) => {
                        if (route.children) {
                            const RenderChildRoute = (props) => {
                                if (route.redirect && props.location.pathname === route.path) {
                                    return <Redirect from={route.path} to={route.redirect} exact />
                                }
                                return route.children.map((childRoute, i) => {
                                    childRoute = {
                                        ...childRoute,
                                        path: route.path + childRoute.path
                                    };
                                    return <RouteWithSubRoutes key={childRoute.path} {...childRoute} />
                                });
                            };
                            RenderChildRoute.propTypes = {
                                location: PropTypes.object
                            };
                            return <Route
                                key={route.path}
                                path={route.path}
                                render={RenderChildRoute}
                            />
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
    return (
        <Route
            key={route.path}
            exact
            path={route.path}
            component={route.component}
        />
    );
}
