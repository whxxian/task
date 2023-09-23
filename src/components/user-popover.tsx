import { List, Popover, Typography } from "antd";
import styled from "@emotion/styled";
import React from "react";
import { useUsers } from "../utils/user";

export const UserPopover = () => {
  const { data: users, isLoading, refetch } = useUsers();
  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>小组成员</Typography.Text>
      <List loading={isLoading}>
        {users?.map((user) => {
          return (
            <List.Item key={user.id}>
              <List.Item.Meta title={user.name} />
            </List.Item>
          );
        })}
      </List>
    </ContentContainer>
  );
  return (
    <Popover
      onVisibleChange={() => refetch()}
      placement={"bottom"}
      content={content}
    >
      <span>组员</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
