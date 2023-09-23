import * as React from "react";
import { useEffect, useState } from "react";
import { useAddTask } from "../../utils/task";
import { useProjectIdInURL, useTaskQueryKey } from "./utils";
import { Button, Card, Input } from "antd";

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState("");
  const [inputMode, setInputMode] = useState(false);
  const { mutateAsync: addTask } = useAddTask(useTaskQueryKey());
  const projectId = useProjectIdInURL();
  const submit = async () => {
    await addTask({ projectId, name, kanbanId });
    setInputMode(false);
    setName("");
  };
  const toggle = () => setInputMode((mode) => !mode);
  useEffect(() => {
    if (!inputMode) setName("");
  }, [inputMode]);
  if (!inputMode)
    return (
      <Button type={"link"} onClick={toggle}>
        +添加任务
      </Button>
    );
  return (
    <Card>
      <Input
        autoFocus={true}
        value={name}
        onChange={(event) => setName(event.target.value)}
        onPressEnter={submit}
      />
    </Card>
  );
};
