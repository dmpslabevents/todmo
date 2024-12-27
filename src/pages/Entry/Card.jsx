import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../componenets/Container";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { visitorSet } from "../../store/visitorInfo.store";

const Card = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const visitorState = useSelector((state) => state.visitor);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Load the stored value from localStorage when the component mounts
  useEffect(() => {
    const storedValue = localStorage.getItem("selectedMachine");
    if (storedValue) {
      setSelectedValue(storedValue);
    }
  }, []);

  const handleDropdownChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    localStorage.setItem("selectedMachine", value); // Save the value to localStorage
  };

  const handleInserts = (payload) => {
    const updatedValue = payload.new;
    if (updatedValue.machine === (selectedValue || "op1")) {
      dispatch(visitorSet({ card: updatedValue.card }));
      setTimeout(() => {
        navigate("/o/finalCheck");
      }, 500);
    }
  };

  useEffect(() => {
    const channel = supabase
      .channel("machines")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "machines" },
        handleInserts
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel); // Correct way to unsubscribe
    };
  }, [handleInserts]);

  // Early return if visitorState.name is not set
  if (!visitorState.name) {
    return <Navigate to="/o/name" />;
  }

  return (
    <Container>
      <h1>Waiting for card tap on your current machine</h1>
      {visitorState.card && <h2>Current Card: {visitorState.card}</h2>}
      <StyledSelect
        id="dropdown"
        value={selectedValue}
        onChange={handleDropdownChange}
        style={{
          padding: "10px",
          borderRadius: 4,
        }}
      >
        <option value="" disabled>
          Select Your WorkMachine machine
        </option>
        <option value="op1">OP1</option>
        <option value="op2">OP2</option>
      </StyledSelect>
      {visitorState.card && (
        <StyledButton onClick={() => navigate("/o/finalCheck")}>
          next
        </StyledButton>
      )}
      <StyledButton onClick={() => navigate("/o/email")}>Back</StyledButton>
    </Container>
  );
};

const StyledButton = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(145deg, #3b82f6, #2c6edb);
  border: none;
  border-radius: 30px;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, background 0.3s ease;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-3px);
    background: linear-gradient(145deg, #4f91fc, #3b6fd6);
  }
`;

const StyledSelect = styled.select`
  background: white;
  border-radius: 3px;
  outline: none;
  border: none;
`;

export default Card;
