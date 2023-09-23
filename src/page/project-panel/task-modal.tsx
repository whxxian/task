import * as React from "react";
import { useForm } from "antd/es/form/Form";
import { useTaskModal, useTaskQueryKey } from "./utils";
import { useEditTask } from "../../utils/task";
import { useEffect } from "react";
import { Form, Input, Modal } from "antd";
import { UserSelect } from "../../components/user-select";
import { TaskTypeSelect } from "components/task-type-select";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const TaskModal = () => {
  const [form] = useForm();
  const { editingTask, editingTaskId, close } = useTaskModal();
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTaskQueryKey()
  );
  const onCancel = () => {
    form.resetFields();
    close();
  };
  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };
  useEffect(() => {
    form.setFieldsValue({
      ...editingTask,
      processorId: editingTask?.processorId,
    });
  }, [form, editingTask]);
  return (
    <Modal
      okText={"确认"}
      cancelText={"取消"}
      confirmLoading={editLoading}
      title={"编辑任务"}
      visible={!!editingTaskId}
      onCancel={onCancel}
      onOk={onOk}
      forceRender={true}
    >
      <Form {...layout} initialValues={editingTask} form={form}>
        <Form.Item
          label={"任务名"}
          name={"name"}
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={"经办人"} name={"processorId"}>
          <UserSelect defaultOptionName={"经办人"} />
        </Form.Item>
        <Form.Item label={"类型"} name={"typeId"}>
          <TaskTypeSelect />
        </Form.Item>
      </Form>
    </Modal>
  );
};
