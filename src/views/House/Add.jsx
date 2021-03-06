import {
    Divider,
    Form,
    Input,
    Upload,
    Image,
    Button,
    Space,
    message,
} from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import qs from "qs";

import HouseClass from "./house.module.css";
// import UserClass from "../User/index.module.css";

import { ApiHouseAdd, ApiGetHouse, ApiUpdateHouse } from "../../api";
import { withRouter, useLocation, useHistory } from "react-router";
import { useSelector } from "react-redux";

const formItem = [
    {
        label: "Title",
        name: "title",
        placeholder: "Title",
        rules: [{ required: true, message: "Title is Required" }],
    },
    {
        label: "House Type",
        name: "houseType",
        placeholder: "House Type",
        rules: [{ required: true, message: "House Type is Required" }],
    },
    {
        label: "Address",
        name: "address",
        placeholder: "House Address",
        rules: [{ required: true, message: "Address is Required" }],
    },
    {
        label: "Price",
        name: "price",
        placeholder: "Price",
        rules: [{ required: true, message: "Price is Required" }],
    },
    {
        label: "Bathrooms",
        name: "bathrooms",
        placeholder: "Bathrooms",
        rules: [{ required: true, message: "Bathrooms is Required" }],
    },
    {
        label: "Bedrooms",
        name: "bedrooms",
        placeholder: "Bedrooms",
        rules: [{ required: true, message: "Bedrooms is Required" }],
    },
    {
        label: "Beds",
        name: "beds",
        placeholder: "Beds",
        rules: [{ required: true, message: "Beds is Required" }],
    },
    {
        label: "Bedtypes",
        name: "bedtypes",
        placeholder: "Bedtypes",
        rules: [{ required: true, message: "Bedtypes is Required" }],
        textarea: true,
        rows: 6,
    },
    {
        label: "Amenities",
        name: "amenities",
        placeholder: "Amenities",
        rules: [{ required: true, message: "Amenities is Required" }],
        textarea: true,
        rows: 6,
    },
];

// const defaultThumbnail = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="

const HouseAdd = () => {
    const beforeUpload = useCallback(() => false, []);
    const [fileList, setFileList] = useState([]);
    const userInfo = useSelector((state) => state.user);
    const form = useRef();
    const history = useHistory();
    const location = useLocation();
    const [id, setId] = useState(null);

    const handleChange = useCallback((filelist) => {
        // console.log(filelist);
        setFileList(filelist.fileList);
    }, []);

    const renderUploadList = useCallback((originNode, file, fileList, actions) => {
        let src;
        if (file.thumbnail) {
            src = file.thumbnail;
        } else {
            src = URL.createObjectURL(file.originFileObj);
        }
        return <Image src={src} width={400} />
    }, []);

    useEffect(() => {
        const query = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });
        if (!query.id) {
            return
        }
        ApiGetHouse(query.id).then(res => {
            let data = res.listing;
            if (data.owner !== userInfo.email) {
                return;
            }
            data = {
                title: data.title,
                price: data.price,
                ...data.address,
                thumbnail: data.thumbnail,
            };

            setFileList([{
                thumbnail: data.thumbnail,
            }]);

            setId(query.id);
            form.current.setFieldsValue(data);
        }).catch(() => {
            message.error("You don't have this listing")
        });
    }, [userInfo]);

    // const initialState = formItem.reduce((obj, item) => {
    //     obj[item.name] = "1";
    //     return obj;
    // }, {})

    const handleFinish = useCallback(
        (value) => {
            const handleHouse = () => {
                value.thumbnail = value.thumbnail || fileList[0].thumbnail;
                // console.log(id, value);
                (id ? ApiUpdateHouse(id, value) : ApiHouseAdd(value))
                    .then((res) => {
                        message.success(id ? "success update" : "success add");
                        form.current?.resetFields();
                        setFileList([]);
                        if (id) {
                            history.push("/house/add");
                        }
                    })
                    .catch((err) => {
                        console.dir(err);
                        // message.error(err);
                    });
            };

            if (fileList.length === 0 && !value.thumbnail) {
                message.error("You must upload thumbnail");
                return;
            }

            const file = fileList[0].originFileObj;
            if (fileList[0].thumbnail) {
                handleHouse();
            } else {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file, "base64");
                fileReader.onload = (e) => {
                    value.thumbnail = e.target.result;
                    handleHouse();
                };
            }
        },
        [fileList, id]
    );

    return (
        <div className={`aby_container ${HouseClass["house-add"]}`}>
            <h1 className={`${HouseClass["house-title"]}`}>House New</h1>
            <Divider></Divider>
            <Form
                labelCol={{ span: 2 }}
                onFinish={handleFinish}
                ref={form}
            >
                {formItem.map((itemConf) => {
                    return (
                        <Form.Item
                            label={itemConf.label}
                            name={itemConf.name}
                            rules={itemConf.rules}
                            key={itemConf.name}
                        >
                            {itemConf.textarea
                                ? (
                                    <Input.TextArea
                                        rows={itemConf.rows}
                                        placeholder={itemConf.placeholder}
                                    />
                                )
                                : (
                                    <Input placeholder={itemConf.placeholder} />
                                )
                            }
                        </Form.Item>
                    );
                })}

                <Form.Item label="Thumbnail" name="thumbnail">
                    <Upload
                        beforeUpload={beforeUpload}
                        fileList={fileList}
                        onChange={handleChange}
                        itemRender={renderUploadList}
                        maxCount={1}
                        className={`${HouseClass["house-upload"]}`}
                    >
                        <Button type="primary" style={{ marginBottom: "10px" }}>
                            Click Upload Image
                        </Button>
                    </Upload>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 2 }}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                        <Button htmlType="reset">Cancel</Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
};

export default withRouter(HouseAdd);
