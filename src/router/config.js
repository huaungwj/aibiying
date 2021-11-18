import Home from "../views/Home/Home";
import HouseList from "../views/House/List";
import HouseAdd from "../views/House/Add";
import HouseDetail from "../views/House/Detail";
import Search from "../views/Search/Search";
import Booking from "../views/Booking/Booking";

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
    }, {
        path: "/booking",
        component: Booking,
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
            {
                path: "/detail/:id",
                component: HouseDetail,
            },
        ],
    },
];

export default routes;
