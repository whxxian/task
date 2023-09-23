// @flow
import * as React from "react";
import { Panel } from "../../types/panel";
import { useDeleteTask, useTasks } from "../../utils/task";
import {
  usePanelQueryKey,
  useTaskModal,
  useTaskQueryKey,
  useTasksSearchParams,
} from "./utils";
import { useTaskTypes } from "../../utils/task-type";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import styled from "@emotion/styled";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import { CreateTask } from "./create-task";
import { Task } from "../../types/task";
import { Mark } from "../../components/mark";
import { useDeletePanel } from "../../utils/panel";
import { Row } from "components/libs";
import style from "style/card.module.less";
import { MouseEvent } from "react";
import { Drag, Drop, DropChild } from "../../components/drag-n-drop";
import { DNDTypes } from "../../types/dnd";

type Props = {
  panel: Panel;
};
export const PanelColumn = React.forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const { panel, ...rest } = props;
    const { data: allTasks = [] } = useTasks(useTasksSearchParams());
    const tasks = allTasks?.filter((task) => task.kanbanId === panel.id);
    return (
      <Container ref={ref} {...rest}>
        <Row between={true}>
          <h3>{panel.name}</h3>
          <MoreBtn panel={panel} />
        </Row>
        <TasksContainer>
          <Drop
            droppableId={`${panel.id}`}
            type={DNDTypes.ROW}
            direction={"vertical"}
          >
            <DropChild style={{ minHeight: "10px" }}>
              {tasks?.map((task, index) => (
                <Drag
                  key={task.id}
                  draggableId={"task" + task.id}
                  index={index}
                >
                  <div>
                    <TaskCard task={task} />
                  </div>
                </Drag>
              ))}
            </DropChild>
          </Drop>
          <CreateTask kanbanId={panel.id} />
        </TasksContainer>
      </Container>
    );
  }
);

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) {
    return null;
  }
  return <img src={name === "task" ? taskIcon : bugIcon} alt={name} />;
};

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTaskModal();
  const { name: keyword } = useTasksSearchParams();
  const { mutateAsync: deleteTask } = useDeleteTask(useTaskQueryKey());
  const onDel = (evt: MouseEvent<HTMLElement>) => {
    evt.stopPropagation();
    Modal.confirm({
      title: `确定删除任务'${task.name}'?`,
      okText: `确定`,
      cancelText: "取消",
      onOk: () => deleteTask({ id: task.id }),
    });
  };
  return (
    <Card
      onClick={() => startEdit(task.id)}
      style={{ marginBottom: "0.5rem", cursor: "pointer" }}
      key={task.id}
      className={style.TaskCard}
    >
      <div>
        <Mark keyword={keyword} name={task.name} />
      </div>
      <Row between={true}>
        <TaskTypeIcon id={task.typeId} />
        <Button className={style.DeleteTaskBtn} type={"link"} onClick={onDel}>
          删除
        </Button>
      </Row>
    </Card>
  );
};

const MoreBtn = ({ panel }: { panel: Panel }) => {
  const { mutateAsync: deletePanel } = useDeletePanel(usePanelQueryKey());
  const onDelete = () => {
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      title: `确定删除看板'${panel.name}'么?`,
      onOk: () => deletePanel({ id: panel.id }),
    });
  };
  const overlay = (
    <Menu>
      <Menu.Item>
        <Button type={"link"} onClick={onDelete}>
          删除
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={overlay}>
      <Button type={"link"}>...</Button>
    </Dropdown>
  );
};
