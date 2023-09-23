import { useLocation } from "react-router-dom";
import { useProject } from "../../utils/project";
import { useURLQueryParam } from "../../utils/url";
import { useCallback, useMemo } from "react";
import { useTask } from "../../utils/task";
import { useDebounce } from "../../utils";

export const useProjectIdInURL = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return id ? +id : undefined;
};

export const useProjectInUrl = () => useProject(useProjectIdInURL());
export const usePanelSearchParams = () => ({ projectId: useProjectIdInURL() });
export const usePanelQueryKey = () => ["panel", usePanelSearchParams()];

export const useTasksSearchParams = () => {
  const [param] = useURLQueryParam(["name", "typeId", "processorId", "tagId"]);
  const projectId = useProjectIdInURL();
  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      name: param.name,
    }),
    [projectId, param]
  );
};
export const useTaskQueryKey = () => ["tasks", useTasksSearchParams()];

export const useTaskModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useURLQueryParam([
    "editingTaskId",
  ]);
  const { data: editingTask, isLoading } = useTask(+editingTaskId);
  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id });
    },
    [setEditingTaskId]
  );
  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: "" });
  }, [setEditingTaskId]);
  return {
    editingTaskId,
    editingTask,
    isLoading,
    startEdit,
    close,
  };
};
