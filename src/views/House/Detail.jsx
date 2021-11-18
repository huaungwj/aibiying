import { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import PropTypes from "prop-types";
import { Divider, Tag, Space, Rate, Row, Col, Input, Button, DatePicker, message } from "antd";
import moment from "moment";

import { ApiBooking, ApiGetHouse } from "../../api";

import HouseClass from "./house.module.css";

const TagLists = (props) => {
    return <Space style={{ display: "flex", marginTop: "10px" }}>
        {props.text.split("\n").map(item => {
            return <Tag key={item} color="geekblue">{item}</Tag>
        })}
    </Space>
};

TagLists.propTypes = {
    text: PropTypes.string
};

const HouseDetail = () => {
    const currentTime = moment();
    const params = useParams();
    const history = useHistory();
    const [selectDays, changeDays] = useState({
        day: 0,
        start: 0,
        end: 0,
    });

    const [houseInfo, setHouseInfo] = useState({
        address: {
            bedtypes: "",
            amenities: "",
        },
        reviews: [],
    });

    const getData = () => {
        ApiGetHouse(params.id).then(res => {
            // console.log(res.listing);
            setHouseInfo(res.listing);
        }).catch(() => {
            history.back();
        })
    };

    const disabledDate = useCallback(current => {
        const isDisable = current._d < new Date();
        if (isDisable && current.date() === currentTime.date() && current.month() === currentTime.month()) {
            return false;
        }
        return isDisable;
    }, [])

    const diffDate = useCallback((value) => {
        if (value && value[1] && value[0]) {
            // console.log(value[1].diff(value[0], "days"));
            // console.log(value[0].format("YYYY-MM-DD"));
            changeDays({
                day: value[1].diff(value[0], "days"),
                start: value[0].format("YYYY-MM-DD"),
                end: value[1].format("YYYY-MM-DD")
            });
            return;
        }
        changeDays(0);
    }, [])

    useEffect(() => {
        getData();
    }, [])

    return <div className={`aby_container ${HouseClass["detail-container"]}`}>
        <div className={HouseClass["detail-content"]}>
            <h1 style={{ fontSize: "32px" }}>{houseInfo.title}</h1>
            <Divider />
            <p>Housetype: {houseInfo.address.houseType}</p>
            <p>Address: {houseInfo.address.address}</p>
            <p>Bathrooms: {houseInfo.address.bathrooms}</p>
            <p>Bedrooms: {houseInfo.address.bedrooms}</p>
            <p>Beds: {houseInfo.address.beds}</p>
            <div>
                Bedtypes:
                <TagLists text={houseInfo.address.bedtypes} />
            </div>
            <div>
                Amenities:
                <TagLists text={houseInfo.address.amenities} />
            </div>

            <h3 style={{ marginTop: "40px", fontSize: "28px" }}>
                Comment
            </h3>

            <Space align="center">
                <Rate disabled defaultValue={0} allowHalf />
                {houseInfo.reviews.length} Comment
            </Space>

            <Divider />

            <Row className="add-comment" justify="space-around" align="middle">
                <Col span={16}>
                    <Input.TextArea rows={6} placeholder="Tell" />
                </Col>
                <Col span={6}>
                    <Row justify="center">
                        <Rate allowHalf />
                        <Divider />
                        <span>Are you satisfied ?</span>
                    </Row>
                </Col>
            </Row>
            <Divider />
        </div>
        <div className={HouseClass["detail-price"]}>
            <div className={HouseClass["detail-price-content"]}>
                <span>${houseInfo.price}</span>/night
            </div>

            <Rate disabled defaultValue={0} allowHalf style={{ marginBottom: "10px" }} />

            <DatePicker.RangePicker
                disabledDate={disabledDate}
                onChange={diffDate}
            />

            <Space style={{ marginTop: "10px" }} className={HouseClass["detail-price-content"]}>
                <span>${houseInfo.price}</span>
                x
                {selectDays.day}night
                =
                <span>${houseInfo.price * selectDays.day}</span>
            </Space>

            <Button
                type="primary"
                block
                style={{ marginTop: "10px" }}
                onClick={() => {
                    if (!selectDays.day && !selectDays.start && !selectDays.end) {
                        message.error("You must select date");
                        return;
                    }
                    ApiBooking(params.id, {
                        dateRange: selectDays,
                        totalPrice: selectDays.day * houseInfo.price
                    }).then(res => {
                        message.success("bookinged")
                    }).catch(err => {
                        message.error(err.response.data.error);
                    })
                }}
            >
                Booking
                ${houseInfo.price * selectDays.day}
            </Button>
        </div>
    </div>
};

export default HouseDetail;
