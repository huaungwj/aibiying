import LocationOnIcon from "@material-ui/icons/LocationOn";
import PropTypes from "prop-types";
import { useHistory, withRouter } from "react-router";

function SearchResult({
    image,
    address,
    category,
    title,
    description,
    price,
    totalPrice,
    id
}) {
    const history = useHistory();
    return (
        <>
            {/* search item  */}
            <div
                style={{ marginTop: "10px" }}
                className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 bg-white p-5 box-border shadow-xl rounded-xl cursor-pointer"
            >
                <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  p-5">
                    <div className="overflow-hidden rounded-xl   cursor-pointer searchiMageWrapper">
                        <img
                            className="cursor-pointer transform rounded-lg w-full object-fill hover:scale-125 transition duration-700 ease-in-out searchiMage"
                            src={image}
                            alt="images"
                        />
                    </div>

                    <div className="px-3">
                        <div className="pt-3">
                            <LocationOnIcon className="text-gray-400 w-5 h-5" />
                            <span className="text-sm">{address}</span>
                            <h2 className="font-semibold text-2xl mb-1">
                                {title}
                            </h2>
                            <h3 className="text-sm text-gray-500">
                                {description}
                            </h3>
                            <h3 className="text-sm text-gray-500" >
                                HouseType:  {category}
                            </h3>
                            <div className="flex flex-row items-end justify-start md:h-20 lg:h-20 xl:h-20">
                                <span
                                    className="my-5 bg-red-500 text-white text-sm p-2 rounded-full shadow-xl"
                                    onClick={() => {
                                        history.push(`/house/detail/${id}`)
                                    }}
                                >
                                    ViewDetails
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* flex flex-row items-center space-x-2 */}

                <div className="pr-5">
                    <div className="flex flex-row justify-end items-end">
                        {/* <FavoriteBorderIcon /> */}
                    </div>
                    <div className="flex flex-col justify-end items-end md:h-18 lg:h-18 xl:h-18">
                        <h3 className="text-xl font-semibold">{price}</h3>
                        <h4 className="hidden md:block lg:block xl:block texl-md font-normal hover:underline cursor-pointer">
                            {totalPrice}
                        </h4>
                    </div>
                </div>
            </div>
        </>
    );
}

SearchResult.propTypes = {
    image: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    totalPrice: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
};

export default withRouter(SearchResult);
