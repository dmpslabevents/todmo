import React, { useState } from "react";
import styled from "styled-components";
import { login } from "../functions/authFunctions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "../componenets/Container";
import Loader from "../componenets/Loader";
import { Helmet } from "react-helmet";
const Opl = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const auth = await login(email, password, dispatch, navigate);
    if (auth) {
      navigate("/");
    } else {
      setLoading(false);
      setError("Invalid credentials. Please try again.");
    }
  };

  return loading ? (
<>
<Helmet>
  <title>Loading</title>
</Helmet>
<Loader />    

</>
  ) : (
    <Container>
      
<Helmet>
  <title>Login</title>
</Helmet>
      <h1>Login</h1>
      <StyledForm onSubmit={handleSubmit}>
        <InputGroup>
          <StyledInput
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="SecretKey"
            required
          />
        </InputGroup>
        <InputGroup>
          <StyledInput
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="SecretCode"
            required
          />
        </InputGroup>
        {error && <ErrorText>{error}</ErrorText>}
        <StyledButton type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </StyledButton>
      </StyledForm>
    </Container>
  );
};

export default Opl;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  margin: 4px;
  text-align: left;
  label {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    display: block;
    color: #d1d1d1;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #4a90e2;
  }

  &::placeholder {
    color: #ccc;
  }
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(145deg, #3b82f6, #2c6edb);
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: linear-gradient(145deg, #4f91fc, #3b6fd6);
  }

  &:disabled {
    background: #aaa;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;
