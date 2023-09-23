import React, { useState } from "react";
import { LoginPage } from "./login";
import { RegisterPage } from "./register";
import { Button, Card } from "antd";
import styled from "@emotion/styled";
import { ErrorBox } from "../components/libs";

const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  return (
    <Container>
      <Header>taskMangeSystem</Header>
      <ShadowCard>
        <Title>{isRegister ? "注册" : "登录"}</Title>
        {error ? <ErrorBox error={error} /> : null}
        {isRegister ? (
          <RegisterPage onError={setError} />
        ) : (
          <LoginPage onError={setError} />
        )}
        <a
          onClick={() => {
            setIsRegister(!isRegister);
            setError(null);
          }}
        >
          {isRegister ? "已有账号？直接登录" : "没有账号？注册新账号"}
        </a>
      </ShadowCard>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: #f1f3f4;
`;

// 可以替换antd组件的样式
const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 46rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

const Header = styled.header`
  padding: 3rem 0;
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 3rem;
  color: #2372d9;
`;

const Title = styled.h2`
  margin-bottom: 1.4rem;
  color: #2372d9;
`;

export const LongButton = styled(Button)`
  width: 100%;
`;

export default UnauthenticatedApp;
