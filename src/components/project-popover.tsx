import { Divider, List, Popover, Typography } from "antd";
import { useProjects } from "../utils/project";
import styled from "@emotion/styled";
import { ButtonNoPad } from "./libs";
import React from "react";
import { useProjectModal } from "../page/project-list/util";

export const ProjectPopover = () => {
  const { open } = useProjectModal();
  const { data: projects, isLoading, refetch } = useProjects();
  const pinedProjects = projects?.filter((project) => project.pin);
  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List loading={isLoading}>
        {pinedProjects?.map((project) => {
          return (
            <List.Item key={project.id}>
              <List.Item.Meta title={project.name} />
            </List.Item>
          );
        })}
      </List>
      <Divider style={{ backgroundColor: "#eee" }} />
      <ButtonNoPad type={"link"} onClick={open}>
        创建项目
      </ButtonNoPad>
    </ContentContainer>
  );
  return (
    <Popover
      onVisibleChange={() => refetch()}
      placement={"bottom"}
      content={content}
    >
      <span>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
