import * as React from "react";
import Layout from "@/layout/index";
import { BrowserRouter, HashRouter } from "react-router-dom";

const App: React.FC = () => {
  return (
    <HashRouter basename="/">
      <Layout />
    </HashRouter>
  );
};

export default App;
