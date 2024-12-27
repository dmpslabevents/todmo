import React, { useState, useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import styled from "styled-components";
import Container from "../../componenets/Container";
import { useDispatch, useSelector } from "react-redux"; // Added useSelector import
import { visitorSet } from "../../store/visitorInfo.store";
import { Helmet } from "react-helmet";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

const VisitorMail = () => {
  const [scannerEnabled, setScannerEnabled] = useState(false);
  const dispatch = useDispatch();
  const [entryType, setEntryType] = useState(0);
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const visitorState = useSelector((state) => state.visitor);
  const navigate = useNavigate();
  useEffect(() => {
    if (scannerEnabled) {
      const codeReader = new BrowserMultiFormatReader();
      codeReader
        .decodeFromVideoDevice(null, "video", (result, error) => {
          if (result) {
            const qrData = result.getText();
            const emailPattern =
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (emailPattern.test(qrData)) {
              dispatch(visitorSet({ email: qrData }));
              setTimeout(() => {
                codeReader.reset();
              }, 200);
              setTimeout(() => {
                navigate("/o/card");
              }, 500);
            }
          }
          if (error) {
            console.info(error);
          }
        })
        .catch((err) => console.error("Error:", err));

      return () => {
        codeReader.reset();
      };
    }
  }, [scannerEnabled, dispatch]);

  if (!visitorState.name) {
    return <Navigate to="/o/name" />;
  }
  // if (visitorState.email){
  //   return navigate("/o/card")
  // }
  return (
    <Container>
      {entryType === 0 && (
        <>
          <Helmet>
            <title>Qrcode</title>
          </Helmet>
          <ScannerContainer>
            <ScannerFrame>
              {scannerEnabled && (
                <video id="video" width="100%" height="100%" />
              )}
              <ScannerOverlay />
            </ScannerFrame>
          </ScannerContainer>
          {visitorState.email ? (
            <>
              <span>current: {visitorState.email}</span>
              <StyledButton onClick={() => navigate("/o/card")}>
                next
              </StyledButton>
            </>
          ) : null}
          <StyledButton onClick={() => setScannerEnabled(true)}>
            Start Scanning
          </StyledButton>
          <StyledButton onClick={() => setEntryType(1)}>manual</StyledButton>
          <StyledButton onClick={() => setEntryType(2)}>
            agent based
          </StyledButton>
        </>
      )}

      {entryType === 1 && (
        <>
          <Helmet>
            <title>ManualEnter</title>
          </Helmet>
          <h2>Operator, Be Careful</h2>
          <h2>Here, mistakes are not allowed</h2>
          <StyledInput
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
          <StyledButton
            onClick={() => {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation regex
              if (!emailRegex.test(email)) {
                alert("Please enter a valid email address."); // You can replace this with any UI feedback
                return;
              }
              dispatch(visitorSet({ email }));
              navigate("/o/card");
            }}
          >
            Next
          </StyledButton>

          <StyledButton onClick={() => setEntryType(0)}>
            back to automatic
          </StyledButton>
        </>
      )}
      <StyledButton onClick={() => navigate("/o/name")}>Back</StyledButton>
    </Container>
  );
};

// Styled Components
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

const ScannerContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 90vw; /* Max width adjusted for responsiveness */
  height: auto;
  aspect-ratio: 1; /* Maintain square aspect ratio */
  margin-bottom: 1.5rem;
`;

const ScannerFrame = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  border: 4px solid #ff416c;
`;

const ScannerOverlay = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 16px;
`;

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

export default VisitorMail;
