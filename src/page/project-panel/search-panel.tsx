import React from "react";
import { useTasksSearchParams } from "./utils";
import { useSetSearchParams } from "../../utils/url";
import { Row } from "components/libs";
import { Button, Input } from "antd";
import { UserSelect } from "components/user-select";
import { TaskTypeSelect } from "components/task-type-select";

function SearchPanel() {
  const searchParam = useTasksSearchParams();
  const setSearchParams = useSetSearchParams();
  const reset = () => {
    setSearchParams({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined,
    });
  };
  return (
    <Row marginBottom={4} gap={true}>
      <Input
        style={{ width: "20rem" }}
        placeholder={"任务名"}
        value={searchParam.name}
        onChange={(evt) => setSearchParams({ name: evt.target.value })}
      />
      <UserSelect
        defaultOptionName={"经办人"}
        value={searchParam.processorId}
        onChange={(value) => setSearchParams({ processorId: value })}
      />
      <TaskTypeSelect
        defaultOptionName={"类型"}
        value={searchParam.typeId}
        onChange={(value) => setSearchParams({ typeId: value })}
      />
      <Button onClick={reset}>清楚筛选</Button>
    </Row>
  );
}

export default SearchPanel;
