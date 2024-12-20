import styled from "styled-components";

export const Container = styled.div` 
background-color: #ffffff;
box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.15);
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-evenly;
`

export const ContainerLeft = styled.div`
display: flex;
gap: 30px;
`
export const PageLink = styled.div`
cursor: pointer;
text-decoration: none;
color: ${props => (props.isActive ? "#9758a6" : "#555555")};
font-size: 16px;
line-height: 19px;
font-weight: ${props => (props.isActive ? "bold" : "normal")};
`

export const ContainerRight = styled.div`
display: flex;
align-items: center;
gap: 20px;
`

export const ContainerText = styled.div`
p{
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    color: #555555;
}
`

export const Line = styled.div`
height: 40px;
border: 0.5px solid #bababa;
`
export const PageLinkExit = styled.a`
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 16px;
display: flex;
align-items: center;
color: #9758a6;
cursor: pointer;
`
