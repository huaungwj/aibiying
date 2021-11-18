import { useCallback, useEffect, useState } from "react";
import { Button, Space, Divider } from "antd";
import { useHistory, withRouter } from "react-router";
import { useSelector } from "react-redux";

import HouseClass from "./house.module.css";
import { ApiGetHouses } from "../../api";
import HouseLists from "../../components/HouseLists/HouseLists";

const HouseList = () => {
    const history = useHistory();
    const userInfo = useSelector(state => state.user);
    const [houses, setHousesState] = useState([]);

    const toHouseAdd = useCallback(() => {
        history.push("/house/add");
    }, [])

    useEffect(() => {
        ApiGetHouses().then(res => {
            // console.log(res);
            setHousesState(res.listings.filter(item => item.owner === userInfo.email));
        });
    }, [userInfo]);

    return <div className={`aby_container ${HouseClass["house-list"]}`}>
        <h1 className={HouseClass["house-title"]}>House List</h1>
        <Space>
            <Button onClick={toHouseAdd}>Add House</Button>
        </Space>
        <Divider></Divider>
        <HouseLists dataSource={houses} />
        {/* {houses.map(house => {
            return <List key={house.title}>
                <List.Item
                    extra={<Image src={house.thumbnail} width={200} />}
                >
                    <List.Item.Meta
                        title={house.title}
                    />
                    <p></p>
                </List.Item>
            </List>
        })} */}
    </div>
};

export default withRouter(HouseList);
