// @flow
import * as React from "react";

type Props = {
  name: string;
  keyword: string;
};
export const Mark = (props: Props) => {
  const { name, keyword } = props;
  if (!keyword) return <>{name}</>;
  const arr = name.split(keyword);
  return (
    <>
      {arr.map((str, index) => (
        <span key={str + index}>
          {!!str ? str : <span style={{ color: "#fd252c" }}>{keyword}</span>}
        </span>
      ))}
    </>
  );
};
