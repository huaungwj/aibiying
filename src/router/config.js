import Home from "../views/Home/Home";
import HouseList from "../views/House/List"

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
            }
        ],
    }
];

export default routes;
