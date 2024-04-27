import React from "react";
import ReactDOM from "react-dom";
import "@/common/styles/global.less";
import "antd/es/style/index";
import App from "./app";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
