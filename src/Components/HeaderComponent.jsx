import { Button, Col, Row, Space } from "antd";
import React from "react";
import { useNavigate, useNavigation } from "react-router-dom";

const HeaderComponent = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full z-10 shadow fixed top-0 bg-white text-black h-[8vh] flex items-center justify-end px-[20px] md:px-[100px] ">
      {/* <div>LOGO</div> */}
      <div>
        <Space>
          <Button onClick={() => navigate("/")}>Home</Button>
          <Button
            onClick={() => navigate("add_user")}
            className="bg-green-600 text-white border-0"
          >
            Add User
          </Button>
        </Space>
      </div>
    </nav>
  );
};

export default HeaderComponent;
