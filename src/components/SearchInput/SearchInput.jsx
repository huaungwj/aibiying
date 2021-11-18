import React, { useState } from "react";
import SearchInputStyle from "./SearchInput.module.css";
import { Slider, InputNumber, DatePicker } from "antd"; // InputNumber, DatePicker
import {
    DownOutlined,
    CalendarOutlined,
    DollarOutlined,
    MessageOutlined,
} from "@ant-design/icons";

const { RangePicker } = DatePicker;
function SearchInput() {
    // 搜索 表单数据
    const [searchFormData, setSearchFormData] = useState({
        bedroomsNumber: 1, // 客房数量
        rangDate: "", // 日期范围
        price: 100,
    });

    // 卧室选择发生变化
    const onChangeBedroomsNumber = (value) => {
        console.log(value);
        const data = { ...JSON.parse(JSON.stringify(searchFormData)) };
        data.bedroomsNumber = value;
        setSearchFormData(data);
    };
    // 日期范围发生变化
    const rangDateChange = (dates, dateStrings) => {
        console.log(dates, dateStrings);
    };
    // {/* 卧室数量 、日期范围、价格、评论评分 从最高到最低评论评级或从最低到最高评论评级对结果进行排序,具体取决于 如果有多个列表具有相同的评级,则它们的顾序无关紧要 */}
    return (
        <div className={SearchInputStyle.searchInputBox}>
            {/* 卧室数量 滑块选择 */}
            <div
                className={
                    SearchInputStyle.bedroomsNumber +
                    " " +
                    SearchInputStyle.rightBorder
                }
            >
                <button
                    className={`${
                        SearchInputStyle.commonButton +
                        " " +
                        SearchInputStyle.bedroomsButton
                    }`}
                >
                    卧室数量
                    <DownOutlined />
                </button>
                <div className={SearchInputStyle.sliderBox}>
                    <Slider
                        min={1}
                        max={16}
                        onChange={onChangeBedroomsNumber}
                        value={
                            typeof searchFormData.bedroomsNumber === "number"
                                ? searchFormData.bedroomsNumber
                                : 0
                        }
                    />
                    <InputNumber
                        min={1}
                        max={20}
                        style={{ margin: "0 16px" }}
                        value={searchFormData.bedroomsNumber}
                        onChange={onChangeBedroomsNumber}
                    />
                </div>
            </div>
            {/* 日期范围 */}
            <div
                className={
                    SearchInputStyle.dateRang +
                    " " +
                    SearchInputStyle.rightBorder
                }
            >
                <button
                    className={`${
                        SearchInputStyle.commonButton +
                        " " +
                        SearchInputStyle.dateRangButton
                    }`}
                >
                    <CalendarOutlined />
                    入住日期-退房日期
                </button>
                <div className={SearchInputStyle.dateRangShowBox}>
                    <RangePicker onChange={rangDateChange} />
                </div>
            </div>
            {/* {价格范围} */}
            <div
                className={
                    SearchInputStyle.priceRang +
                    " " +
                    SearchInputStyle.rightBorder
                }
            >
                <button
                    className={`${
                        SearchInputStyle.commonButton +
                        " " +
                        SearchInputStyle.bedroomsButton
                    }`}
                >
                    <DollarOutlined />
                    价格范围
                </button>
                <div className={SearchInputStyle.priceRangShowBox}>
                    <Slider
                        range={{ draggableTrack: true }}
                        defaultValue={[20, 50]}
                    />
                </div>
            </div>
            {/* {评论评分} */}
            <div
                className={
                    SearchInputStyle.commentBox +
                    " " +
                    SearchInputStyle.rightBorder
                }
            >
                <button
                    className={`${
                        SearchInputStyle.commonButton +
                        " " +
                        SearchInputStyle.commentbutton
                    }`}
                >
                    评论排序
                    <MessageOutlined />
                </button>
                <div className={SearchInputStyle.commonShowBox}></div>
            </div>
        </div>
    );
}

export default SearchInput;
