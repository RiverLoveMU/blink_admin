import * as React from "react";
import { Avatar, Layout, Menu } from "antd";
import blink from "@/common/images/blink.png";
import { DEFAULT_AVATAR } from "@/common/constants/index";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import "./index.less";
import { IRoute, routes } from "@/routes";
import NotFound from "@/pages/404";

const { Header, Sider, Content } = Layout;
const { SubMenu, Item } = Menu;

interface NestRouteComponentProps {
  route: IRoute;
  renderRoutes: (iRoutes: IRoute[]) => JSX.Element[];
}

const NestRouteComponent: React.FC<NestRouteComponentProps> = ({
  route,
  renderRoutes,
}) => {
  const routeChildren = React.useMemo(() => {
    return route.children as IRoute[];
  }, [route.children]);

  return (
    <Switch>
      <Redirect exact from={route.path} to={routeChildren[0].path as string} />
      {renderRoutes(routeChildren)}
      <Route component={NotFound}></Route>
    </Switch>
  );
};

interface RouteComponentProps {
  route: IRoute;
  getRoute: (route: IRoute) => void;
}

const RouteComponent: React.FC<RouteComponentProps> = ({ route, getRoute }) => {
  const Component = React.useMemo(() => {
    return route.component as React.FC;
  }, [route.component]);

  React.useEffect(() => {
    getRoute(route);
  }, [getRoute, route]);

  return <Component />;
};

const CommonLayout: React.FC = () => {
  const [currentRoute, setCurrentRoute] = React.useState<IRoute>();
  const renderMenu = React.useCallback((iRoutes: IRoute[]) => {
    return iRoutes.map((route) => {
      if (route.children && route.children.length) {
        return (
          <SubMenu key={route.key} title={route.name}>
            {renderMenu(route.children)}
          </SubMenu>
        );
      }

      return (
        <Item key={route.key}>
          <Link to={route.path as string}>{route.name}</Link>
        </Item>
      );
    });
  }, []);

  const getRoute = React.useCallback((route: IRoute) => {
    setCurrentRoute(route);
  }, []);

  const renderComponent = React.useCallback(
    (route: IRoute) => <RouteComponent route={route} getRoute={getRoute} />,
    [getRoute]
  );

  const renderRoutes = React.useCallback(
    (iRoutes: IRoute[]) => {
      return iRoutes.map((route) => {
        if (route.children && route.children.length) {
          return (
            <Route
              key={route.key}
              path={route.path}
              render={() => {
                return (
                  <NestRouteComponent
                    route={route}
                    renderRoutes={renderRoutes}
                  />
                );
              }}
            ></Route>
          );
        }

        // console.log(route);

        return (
          <Route
            exact
            key={route.key}
            render={() => {
              return renderComponent(route);
            }}
            path={route.path}
          ></Route>
        );
      });
    },
    [renderComponent]
  );

  return (
    // <Layout className="blink-layout">
    //   <Sider className="blink-sider" width={220}>
    //     <div className="blink-sider-logo">
    //       <img src={blink} />
    //       <h1>Blink FC</h1>
    //     </div>
    //     <Menu
    //       selectedKeys={currentRoute?.key ? [currentRoute?.key] : []}
    //       mode="inline"
    //       theme="dark"
    //       className="blink-sider-menu-wrapper"
    //     >
    //       {renderMenu(routes)}
    //     </Menu>
    //   </Sider>
    //   <Layout>
    //     <Header className="blink-header">
    //       <div></div>
    //       <div className="blink-user-box">
    //         <Avatar src={DEFAULT_AVATAR} size="small" />
    //         <div className="blink-user-name">何刘</div>
    //       </div>
    //     </Header>
    //     <Content className="blink-content">
    //       <Switch>
    //         <Redirect exact from="/" to={routes[0].path as string} />
    //         {renderRoutes(routes)}
    //         <Route component={NotFound}></Route>
    //       </Switch>
    //     </Content>
    //   </Layout>
    // </Layout>
    <Switch>
      <Redirect exact from="/" to={routes[0].path as string} />
      {renderRoutes(routes)}
      <Route component={NotFound}></Route>
    </Switch>
  );
};

export default CommonLayout;
