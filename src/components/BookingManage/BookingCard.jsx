import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import moment from "moment";
import PropsTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { ApiGetHouse, ApiAcceptBooking } from "../../api";
import { message } from "antd";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        minWidth: 300,
        width: "330px",
    },
    media: {
        height: 140,
    },
});

const BookingCard = ({ booking }) => {
    const classes = useStyles();
    const [bookingDetail, setBookDetail] = useState();

    useEffect(() => {
        // console.log(booking);
        getDetailBooking();
    }, []);

    const getDetailBooking = () => {
        ApiGetHouse(booking.listingId).then((res) => {
            // console.log(res, bookingDetail);
            setBookDetail(res.listing);
        });
    };

    const leaseAction = (status) => {
        if (status) {
            ApiAcceptBooking(booking.id)
                .then((res) => {
                    // console.log(res);
                })
                .catch((err) => {
                    // console.log(err);
                    message.error(`${err} `);
                });
        }
    };

    return (
        <Card style={{ marginRight: "30px" }} className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={bookingDetail?.thumbnail}
                    title="Contemplative Reptile"
                />
                <CardContent style={{ height: "350px" }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {bookingDetail?.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        <p>{"address: Beijing"}</p>
                        <p>{`ReleaseTime: ${moment(
                            bookingDetail?.postedOn
                        ).format("YYYY-MM-DD")}`}</p>
                        <p>{"startAt: 2021-11-18"}</p>
                        <p>{"endAt: 2021-11-18"}</p>
                        <p>{"total: $2000"}</p>
                        <p>
                            status:
                            <span style={{ color: "red" }}>
                                {" " + booking.status}
                            </span>
                        </p>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button
                    style={{ cursor: "pointer" }}
                    size="small"
                    color="secondary"
                    disabled={booking.status !== "pending"}
                    onClick={() => {
                        leaseAction(true);
                    }}
                >
                    lease
                </Button>
                <Button
                    size="small"
                    color="secondary"
                    disabled={booking.status !== "pending"}
                    onClick={() => {
                        leaseAction(false);
                    }}
                >
                    Refuse to rent
                </Button>
            </CardActions>
        </Card>
    );
};

BookingCard.propTypes = {
    booking: PropsTypes.shape({
        listingId: PropsTypes.string,
        id: PropsTypes.number,
        status: PropsTypes.string,
        title: PropsTypes.string,
        startAt: PropsTypes.string,
        endAt: PropsTypes.string,
        days: PropsTypes.string,
        totalPrice: PropsTypes.number,
        createdAt: PropsTypes.string,
    }),
};

export default BookingCard;
