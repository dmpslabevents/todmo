import React from "react";
import { useSelector } from "react-redux";
import Container from "../componenets/Container";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  return (
    <Container>
      <Helmet>
        <title>Operator | {user.name ? user.name : "Login"}</title>
      </Helmet>
      <Header>
        <h1>Welcome Back!</h1>
        <h1>
          <OperatorName>{user.name}</OperatorName>, choose
        </h1>
        <h1>a operation</h1>
      </Header>
      {user.role <= 2 ? (
        <>
          <Btn onClick={() => navigate("/o/name")}>Entry</Btn>
          <Btn onClick={() => navigate("/o/exit")}>Exit</Btn>
        </>
      ) : null}
      {user.role <= 1 ? (
        <Btn onClick={() => navigate("/o/manage")}>Manage</Btn>
      ) : null}
    </Container>
  );
};
const Header = styled.div`
  * {
    margin: 1px;
  }
`;

const OperatorName = styled.span`
  color: wheat;
`;

const Btn = styled.button`
  width: 100%;
  height: 50px;
  margin: 3px;
  font-size: 20px;
  font-weight: bold;
  background-color: transparent;
  outline: none;
  border: none;
  color: grey;
  border: 2px solid grey;
  border-radius: 15px;
  transition: 0.3s ease;

  &:hover {
    border-color: white;
    color: white;
    cursor: pointer;
  }
`;

export default Home;
