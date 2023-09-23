import { useDocumentTitle } from "../../utils";
import {
  usePanelQueryKey,
  usePanelSearchParams,
  useProjectInUrl,
  useTaskQueryKey,
  useTasksSearchParams,
} from "./utils";
import { usePanels, useReorderPanel } from "../../utils/panel";
import * as React from "react";
import { PanelColumn } from "./panel-column";
import styled from "@emotion/styled";
import SearchPanel from "./search-panel";
import { PageContainer } from "../../components/libs";
import { useReorderTask, useTasks } from "../../utils/task";
import { Spin } from "antd";
import CreatePanel from "./create-panel";
import { TaskModal } from "./task-modal";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "../../components/drag-n-drop";
import { DNDTypes } from "../../types/dnd";
import { useCallback } from "react";

export const ProjectPanel = () => {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useProjectInUrl();
  const { data: panels = [], isLoading: panelIsLoading } = usePanels(
    usePanelSearchParams()
  );
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
  const isLoading = taskIsLoading || panelIsLoading;
  const onDragEnd = useDragEnd();
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <PageContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <ColumnContainer>
            <Drop
              type={DNDTypes.COLUMN}
              direction={"horizontal"}
              droppableId={"kanban"}
            >
              <DropChild style={{ display: "flex" }}>
                {panels?.map((panel, index) => (
                  <Drag
                    key={panel.id}
                    draggableId={"kanban" + panel.id}
                    index={index}
                  >
                    <PanelColumn panel={panel} />
                  </Drag>
                ))}
              </DropChild>
            </Drop>
            <CreatePanel />
          </ColumnContainer>
        )}
        <TaskModal />
      </PageContainer>
    </DragDropContext>
  );
};

export const useDragEnd = () => {
  const { data: panels } = usePanels(usePanelSearchParams());
  const { data: allTasks = [] } = useTasks(useTasksSearchParams());
  const { mutate: reorderPanel } = useReorderPanel(usePanelQueryKey());
  const { mutate: reorderTask } = useReorderTask(useTaskQueryKey());
  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) {
        return;
      }
      if (type === DNDTypes.COLUMN) {
        const fromId = panels?.[source.index].id;
        const toId = panels?.[destination.index].id;
        if (!fromId || !toId || fromId === toId) {
          return;
        }
        const type = destination.index > source.index ? "after" : "before";
        reorderPanel({ fromId, referenceId: toId, type });
      } else if (type === DNDTypes.ROW) {
        const fromPanelId = +source.droppableId;
        const toPanelId = +destination.droppableId;
        /*if (fromPanelId === toPanelId) {
          return;
        }*/
        const fromTask = allTasks.filter(
          (task) => task.kanbanId === fromPanelId
        )[source.index];
        const toTask = allTasks.filter((task) => task.kanbanId === toPanelId)[
          destination.index
        ];
        if (fromTask?.id === toTask?.id) return;
        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromKanbanId: fromPanelId,
          toKanbanId: toPanelId,
          type:
            fromPanelId === toPanelId && destination.index > source.index
              ? "after"
              : "before",
        });
      }
    },
    [allTasks, panels, reorderPanel, reorderTask]
  );
};

const ColumnContainer = styled.div`
  display: flex;
  overflow-x: auto;
  margin-right: 2rem;
  flex: 1;
`;
