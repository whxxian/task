import { ProjectPanel } from "page/project-panel";
import { Routes, Route, Navigate } from "react-router";
import { Link, useLocation } from "react-router-dom";

import { EpicPage } from "../Epic";
import styled from "@emotion/styled";
import { Menu } from "antd";
import React from "react";

const useRouteType = () => {
  const unit = useLocation().pathname.split("/");
  return unit[unit.length - 1];
};

export const ProjectPage = () => {
  const routeType = useRouteType();
  return (
    <Container>
      <Aside>
        <Menu mode={"inline"} selectedKeys={[routeType]}>
          <Menu.Item key={"panel"}>
            <Link to={"panel"}>看板</Link>
          </Menu.Item>
          <Menu.Item key={"epic"}>
            <Link to={"epic"}>任务组</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path={"/panel"} element={<ProjectPanel />} />
          <Route path={"/epic"} element={<EpicPage />} />
          <Navigate to={window.location.pathname + "/panel"} replace={true} />
        </Routes>
      </Main>
    </Container>
  );
};

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.2);
  display: flex;
  overflow: hidden;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  height: 100%;
`;
