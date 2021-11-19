import { useCallback, useRef, useState } from "react";
import { Modal, Form, Input, Divider, message } from "antd";
import { useDispatch, useSelector } from "react-redux";

import Style from "./index.module.css";
import Api, { StorageTokenName } from "../../api";
import * as UserAction from "../../store/actions/user";

function User(props) {
    const [isRegister, setRegisterState] = useState(false);
    const form = useRef();
    const dispatch = useDispatch();
    const UserState = useSelector((state) => state.user);

    const changeLoginType = useCallback(() => {
        form.current.resetFields();
        setRegisterState(!isRegister);
    }, [isRegister]);

    const onFinish = useCallback(
        (value) => {
            // console.log(value);
            const successFn = (res) => {
                const data = {
                    email: value.email,
                    name: value.email,
                    token: res.token,
                };
                dispatch(UserAction.setUserInfo(data));
                message.success("Login succeeded");
                localStorage.setItem(StorageTokenName, JSON.stringify(data));
                onCancel();
            };
            if (isRegister) {
                Api.Register(value)
                    .then(successFn)
                    .catch((err) => {
                        message.error(
                            `${err.response.data.error}. You Can to Login`
                        );
                    });
                return;
            }
            Api.Login(value)
                .then(successFn)
                .catch((err) => {
                    message.error(
                        `${err.response.data.error}. You Can to Register`
                    );
                });
        },
        [isRegister]
    );

    const initialState = {};

    const onCancel = useCallback(() => {
        dispatch(UserAction.setUserVisiable(false));
    }, []);

    return (
        <>
            <Modal
                visible={UserState.visible}
                title="Log in or sign up"
                footer={false}
                className={Style["ant-modal-content"]}
                onCancel={onCancel}
            >
                <h2>Welcome to Airbnb</h2>
                <Form
                    ref={form}
                    onFinish={onFinish}
                    initialValues={initialState}
                >
                    {isRegister && (
                        <Form.Item
                            className={Style["input-control-container"]}
                            name="name"
                            rules={[
                                { required: true, message: "Name is Required" },
                            ]}
                        >
                            <Input
                                placeholder="Name"
                                className={Style["login-control"]}
                            />
                        </Form.Item>
                    )}

                    <Form.Item
                        className={Style["input-control-container"]}
                        name="email"
                        rules={[
                            { required: true, message: "Email is Required" },
                            {
                                pattern: /^[A-Za-z0-9]+@\w+(\.\w+)+$/,
                                message:
                                    "Please input the correct Email format.",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Email"
                            className={Style["login-control"]}
                        />
                    </Form.Item>

                    <Form.Item
                        className={Style["input-control-container"]}
                        name="password"
                        rules={[
                            { required: true, message: "Password is Required" },
                        ]}
                    >
                        <Input
                            placeholder="Password"
                            className={Style["login-control"]}
                            type="password"
                        />
                    </Form.Item>

                    {isRegister && (
                        <Form.Item
                            className={Style["input-control-container"]}
                            name="confirm"
                            rules={[
                                {
                                    required: true,
                                    message: "Confirm Password is Required",
                                },
                                {
                                    validator(rule, value = "") {
                                        if (
                                            value.trim() &&
                                            form.current.getFieldValue(
                                                "password"
                                            ) !== value
                                        ) {
                                            return Promise.reject(
                                                new RangeError(
                                                    "Passwords do not match"
                                                )
                                            );
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        >
                            <Input
                                placeholder="Confirm Password"
                                className={Style["login-control"]}
                                type="password"
                            />
                        </Form.Item>
                    )}

                    <button className={Style["login-button"]}>Continue</button>
                </Form>
                <Divider plain>or</Divider>
                <button
                    className={Style["login-button-continue"]}
                    onClick={changeLoginType}
                >
                    {isRegister
                        ? "Continue with Login"
                        : "Continue with Register"}
                </button>
            </Modal>
        </>
    );
}

export default User;
