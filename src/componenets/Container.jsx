import React from 'react'
import styled from 'styled-components'

const Container = ({children, ...props}) => {
  return (
    <StyledContainer {...props}>
        {children}
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding: 20px;
background-color: hsl(216, 50%, 16%);
border-radius: 11px;
flex-direction: column;
color: white;

*{
margin: 5px;
}
`

export default Container