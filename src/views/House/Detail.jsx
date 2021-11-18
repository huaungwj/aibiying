import { useCallback, useEffect, useState } from "react";
import { useHistory, useParams, withRouter } from "react-router";
import PropTypes from "prop-types";
import { Divider, Tag, Space, Rate, Row, Col, Input, Button, DatePicker, message, Comment } from "antd";
import moment from "moment";

import { ApiAddComment, ApiBooking, ApiGetBookings, ApiGetHouse } from "../../api";

import HouseClass from "./house.module.css";
import { useSelector } from "react-redux";

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
    const [stars, setStars] = useState(0);
    const [commentText, setComment] = useState("");
    const currentTime = moment();
    const params = useParams();
    const history = useHistory();
    const userInfo = useSelector(state => state.user);
    const [selectDays, changeDays] = useState({
        day: 0,
        start: 0,
        end: 0,
    });
    const [rateStars, setRateStars] = useState(0);

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
            const data = res.listing;
            setHouseInfo(data);

            const stars = data.reviews.reduce((num, item) => {
                return parseFloat(item.stars) + num;
            }, 0);
            console.log((stars / data.reviews.length) || 0);
            setRateStars((stars / data.reviews.length) || 0)
        }).catch(() => {
            history.push("/");
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
                <Rate
                    disabled
                    allowHalf
                    value={rateStars}
                />
                {houseInfo.reviews.length} Comment
            </Space>

            <Divider />

            <Row className="add-comment" justify="space-around" align="middle">
                <Col span={16}>
                    <Input.TextArea
                        rows={6}
                        placeholder="Tell"
                        value={commentText}
                        onChange={(e) => {
                            setComment(e.target.value);
                        }}
                    />
                </Col>
                <Col span={6}>
                    <Row justify="center">
                        <Rate
                            allowHalf
                            onChange={(stars) => {
                                setStars(stars);
                            }}
                            value={stars}
                        />
                        <Divider />
                        <span>Are you satisfied ?</span>
                    </Row>
                </Col>

                <Col span={23} style={{ marginTop: "20px" }}>
                    <Button
                        block
                        type="primary"
                        onClick={() => {
                            if (stars === 0 || !commentText) {
                                message.error("Please fill in relevant evaluation information")
                                return;
                            }
                            ApiGetBookings().then(res => {
                                const data = res.bookings;
                                const booking = data.find(item => {
                                    if (item.listingId === params.id && houseInfo.owner === userInfo.email) {
                                        return true
                                    }
                                    return item.listingId === params.id && item.owner === userInfo.email;
                                });
                                if (booking) {
                                    // console.log(commentText, stars);
                                    ApiAddComment(params.id, booking.id, {
                                        comment: commentText,
                                        stars,
                                        email: userInfo.email,
                                        time: moment().format("YYYY-MM-DD")
                                    }).then(res => {
                                        message.success("Published Comment successfully !")
                                        setComment("");
                                        setStars(0);
                                        getData();
                                    }).catch(err => {
                                        message.error(err.response.data.error);
                                    });
                                } else {
                                    message.error("You must make a reservation before you can comment");
                                }
                            }).catch(err => {
                                // console.log(err);
                                message.error(err.response.data.error);
                            });
                        }}
                    >
                        Publish Comment
                    </Button>
                </Col>
            </Row>
            <Divider />

            {houseInfo.reviews.map((item, index) => {
                return <Comment
                    key={index}
                    author={<span style={{ fontSize: "16px" }}>{item.email}</span>}
                    content={<>
                        <p>{item.time}</p>
                        <p style={{ fontSize: "16px" }}>{item.comment}</p>
                    </>}
                />
            })}

        </div>
        <div className={HouseClass["detail-price"]}>
            <div className={HouseClass["detail-price-content"]}>
                <span>${houseInfo.price}</span>/night
            </div>

            <Rate disabled value={rateStars} allowHalf style={{ marginBottom: "10px" }} />

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

export default withRouter(HouseDetail);
