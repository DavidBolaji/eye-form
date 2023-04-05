import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import Axios from "../api/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    // event.preventDefault();
    message.loading().then();
    const res = await Axios.post("/user/login", { email, password });

    if (res?.status !== 200) {
      message.error("wrong email or password");
    } else {
      message.success("Login succssful");
      localStorage.setItem("login", JSON.stringify(true));
      setTimeout(() => navigate("/dashboard"), 1000);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#fafafa]">
      <div className="w-[400px] bg-white p-5">
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="mb-5"
            placeholder="Enter email"
          />

          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="mb-5"
            placeholder="Enter password"
          />

          <Form.Item>
            <Button
              className="bg-green-600 text-white w-full"
              type="submit"
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
