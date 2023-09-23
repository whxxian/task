import { useEffect, useRef, useState } from "react";

export const isFalsy = (val: unknown) => (val === 0 ? false : !val);
export const isNull = (val: unknown) =>
  val === undefined || val === null || val === "";

// 纯函数，清理
export const cleanObject = (obj: Record<string, unknown>) => {
  const res = { ...obj };
  Object.keys(res).forEach((key) => {
    const val = res[key];
    if (isNull(val)) {
      delete res[key];
    }
  });
  return res;
};

// 模拟ComponentDidMount
export const useMount = (callBack: (...args: any) => void) => {
  useEffect(() => {
    callBack();
  }, []);
};

export const useMountedRef = () => {
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });
  return mountedRef;
};

/*export function debounce(func, delay) {
  let timer;
  return function () {
    const context = this;
    const args = Array.prototype.slice.call(arguments);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}*/

export const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedVal, setDebouncedVal] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedVal(value);
    }, delay);
    // value变化会很频繁的情况下，上一次useEffect回调执行后的清理，即相当于清理上一次的timeout, 达到防抖的效果
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedVal;
};

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  // 返回的 ref 对象在组件的整个生命周期内持续存在
  const oldTitle = useRef(document.title).current;
  useEffect(() => {
    document.title = title;
  }, [title]);
  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount]);
};

export const resetRoute = () => (window.location.href = window.location.origin);
