import React from "react";
import { Button, Space, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../actions/userAction";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export const exportToExcel = (user) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileName = "data.xlsx";

  const newUser = user.map((e) => {
    return {
      ...e,
      medicationsBeforeL: JSON.stringify(e.medicationsBeforeL)
        .replace("[", "")
        .replace("]", ""),
      medicationsBeforeR: JSON.stringify(e.medicationsBeforeR)
        .replace("[", "")
        .replace("]", ""),
      medicationsL: JSON.stringify(e.medicationsBeforeL)
        .replace("[", "")
        .replace("]", ""),
      medicationsR: JSON.stringify(e.medicationsR)
        .replace("[", "")
        .replace("]", ""),
    };
  });

  const ws = XLSX.utils.json_to_sheet(newUser);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
  });
  const excelBlob = new Blob([excelBuffer], { type: fileType });
  saveAs(excelBlob, fileName);
};

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
  console.log(userData);
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
          <Button
            size="sm"
            onClick={() => navigate(`edit_user/${record._id}/3`)}
            disabled={!(record.wasTreatmentAddedL || record.wasTreatmentAddedR)}
          >
            Stage 3
          </Button>
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
      <div className="max-width-[280px] md:w-full overflow-y-scroll">
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
