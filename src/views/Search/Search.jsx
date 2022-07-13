import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import SearchData from "../../tools/SearchData.json";
import SearchResult from "../../components/SearchResult/SearchResult";
import { useSelector } from "react-redux";
import { ApiGetHouses } from "../../api";
import { message } from "antd";

function Search() {
    const [data, setData] = useState(SearchData);
    const [metaData, setMetaData] = useState([]);
    // const dispatch = useDispatch();
    const SearchState = useSelector((state) => state.search);
    // hotel number
    const [hotelNumber, setHotelNumber] = useState(0);

    const filteringPlace = (location) => {
        const filterPlace = metaData.filter((item) => {
            return item.address.address === location;
        });

        setData(filterPlace);
    };

    const filteringKeyWord = (keyword, data) => {
        const filterPlace = data.filter((item) => {
            // console.log(item.title.indexOf(keyword));
            return item.title.indexOf(keyword) >= 0;
        });

        return filterPlace;
    };

    // number type filter
    const filterNumber = (name, number, data, isAddress) => {
        const filterPlace = data.filter((item) => {
            // console.log(item.address?.bathrooms);
            // console.log(isAddress ? item.address[isAddress] : item[name]);
            return (
                Number(isAddress ? item?.address[isAddress] : item[name]) >=
                number
            );
        });
        return filterPlace;
    };

    useEffect(() => {
        // fiiter
        getData();
        // console.log(SearchState);
    }, []);

    useEffect(() => {
        getData()
    }, [SearchState.searchParam.keyword]);

    // nowPage FilterCondition
    const nowPageFilter = (data) => {
        // console.log(SearchState.searchParam.price);
        let filterResult = data;
        // price filter
        if (parseInt(SearchState.searchParam.price) > 0) {
            // filter price
            filterResult = filterNumber(
                "price",
                SearchState.searchParam.price,
                data
            );
        }

        // filter bedrooms
        if (parseInt(SearchState.searchParam.bedroomsNumber) > 0) {
            filterResult = filterNumber(
                "address",
                SearchState.searchParam.bedroomsNumber,
                data,
                "bedrooms"
            );
        }

        // filter keyword
        if (SearchState.searchParam.keyword.trim()) {
            // console.log(SearchState.searchParam.keyword);
            filterResult = filteringKeyWord(
                SearchState.searchParam.keyword,
                data
            );
        }

        // no filter scrope
        // console.log(filterResult);

        return filterResult;
    };

    // request data
    const getData = () => {
        ApiGetHouses()
            .then((res) => {
                // console.log(res.listings);
                const filterResult = nowPageFilter(res.listings);
                setData(filterResult);
                setMetaData(filterResult);
                // filter'
                setHotelNumber(filterResult.length);
            })
            .catch((err) => {
                message.error(err);
            });
    };

    return (
        <div className="w-full h-screen max-w-screen-lg mx-auto mt-24 ">
            <div className="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-3  xl:grid-cols-3 ">
                <div className="m-5 col-span-4">
                    <span className="text-sm mt-5">
                        {hotelNumber}+
                        {/* {SearchState.searchParam?.startDate.toUTCString()} */}
                    </span>
                    <h1 className="font-bold text-3xl mt-2">
                        More than 16000 tenants checked into airbnb. The average
                        score of tenants is 4.7 stars, with a full score of 5
                        stars.
                    </h1>

                    <div className="flex flex-row space-x-3 my-5">
                        <Button
                            variant="outlined"
                            className="SearchPageButton"
                            onClick={() => {
                                getData();
                            }}
                        >
                            All
                        </Button>
                        <Button
                            variant="outlined"
                            className="SearchPageButton"
                            onClick={() => {
                                filteringPlace("BeiJing");
                            }}
                        >
                            BeiJing
                        </Button>
                        <Button
                            variant="outlined"
                            className="SearchPageButton"
                            onClick={() => {
                                filteringPlace("Kolkata");
                            }}
                        >
                            Kolkata
                        </Button>
                        <Button
                            variant="outlined"
                            className="SearchPageButton"
                            onClick={() => {
                                filteringPlace("London");
                            }}
                        >
                            London
                        </Button>
                        <Button
                            variant="outlined"
                            className="SearchPageButton"
                            onClick={() => {
                                filteringPlace("Dorset");
                            }}
                        >
                            Dorset
                        </Button>
                    </div>

                    {/* Search result data  */}

                    <div className="col-span-1">
                        {data.map((items) => {
                            return (
                                <SearchResult
                                    key={items.id}
                                    id={items.id}
                                    image={
                                        items.thumbnail ? items.thumbnail : ""
                                    }
                                    address={
                                        items.address?.address
                                            ? items.address?.address
                                            : ""
                                    }
                                    category={
                                        items.address?.houseType
                                            ? items.address?.houseType
                                            : ""
                                    }
                                    title={items.title}
                                    description={`${items.address?.bedrooms}bedrooms. ${items.address?.bathrooms}bathrooms. ${items.address?.beds} beds. `}
                                    price={`$${items.price} / night`}
                                    totalPrice={`$${items.price * 3} total`}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* map  */}
                {/* <div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116834.00977760056!2d90.34928563247215!3d23.780777744825183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1622704462590!5m2!1sen!2sbd"
                        width="500"
                        style={{ border: "0px", height: "100%" }}
                        allowFullScreen=""
                        title="map"
                    ></iframe>
                </div> */}
            </div>
        </div>
    );
}

export default Search;
