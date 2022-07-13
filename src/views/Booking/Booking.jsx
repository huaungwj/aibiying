import { useState, useEffect } from "react";
import BookingManage from "../../components/BookingManage/BookingManage";
import { ApiGetBookings } from "../../api";
import { useSelector, useDispatch } from "react-redux";
import { setUserVisiable } from "../../store/actions/user";

function Booking() {
    const [bookings, setBookings] = useState([]);
    const UserInfo = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        requestBooking();
    }, [UserInfo.email]);

    // request booking list
    const requestBooking = () => {
        if (!UserInfo.email) {
            dispatch(setUserVisiable(true));
            return;
        }
        ApiGetBookings().then((res) => {
            // console.log(res.bookings, bookings);
            setBookings(res.bookings);
        });
    };

    return (
        <div>
            <BookingManage bookings={bookings} />
        </div>
    );
}

export default Booking;
