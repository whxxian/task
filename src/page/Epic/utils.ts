import { useProjectIdInURL } from "../project-panel/utils";

export const useEpicSearchParams = () => ({
  projectId: useProjectIdInURL(),
});

export const useEpicsQueryKey = () => ["epics", useEpicSearchParams()];
