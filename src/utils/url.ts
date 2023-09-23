/**
 * 返回页面URL中的key-value
 */
import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "./index";

export const useURLQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((previousValue, currentValue) => {
          return {
            ...previousValue,
            [currentValue]: searchParams.get(currentValue) || "",
          };
        }, {} as { [key in K]: string }),
      [searchParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParams(o);
    },
  ] as const;
};

export const useSetSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return <K extends string>(params: Partial<{ [key in K]: unknown }>) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParams(o);
  };
};
