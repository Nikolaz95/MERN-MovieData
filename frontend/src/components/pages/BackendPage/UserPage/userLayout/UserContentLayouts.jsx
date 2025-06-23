import React from 'react'
import styled from "styled-components"


export const device = {
  mobile: `(max-width: 425px)`,
  tablet: `(max-width: 768px)`,
  laptop: `(max-width: 1024px)`,
};

const UserPrivatListSection = styled.section`
  padding: 10px;
  border: 1px solid black;
  height: 100%;

  @media ${device.mobile} {
    padding: 0px;
    grid-template-columns: 1fr;
  }
`;

const UserPrivattListConteiner = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: center;
  gap: 20px;

  @media ${device.laptop} {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr;
  }

  @media ${device.mobile} {
    padding: 0px;
    grid-template-columns: 1fr;
  }
`;


const UserPrivatListCard = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 200px;
border: 1px solid black;
`;


//import css
import "./UserContentLayouts.css"

const UserContentLayouts = ({ children }) => {
  return (
    <UserPrivatListSection>
      <UserPrivattListConteiner>
        {children}
      </UserPrivattListConteiner>
    </UserPrivatListSection>
  )
}

export default UserContentLayouts