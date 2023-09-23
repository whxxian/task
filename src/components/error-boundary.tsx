import { Component, PropsWithChildren, ReactElement } from "react";

type FallbackRender = (props: { error: Error | null }) => ReactElement;

/*type Props = {
  children: ReactNode; // children如果是常用的属性，那么类型可以用React定义的泛型PropsWithChildren<T>
  fallbackRender: FallbackRender;
};*/
export class ErrorBoundary extends Component<
  PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = {
    error: null,
  };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
