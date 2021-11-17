import React, { useCallback, useRef, useState } from "react";
import { Modal, Form, Input, Divider, message } from "antd";
import PropTypes from "prop-types";

import Style from "./index.module.css";
import Api, { StorageTokenName } from "../../api";

// console.log(Style);
function User(props) {
    const [isRegister, setRegisterState] = useState(true);
    const form = useRef();

    const changeLoginType = useCallback(() => {
        form.current.resetFields();
        setRegisterState(!isRegister);
    }, [isRegister])

    const onFinish = useCallback((value) => {
        // console.log(value);
        const successFn = (res) => {
            localStorage.setItem(StorageTokenName, res.token);
        };
        if (isRegister) {
            Api.Register(value).then(successFn).catch(err => {
                message.error(`${err.response.data.error}. You Can to Login`);
            });
            return;
        }
        Api.Login(value).then(successFn).catch(err => {
            message.error(`${err.response.data.error}. You Can to Register`);
        });
    }, [isRegister]);

    return <>
        <Modal
            visible={props.visible}
            title="Log in or sign up"
            footer={false}
            className={Style["ant-modal-content"]}
            onCancel={props.onCancel}
        >
            <h2>Welcome to Airbnb</h2>
            <Form ref={form} onFinish={onFinish}>
                {
                    isRegister && <Form.Item
                        className={Style["input-control-container"]}
                        name="name"
                        rules={[{ required: true, message: "Name is Required" }]}
                    >
                        <Input placeholder="Name" className={Style["login-control"]} />
                    </Form.Item>
                }

                <Form.Item
                    className={Style["input-control-container"]}
                    name="email"
                    rules={[
                        { required: true, message: "Email is Required" },
                        { pattern: /^[A-Za-z0-9]+@\w+(\.\w+)+$/, message: "Please input the correct Email format." }
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
                    rules={[{ required: true, message: "Password is Required" }]}
                >
                    <Input
                        placeholder="Password"
                        className={Style["login-control"]}
                        type="password"
                    />
                </Form.Item>

                {
                    isRegister && <Form.Item
                        className={Style["input-control-container"]}
                        name="confirm"
                        rules={[
                            { required: true, message: "Confirm Password is Required" },
                            {
                                validator(rule, value = "") {
                                    if (value.trim() && form.current.getFieldValue("password") !== value) {
                                        return Promise.reject(new RangeError("Passwords do not match"));
                                    }
                                    return Promise.resolve();
                                },
                            }
                        ]}
                    >
                        <Input
                            placeholder="Confirm Password"
                            className={Style["login-control"]}
                            type="password"
                        />
                    </Form.Item>
                }

                <button className={Style["login-button"]}>Continue</button>
            </Form>
            <Divider plain>or</Divider>
            <button
                className={Style["login-button-continue"]}
                onClick={changeLoginType}
            >
                {isRegister ? "Continue with Login" : "Continue with Register"}
            </button>
        </Modal>
    </>
}

User.propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
}

export default User;
