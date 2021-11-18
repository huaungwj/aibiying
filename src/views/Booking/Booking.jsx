import { useState, useEffect } from "react";
import BookingManage from "../../components/BookingManage/BookingManage";
import { ApiGetBookings } from "../../api";
function Booking() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        requestBooking();
    }, []);

    // request booking list
    const requestBooking = () => {
        ApiGetBookings().then((res) => {
            console.log(res.bookings, bookings);
            setBookings(res.bookings)
        });
    };

    return (
        <div>
            <BookingManage bookings={bookings} />
        </div>
    );
}

export default Booking;
