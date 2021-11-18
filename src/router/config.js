import Home from "../views/Home/Home";
import HouseList from "../views/House/List";
import HouseAdd from "../views/House/Add";

const routes = [
    {
        path: "/",
        component: Home,
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
            {
                path: "/add",
                component: HouseAdd,
            },
        ],
    }
];

export default routes;
