import React, {useEffect, useState} from 'react'
import Container from '../../componenets/Container'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { visitorSet } from '../../store/visitorInfo.store';
import { useNavigate } from 'react-router-dom';
const Name = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const visitorName = useSelector(state => state.visitor.name);

  const [name, setName] = useState("")
  useEffect(() => {
    if (visitorName){
      setName(visitorName)
    }
  }, [visitorName])
  
  const handleNameChange = (e) => {setName(e.target.value); dispatch(visitorSet({name: e.target.value}))};

  return (
    <Container>
      <h1>Visitor Info</h1>
      <StyledInput type="text" placeholder='Name' value={name} onChange={handleNameChange} />
      <StyledButton onClick={() => navigate("/o/email")}>Next</StyledButton>
    </Container>
  )
}

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

export default Name