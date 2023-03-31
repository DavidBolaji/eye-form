import React from "react";
import { Button, Space, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../actions/userAction";

// const data = [
//   {
//     key: "1",
//     _id: 1,
//     number: "1",
//     name: "John Brown",
//   },
//   {
//     key: 2,
//     _id: 2,
//     number: "2",
//     name: "Jim Green",
//   },
//   {
//     key: 3,
//     _id: 3,
//     number: "3",
//     name: "Joe Black",
//   },
// ];

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const { loading, error, user } = userData;
  useEffect(() => {
    dispatch(getUser());
  }, []);
  const columns = [
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      key: "action",
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
          <Button
            size="sm"
            onClick={() => navigate(`edit_user/${record._id}/3`)}
            disabled={!(record.wasTreatmentAddedL || record.wasTreatmentAddedR)}
          >
            Stage 3
          </Button>
          <Button
            size="sm"
            onClick={() => navigate(`edit_user/${record._id}/4`)}
            disabled={
              (record.whatEye === "left" &&
                record.wasTreatmentAddedL === "no") ||
              (record.whatEye === "right" &&
                record.wasTreatmentAddedR === "no") ||
              (record.whatEye === "both" &&
                record.wasTreatmentAddedL === "no" &&
                record.wasTreatmentAddedR === "no") ||
              !(record.treatmentOfferedL || record.treatmentOfferedR)
            }
          >
            Stage 4
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div className="px-20 max-width-[600px] mt-20">
      <div className="flex w-full justify-end items-center">
        <Button className="w-[120px]">Download xlsx</Button>
      </div>
      <h2 className="font-bold text-green-800 text-xl mb-2 uppercase">
        All Users
      </h2>
      <Table
        columns={columns}
        dataSource={user}
        pagination
        loading={loading}
        bordered
        rowKey="_id"
        size="sm"
      />
    </div>
  );
};

export default HomePage;
