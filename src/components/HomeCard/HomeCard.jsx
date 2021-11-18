import React from "react";
import Propstypes from "prop-types";

function HomeCard({ cardImage, cardTitle }) {
    return (
        <>
            <div>
                <div className="rounded-lg overflow-hidden w-80 mx-2 shadow-xl cursor-pointer">
                    <img
                        className="transition duration-700 ease-in-out rounded-lg transform hover:scale-125 object-cover"
                        src={cardImage}
                        alt="images"
                    />
                </div>
                <h1 className="text-gray-900 font-semibold text-xl text-center my-3">
                    {cardTitle}
                </h1>
            </div>
        </>
    );
}

HomeCard.propTypes = {
    cardImage: Propstypes.string.isRequired,
    cardTitle: Propstypes.string.isRequired,
};

export default HomeCard;
