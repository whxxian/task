import { useHttp } from "./http";
import { User } from "../types/user";
import { useQuery } from "react-query";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  return useQuery<User[]>("user", () =>
    client(`users`, {
      data: param,
    })
  );
};
