import { useCallback, useEffect, useState } from "react";
import { Button, Space, Divider, Popconfirm, message } from "antd";
import { useHistory, withRouter } from "react-router";
import { useSelector } from "react-redux";

import HouseClass from "./house.module.css";
import { ApiGetHouse, ApiGetHouses, ApiPublishHouse, ApiUnPublishHouse } from "../../api";
import HouseLists from "../../components/HouseLists/HouseLists";

function stopPropagation(e) {
    e.stopPropagation();
}

const HouseList = () => {
    const history = useHistory();
    const userInfo = useSelector(state => state.user);
    const [houses, setHousesState] = useState([]);

    const toHouseAdd = useCallback(() => {
        history.push("/house/add");
    }, []);

    const getData = useCallback(() => {
        const req = ApiGetHouses();
        req.then(res => {
            const data = res.listings.filter(item => item.owner === userInfo.email);
            // console.log(res.listings);
            const promises = Promise.all(data.map(item => {
                return ApiGetHouse(item.id);
            }));
            promises.then(res => {
                res.forEach((item, index) => {
                    item = item.listing;
                    data[index].published = item.published;
                });
                setHousesState(data);
            });
        }).catch(err => {
            console.log("house list cancel", err);
        });
        return req;
    }, [userInfo.email])

    useEffect(() => {
        const req = getData();
        return () => {
            req.source && req.source.cancel("cancel");
        }
    }, [userInfo.email]);

    return <div className={`aby_container ${HouseClass["house-list"]}`}>
        <h1 className={HouseClass["house-title"]}>House List</h1>
        <Space>
            <Button onClick={toHouseAdd}>Add House</Button>
        </Space>
        <Divider></Divider>
        <HouseLists
            dataSource={houses}
            onDelete={getData}
            action={(house) => {
                // console.log(house);
                if (house.published) {
                    return <Popconfirm
                        title={`Do you unpublish ${house.title} ?`}
                        okText="confirm"
                        onCancel="cancel"
                        onConfirm={(e) => {
                            stopPropagation(e);
                            ApiUnPublishHouse(house.id).then(res => {
                                message.success(`unpublish ${house.title}`);
                                getData();
                            }).catch(err => {
                                message.error(err.response.data.error);
                            })
                        }}
                    >
                        <Button type="danger" onClick={stopPropagation}>Unpublish</Button>
                    </Popconfirm>
                }
                return <Button
                    type="text"
                    onClick={(e) => {
                        stopPropagation(e);
                        ApiPublishHouse(house.id).then(res => {
                            message.success("publish " + house.title);
                            getData();
                        }).catch(err => {
                            message.error(err.response.data.error);
                        })
                    }}
                >
                    Publish
                </Button>
            }}
        />
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
