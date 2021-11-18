import { Button } from "@material-ui/core";
import React, { useState, useCallback, useEffect } from "react";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Search from "../Search/Search";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as SearchAction from "../../store/actions/search";

function Banner() {
    const [showSearch, setShowSearch] = useState(false);
    const [showGuests, setShowGuests] = useState(false);
    const [bedroomsNumber, setBedroomsNumber] = useState(0);
    const [price, setPrice] = useState(0);
    const [scoreNumber, setScoreNumber] = useState(0);
    const dispatch = useDispatch();
    // const SearchState = useSelector(state => state.search);useSelector

    // price change
    const priceChange = useCallback((e) => {
        if (!e.target.value.trim()) return setPrice(0);
        console.log(e.target.value);
        setPrice(parseInt(e.target.value));
    });
    // params change
    useEffect(() => {
        dispatch(SearchAction.setSearchParams({
            bedroomsNumber,
            price,
            scoreNumber,
            keyword: "",
        }))
        // console.log(SearchState);
    }, [bedroomsNumber, price, scoreNumber])

    return (
        <>
            <div className="relative banner bg-no-repeat bg-fixed bg-cover">
                <div className="max-w-screen-lg mx-auto">
                    {showSearch && <Search />}
                    {/* search */}
                    <div className="flex flex-row flex-grow w-full justify-center space-x-4 items-center bg-gray-100 rounded-full relative top-10 hidden lg:inline-flex xl:inline-flex m-5">
                        <div className=" px-5 py-3  rounded-full hover:bg-gray-200 hover:shadow-lg cursor-pointer">
                            <h2 className="text-sm font-bold text-gray-700">
                                Location
                            </h2>
                            <span className="text-gray-600 text-sm">
                                Where are you going ?
                            </span>
                        </div>

                        <div
                            className=" px-8 py-3  rounded-full hover:bg-gray-200 hover:shadow-lg cursor-pointer"
                            onClick={() => {
                                setShowSearch(!showSearch);
                            }}
                        >
                            <h2 className="text-sm font-bold text-gray-700">
                                Check in
                            </h2>
                            <span className="text-gray-600 text-sm">
                                {!showSearch ? "Add Dates" : "Hide Dates"}
                            </span>
                        </div>

                        <div
                            className=" px-8 py-3  rounded-full hover:bg-gray-200 hover:shadow-lg cursor-pointer"
                            onClick={() => {
                                setShowSearch(!showSearch);
                            }}
                        >
                            <h2 className="text-sm font-bold text-gray-700">
                                Check out
                            </h2>
                            <span className="text-gray-600 text-sm">
                                {!showSearch ? "Add Dates" : "Hide Dates"}
                            </span>
                        </div>

                        <div
                            className=" px-8 py-3  rounded-full hover:bg-gray-200 hover:shadow-lg cursor-pointer"
                            onClick={() => {
                                setShowGuests(!showGuests);
                            }}
                        >
                            <h2 className="text-sm font-bold text-gray-700">
                                other
                            </h2>
                            <span className="text-gray-600 text-sm">
                                {/* {adultsCounter +
                                    childrenCounter +
                                    infantCounter}{" "} */}
                                screen
                            </span>
                        </div>
                        <Link to="/search">
                            <SearchOutlinedIcon className="searchIconDate bg-red-500 text-white rounded-full p-1" />
                        </Link>
                    </div>

                    {/* guestes  */}
                    {showGuests && (
                        <div className="absolute bg-white right-60 rounded-xl shadow-xl p-8">
                            <div className="flex space-x-14 items-center border-b-2 border-gray-100 py-3">
                                <div>
                                    <h1 className="font-bold">bedroom</h1>
                                    <span className="text-sm">
                                        Please select the number of bedrooms
                                    </span>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <RemoveIcon
                                        className="text-gray-600 border border-gray-300 rounded-full cursor-pointer p-1"
                                        onClick={() => {
                                            if (bedroomsNumber > 0) {
                                                setBedroomsNumber(
                                                    bedroomsNumber - 1
                                                );
                                            } else {
                                                setBedroomsNumber(0);
                                            }
                                        }}
                                    />
                                    <span>{bedroomsNumber}</span>
                                    <AddIcon
                                        className="text-gray-600 border border-gray-300 rounded-full cursor-pointer p-1"
                                        onClick={() => {
                                            if (bedroomsNumber < 5) {
                                                setBedroomsNumber(
                                                    bedroomsNumber + 1
                                                );
                                            } else {
                                                setBedroomsNumber(5);
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-grow flex-row items-center border-b-2 border-gray-100 py-3">
                                <div className="w-full">
                                    <h1 className="font-bold">Price</h1>
                                    <span className="text-sm">
                                        Please choose the price you can accept
                                    </span>
                                </div>

                                <div className="flex items-center flex-row justify-end space-x-3">
                                    <RemoveIcon
                                        className="text-gray-600 border border-gray-300 rounded-full cursor-pointer p-1"
                                        onClick={() => {
                                            if (price > 0) {
                                                setPrice(price - 200);
                                            } else {
                                                setPrice(0);
                                            }
                                        }}
                                    />
                                    <input
                                        style={{
                                            width: "50px",
                                            textAlign: "center",
                                        }}
                                        value={price}
                                        onChange={priceChange}
                                    />
                                    <AddIcon
                                        className="text-gray-600 border border-gray-300 rounded-full cursor-pointer p-1"
                                        onClick={() => {
                                            if (price >= 0) {
                                                setPrice(price + 200);
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="flex space-x-14 items-center border-b-2 border-gray-100 py-3">
                                <div className="w-full">
                                    <h1 className="font-bold">score</h1>
                                    <span className="text-sm">
                                        Please select a score that you can
                                        accept
                                    </span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <RemoveIcon
                                        className="text-gray-600 border border-gray-300 rounded-full cursor-pointer p-1"
                                        onClick={() => {
                                            if (scoreNumber > 0) {
                                                setScoreNumber(scoreNumber - 1);
                                            } else {
                                                setScoreNumber(0);
                                            }
                                        }}
                                    />
                                    <span>{scoreNumber}</span>
                                    <AddIcon
                                        className="text-gray-600 border border-gray-300 rounded-full cursor-pointer p-1"
                                        onClick={() => {
                                            if (scoreNumber < 5) {
                                                setScoreNumber(scoreNumber + 1);
                                            } else {
                                                setScoreNumber(5);
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bannerInfo px-5 py-2">
                        <h5 className="text-white font-bold text-xl pb-3">
                            Airbnb{" "}
                            <span className="bg-gray-900 text-white rounded-lg p-1">
                                2021
                            </span>
                        </h5>
                        <h1 className="text-white font-semibold text-4xl lg:text-5xl xl:text-5xl">
                            Introducing 100+ <br /> upgrades across <br />
                            our entire service
                        </h1>
                        <Link to="/search">
                            <Button className="w-40 bannerButton my-4">
                                Learn whats new
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
// export {adultsCounter,childrenCounter,infantCounter}
export default Banner;
