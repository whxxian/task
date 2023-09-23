import { ProjectListPage } from "page/project-list";
import React from "react";
import { useAuth } from "./context/auth-context";
import styled from "@emotion/styled";
import { ButtonNoPad, Row } from "./components/libs";
import { Button, Dropdown, Menu } from "antd";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectPage } from "./page/project";
import { resetRoute } from "./utils";
import { ProjectModal } from "./page/project-list/project-modal";
import { ProjectPopover } from "./components/project-popover";
import { UserPopover } from "./components/user-popover";

const AuthenticatedApp = () => {
  /*
  props中传递一个JSX, 组合Composition, 深层子组件不需要管父组件中的状态，只需要单纯的渲染出来就行
  一定意义上能简化代码，解耦，对父组件有更多的把控
   */
  return (
    <Container>
      <Router>
        <PageHeader />
        <Main>
          <Routes>
            <Route path={"/projects"} element={<ProjectListPage />} />
            <Route path={"/projects/:projectId/*"} element={<ProjectPage />} />
            <Navigate to={"/projects"} />
          </Routes>
        </Main>
        <ProjectModal />
      </Router>
    </Container>
  );
};

/*
props中传递一个JSX, 组合Composition, 深层子组件不需要管父组件中的状态，只需要单纯的渲染出来就行
 */
const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap>
        <ButtonNoPad type={"link"} onClick={resetRoute}>
          taskMangeSystem
        </ButtonNoPad>
        <ProjectPopover />
        <UserPopover />
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button type={"link"} onClick={logout}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"} onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
  z-index: 1;
`;

const HeaderLeft = styled(Row)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const HeaderRight = styled.div``;
const Main = styled.main`
  height: calc(100vh - 6rem);
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;

export default AuthenticatedApp;
