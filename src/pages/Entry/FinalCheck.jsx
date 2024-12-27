import React, {useState} from "react";
import Container from "../../componenets/Container";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { visitorCls } from "../../store/visitorInfo.store";
import { supabase } from "../../supabaseClient";
import Loader from "../../componenets/Loader";
const FinalCheck = () => {
  const visitor = useSelector((state) => state.visitor);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (!visitor.name) {
    return <Navigate to="/o/name" />;
  }
  if (!visitor.email) {
    return <Navigate to="/o/email" />;
  }
  if (!visitor.card) {
    return <Navigate to="/o/card" />;
  }
  const insertData = async () => {
    setLoading(true)
    // Insert data into Supabase
    const { data, error } = await supabase.from("all_holders").insert([
      {
        name: visitor.name,
        email: visitor.email,
        card: visitor.card,
      },
    ]);
    const { data: CardData, error: CardError } = await supabase
      .from("current_cards")
      .update({
        holder: visitor.email,
        card: visitor.card,
      })
      .eq("card", visitor.card); // Match based on `card` value

    if (error) {setLoading(false);alert( error.message)};
    if (CardError) {setLoading(false);throw error};
    setTimeout(() => {
      dispatch(visitorCls());
      alert("Success");
    }, 500);
    setTimeout(() => {
      navigate("/");
    }, 800);
    return CardData; // Return data so the promise resolves
  };
  return loading ? (
    <Loader />
  ) : (
    <Container>
      <h2>Final Details</h2>
      <h3>Name: {visitor.name}</h3>
      <h3>QrMail: {visitor.email}</h3>
      <h3>Card: {visitor.card}</h3>
      <StyledButton onClick={() => insertData()}>Submit</StyledButton>
      <StyledButton onClick={() => navigate("/o/card")}>Back</StyledButton>
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

export default FinalCheck;
