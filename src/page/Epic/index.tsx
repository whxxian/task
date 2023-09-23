import { PageContainer, Row } from "../../components/libs";
import { useProjectInUrl } from "../project-panel/utils";
import { useDeleteEpic, useEpics } from "../../utils/epic";
import { useEpicSearchParams, useEpicsQueryKey } from "./utils";
import { Button, List, Modal } from "antd";
import dayjs from "dayjs";
import { useTasks } from "../../utils/task";
import { Link } from "react-router-dom";
import { Epic } from "../../types/epic";
import CreateEpic from "./create-epic";
import { useState } from "react";
import React from "react";

export const EpicPage = () => {
  const { data: currentProject } = useProjectInUrl();
  const { data: epics } = useEpics(useEpicSearchParams());
  const { data: tasks } = useTasks(useEpicSearchParams());
  const { mutate: deleteEpic } = useDeleteEpic(useEpicsQueryKey());
  const [epitCreateOpen, setEpicCreateOpen] = useState(false);
  const confirmDeleteEpic = (epic: Epic) => {
    Modal.confirm({
      title: `确定删除项目组:${epic.name}`,
      content: "点击确认删除",
      okText: "确认",
      cancelText: "取消",
      onOk() {
        deleteEpic({ id: epic.id });
      },
    });
  };

  return (
    <PageContainer>
      <Row between={true}>
        <h1>{currentProject?.name}任务组</h1>
        <Button onClick={() => setEpicCreateOpen(true)} type={"link"}>
          创建任务组
        </Button>
      </Row>
      <List
        style={{ overflowY: "auto" }}
        dataSource={epics}
        itemLayout={"vertical"}
        renderItem={(epic) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Row between={true}>
                  <span>{epic.name}</span>
                  <Button type={"link"} onClick={() => confirmDeleteEpic(epic)}>
                    删除
                  </Button>
                </Row>
              }
              description={
                <div>
                  <div>开始时间：2023-08-05</div>
                  <div>结束时间：{dayjs().format("YYYY-MM-DD")}</div>
                </div>
              }
            />
            <div>
              {tasks
                ?.filter((task) => task.epicId === epic.id)
                .map((task) => (
                  <div key={task.name}>
                    <Link
                      to={`/projects/${currentProject?.id}/panel?editingTaskId=${task.id}`}
                    >
                      {task.name}
                    </Link>
                  </div>
                ))}
            </div>
          </List.Item>
        )}
      />
      <CreateEpic
        onClose={() => setEpicCreateOpen(false)}
        visible={epitCreateOpen}
      />
    </PageContainer>
  );
};
