import React from "react";
import { Dropdown, Menu, Modal, Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "../../components/pin";
import { useDeleteProject, useEditProject } from "../../utils/project";
import { ButtonNoPad } from "components/libs";
import { useProjectModal, useProjectQueryKey } from "./util";
import { Project } from "../../types/project";
import { User } from "../../types/user";

interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = React.memo(({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject(useProjectQueryKey());
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });

  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          // render函数参数为,当前行的值，当前行数据，index
          render(value, project) {
            return <Link to={`${project.id}`}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render() {
            return <span>{dayjs().format("YYYY-MM-DD")}</span>;
          },
        },
        {
          render(value, project) {
            return <More project={project} />;
          },
        },
      ]}
      {...props}
    />
  );
});

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal();
  const { mutate: deleteProject } = useDeleteProject(useProjectQueryKey());
  const editProject = (id: number) => () => startEdit(id);
  const onDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除么",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        deleteProject({ id });
      },
    });
  };
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"edit"}>
            <ButtonNoPad type={"link"} onClick={editProject(project.id)}>
              编辑
            </ButtonNoPad>
          </Menu.Item>
          <Menu.Item>
            <ButtonNoPad type={"link"} onClick={() => onDelete(project.id)}>
              删除
            </ButtonNoPad>
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPad type={"link"}>...</ButtonNoPad>
    </Dropdown>
  );
};
