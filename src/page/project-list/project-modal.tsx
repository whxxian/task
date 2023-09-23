import { Drawer, Button, Spin, Form, Input } from "antd";
import { UserSelect } from "components/user-select";
import { useProjectModal, useProjectQueryKey } from "./util";
import { useAddProject, useEditProject } from "../../utils/project";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { ErrorBox } from "../../components/libs";
import styled from "@emotion/styled";
import React from "react";

export const ProjectModal = () => {
  const { projectModalOpen, close, editProject, isLoading } = useProjectModal();
  const title = editProject ? "编辑项目" : "创建项目";
  console.log(title);
  const useMutateProject = editProject ? useEditProject : useAddProject;
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutateProject(useProjectQueryKey());
  const [form] = useForm();
  const onFinish = (value: any) => {
    mutateAsync({ ...editProject, ...value }).then(() => {
      form.resetFields();
      close();
    });
  };
  const modalClose = () => {
    form.resetFields();
    close();
  };
  useEffect(() => {
    form.setFieldsValue(editProject);
  }, [editProject, form]);
  return (
    <Drawer
      forceRender={true}
      onClose={modalClose}
      visible={projectModalOpen}
      width={"100%"}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
              form={form}
            >
              <Form.Item
                label={"名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入项目名" }]}
              >
                <Input placeholder={"请输入项目名称"} />
              </Form.Item>
              <Form.Item
                label={"部门"}
                name={"organization"}
                rules={[{ required: true, message: "请输入部门" }]}
              >
                <Input placeholder={"请输入部门名"} />
              </Form.Item>
              <Form.Item label={"负责人"} name={"personId"}>
                <UserSelect defaultOptionName={"负责人"} />
              </Form.Item>
              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={mutateLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
        {/*<Button onClick={close}>关闭</Button>*/}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
