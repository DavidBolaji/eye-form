import React from "react";
import { Button, Space, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteUser, getUser } from "../actions/userAction";

import { exportToExcel } from "../utils/helpers";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const { loading, error, user } = userData;
  useEffect(() => {
    const loggedIn = localStorage.getItem("login")
      ? JSON.parse(localStorage.getItem("login"))
      : false;
    if (!loggedIn) {
      return navigate("/");
    }

    dispatch(getUser());
  }, []);

  const columns = [
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
      render: (text) => <a>{text}</a>,
      filters: user?.map((d) => {
        return {
          ...d,
          text: d.number,
          value: d.number,
        };
      }),
      // filterMode: "tree",
      filterSearch: true,
      width: "30%",
      onFilter: (value, record) => record.number === value,
      // responsive: ["md"],
    },
    {
      title: "Action",
      key: "action",
      // responsive: ["md"],
      render: (_, record) => (
        <Space size="middle">
          <Button
            size="sm"
            onClick={() => navigate(`edit_user/${record._id}/1`)}
          >
            Stage 1
          </Button>
          <Button
            size="sm"
            onClick={() => navigate(`edit_user/${record._id}/2`)}
            disabled={!record.whatEye}
          >
            Stage 2
          </Button>
          {(record.SLT2ML === "failed (repeat SLT)" ||
            record.SLT2ML === "IOP reduced post SLT but needs to repeat SLT" ||
            record.SLT2MR === "failed (repeat SLT)" ||
            record.SLT2MR ===
              "IOP reduced post SLT but needs to repeat SLT") && (
            <Button size="sm" onClick={() => navigate(`repeat/${record._id}`)}>
              Repeat Stage 2M
            </Button>
          )}
          {(record.SLT3ML === "failed (repeat SLT)" ||
            record.SLT3ML === "IOP reduced post SLT but needs to repeat SLT" ||
            record.SLT3MR === "failed (repeat SLT)" ||
            record.SLT3MR ===
              "IOP reduced post SLT but needs to repeat SLT") && (
            <Button size="sm" onClick={() => navigate(`repeat/${record._id}`)}>
              Repeat Stage 3M
            </Button>
          )}
          <Button
            size="sm"
            onClick={() => navigate(`edit_user/${record._id}/3`)}
            disabled={!(record.wasTreatmentAddedL || record.wasTreatmentAddedR)}
          >
            Stage 3
          </Button>
          {/* <Button
            size="sm"
            danger
            onClick={() => dispatch(deleteUser(record._id))}
            // disabled={!(record.wasTreatmentAddedL || record.wasTreatmentAddedR)}
          >
            Delete
          </Button> */}
        </Space>
      ),
    },
  ];
  return (
    <div className="w-full mt-20 px-5 md:px-20 ">
      <div className="flex w-full justify-end items-center">
        <Button className="w-[120px]" onClick={() => exportToExcel(user)}>
          Download xlsx
        </Button>
      </div>
      <h2 className="font-bold text-green-800 text-xl mb-2 uppercase">
        All Users
      </h2>
      <div className="max-width-[280px] md:w-full overflow-y-scroll" id="hhh">
        <Table
          columns={columns}
          dataSource={user}
          loading={loading}
          bordered
          pagination={{ pageSize: 10 }}
          rowKey="_id"
          size="small"
        />
      </div>
    </div>
  );
};

export default HomePage;
