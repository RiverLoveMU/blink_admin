import * as React from "react";
import { Select, Button } from "antd";
import { Form } from "@/components/form";
import Input from "@/components/input";
import useThrottleFn from "./useThrottleFn";

const { Item, useForm, List } = Form;

const DataEntry: React.FC = () => {
  const [cTab, setCTab] = React.useState<number>(0);
  const [form] = useForm();
  const [value] = React.useState<number[]>();
  const [data, setData] = React.useState(0);
  const [n, setN] = React.useState(0);
  const { run } = useThrottleFn(
    () => {
      setData(data + 1);
    },
    5000,
    [n],
    { immediately: true }
  );

  const onChange = (val: number[]) => {
    console.log(val);
  };

  return <div className="lottery-container">111</div>;
};

export default DataEntry;
