import React, { useState } from "react";
import { usePanelQueryKey, useProjectIdInURL } from "./utils";
import { useAddPanel } from "../../utils/panel";
import { Input } from "antd";
import { Container as PanelContainer } from "./panel-column";

const CreatePanel = () => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInURL();
  const { mutateAsync: addPanel } = useAddPanel(usePanelQueryKey());
  const submit = async () => {
    await addPanel({ name, projectId });
    setName("");
  };
  return (
    <PanelContainer>
      <Input
        size={"large"}
        placeholder={"新建看板名称"}
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </PanelContainer>
  );
};

export default CreatePanel;
