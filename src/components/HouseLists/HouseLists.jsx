import PropTypes from "prop-types";
import { Button, Space, List, Image, Tag, Rate, Popconfirm, message } from "antd";
import { MessageOutlined } from "@ant-design/icons"

import { ApiHousesDel } from "../../api";

const IconText = ({ icon, text }) => {
    return <Space>
        {icon}
        {text}
    </Space>
};

IconText.propTypes = {
    icon: PropTypes.object,
    text: PropTypes.string,
}

const HouseLists = (props) => {
    return <List
        dataSource={props.dataSource}
        itemLayout="vertical"
        renderItem={house => {
            const address = house.address;
            const deleteHouse = () => {
                ApiHousesDel(house.id).then(res => {
                    message.success("deleted")
                }).catch(err => {
                    message.error(err.response.data.error);
                });
            };
            return <List.Item
                extra={<Image src={house.thumbnail} width={200} />}
                actions={[
                    <IconText icon={<MessageOutlined />} text={house.reviews.length} key="message" />,
                    <Rate disabled key="rate" defaultValue={5} allowHalf />
                ]}
            >
                <h2>{house.title}</h2>
                <p>
                    Address: {address.address || "house address"}
                </p>
                <p>
                    House Type: <Tag color="geekblue">{address.houseType || "house type"}</Tag>
                </p>
                <p>
                    Price: <span className="price-color">${house.price}</span>/night
                </p>
                <p>
                    Beds: {address.beds || "beds"}
                </p>
                <p>
                    Bathrooms: {address.bathrooms || "bathrooms"}
                </p>
                <Space>
                    <Button
                        type="primary"
                        onClick={() => {
                            history.push("/house/add?id=" + house.id);
                        }}
                    >
                        Edit
                    </Button>
                    <Popconfirm
                        title={`confirm delete ${house.title} house ?`}
                        onConfirm={deleteHouse}
                        okText="Confirm"
                        cancelText="cancel"
                    >
                        <Button type="danger">Delete</Button>
                    </Popconfirm>
                </Space>
            </List.Item>
        }}
    />
};

HouseLists.propTypes = {
    dataSource: PropTypes.object
};

export default HouseLists;
