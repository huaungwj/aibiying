import { Link } from "react-router-dom";
import BookingCard from "./BookingCard";
import PropsTypes from "prop-types";
//  /* <BookingCard key={booking.id} booking={booking} /> */
function BookingManage(props) {
    const { bookings } = props;

    return (
        <div
            className="aby_container"
            style={{ marginTop: "80px", fontSize: "32px" }}
            data-testid="bookingBox"
        >
            <section id="userBookings">
                <h1 className="page-title" data-testid="page-title">My Bookings</h1>
                <p data-testid="page-desc">Please manage your listing information!  </p >
                <div
                    className="row card-deck"
                    style={{
                        display: "flex",
                        flex: 1,
                        flexWrap: "wrap",
                        justifyContent: "flex-start",
                    }}
                >
                    {bookings?.map((booking) => {
                        return (
                            <>
                                <BookingCard
                                    key={booking.id}
                                    booking={booking}
                                />
                            </>
                        );
                    })}
                </div>
                {bookings?.length === 0 && (
                    <div className="alert alert-warning">
                        You have no bookings created go to rentals section and
                        book your place today.
                        <Link
                            style={{ marginLeft: "10px" }}
                            className="btn btn-bwm"
                            to="/rentals"
                        >
                            Available Rental
                        </Link>
                    </div>
                )}
            </section>
        </div>
    );
}

BookingManage.propTypes = {
    bookings: PropsTypes.array,
};

export default BookingManage;
