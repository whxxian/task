import React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "../../utils";
import styled from "@emotion/styled";
import { Row } from "antd";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { useProjectModal, useProjectSearchParams } from "./util";
import { ButtonNoPad, ErrorBox } from "../../components/libs";

export const ProjectListPage = () => {
  useDocumentTitle("项目列表", false);
  const { open } = useProjectModal();
  const [param, setParam] = useProjectSearchParams();
  // 防抖
  const { isLoading, data: list, error } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();
  return (
    <Container>
      <Row justify={"space-between"} align={"middle"}>
        <h1>项目列表</h1>
        <ButtonNoPad type={"link"} onClick={open}>
          创建项目
        </ButtonNoPad>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? <ErrorBox error={error} /> : null}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};
ProjectListPage.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
