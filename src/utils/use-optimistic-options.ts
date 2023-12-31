import { QueryKey, useQueryClient } from "react-query";
import { Task } from "../types/task";
import { reorder } from "./reorder";

export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, old?: any) => any
) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    async onMutate(target: any) {
      const prevItems = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old) => {
        return callback(target, old);
      });
      return { prevItems };
    },
    onError: (error: any, newItem: any, context: any) => {
      queryClient.setQueryData(
        queryKey,
        (context as { prevItems: any }).prevItems
      );
    },
  };
};

export const useDeleteConfig = (queryKey: any) =>
  useConfig(
    queryKey,
    (target, old) => old?.filter((item: any) => item.id !== target.id) || []
  );
export const useEditConfig = (queryKey: any) =>
  useConfig(
    queryKey,
    (target, old) =>
      old?.map((item: any) =>
        item.id === target.id ? { ...item, ...target } : item
      ) || []
  );
export const useAddConfig = (queryKey: any) =>
  useConfig(queryKey, (target, old) => (old ? [...old, target] : []));

export const useReorderKanbanConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => reorder({ list: old, ...target }));

export const useReorderTaskConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => {
    const orderedList = reorder({ list: old, ...target }) as Task[];
    return orderedList.map((item) =>
      item.id === target.fromId
        ? { ...item, kanbanId: target.toKanbanId }
        : item
    );
  });
