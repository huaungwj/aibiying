import Home from "../views/Home/Home";
import HouseList from "../views/House/List";
import Search from "../views/Search/Search";

const routes = [
    {
        path: "/",
        component: Home,
        exect: true,
    },
    {
        path: "/search",
        component: Search,
        exect: true,
    },
    {
        path: "/house",
        redirect: "/house/list",
        children: [
            {
                path: "/list",
                component: HouseList,
            },
        ],
    },
];

export default routes;
