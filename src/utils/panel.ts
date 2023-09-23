import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Panel } from "../types/panel";
import {
  useAddConfig,
  useDeleteConfig,
  useReorderKanbanConfig,
} from "./use-optimistic-options";

export const usePanels = (param?: Partial<Panel>) => {
  const client = useHttp();
  return useQuery<Panel[]>(["panel", param], () =>
    client("kanbans", { data: param })
  );
};

export const useAddPanel = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Panel>) =>
      client(`kanbans`, {
        method: "POST",
        data: params,
      }),
    useAddConfig(queryKey)
  );
};

export const useDeletePanel = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`kanbans/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export interface SortProps {
  fromId: number; // 要重新排序的item
  referenceId: number; // 目标item
  type: "before" | "after"; // 放在目标的前还是后
  fromKanbanId?: number;
  toKanbanId?: number;
}

export const useReorderPanel = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((params: SortProps) => {
    return client("kanbans/reorder", {
      data: params,
      method: "POST",
    });
  }, useReorderKanbanConfig(queryKey));
};
