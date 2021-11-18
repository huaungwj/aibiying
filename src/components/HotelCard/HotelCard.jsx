import React, { useEffect } from "react"; // useState
import HotelCardStyle from "./HotelCard.module.css";

/**
 * 首页房源卡片
 * @returns
 */
function HotelCard(props) {
    // const [hotelData, setHotelData] = useState();

    useEffect(() => {
        // setHotelData(props.hotelData);
    }, []);

    return (
        <div className={HotelCardStyle.hc_container}>
            {/* {图片} */}
            {/* <img src={hotelData.thumbnail} /> */}
            {/* 房源信息 */}
            <span></span>
            {/* 房源名称 */}
            <p className={HotelCard.title}></p>
            {/* 价格 */}
            <span className={HotelCard.price}></span>
            {/* 评论 */}
        </div>
    );
}

export default HotelCard;
