import * as React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";
import { routes } from "@/routes";
import "./index.less";

const NotFound: React.FC = () => {
  return (
    <div className="blink-page404">
      <Result
        status="404"
        title="404"
        subTitle="不好意思, 你走错球场了."
        extra={
          <Button type="primary">
            <Link to={routes[0].path as string}>返回数据台</Link>
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
