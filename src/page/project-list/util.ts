import { useSetSearchParams, useURLQueryParam } from "../../utils/url";
import { useMemo } from "react";
import { useProject } from "../../utils/project";

export const useProjectSearchParams = () => {
  const [param, setParam] = useURLQueryParam(["name", "personId"]);
  const projectParam = {
    ...param,
    personId: Number(param.personId) || undefined,
  };
  return [useMemo(() => projectParam, [param]), setParam] as const;
};

export const useProjectQueryKey = () => {
  const [params] = useProjectSearchParams();
  return ["projects", params];
};

export const useProjectModal = () => {
  const [{ editProjectId }, setEditProjectId] = useURLQueryParam([
    "editProjectId",
  ]);
  const [{ projectCreate }, setProjectCreate] = useURLQueryParam([
    "projectCreate",
  ]);
  const { data: editProject, isLoading } = useProject(+editProjectId);
  const setSearchParams = useSetSearchParams();
  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => {
    setSearchParams({ projectCreate: "", editProjectId: "" });
  };
  const startEdit = (id: number) => setEditProjectId({ editProjectId: id });
  return {
    projectModalOpen: projectCreate === "true" || !!editProjectId,
    open,
    close,
    startEdit,
    editProject,
    isLoading,
  };
};
