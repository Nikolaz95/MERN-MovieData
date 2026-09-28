import React from 'react'
import styled from "styled-components"


export const device = {
  mobile: `(max-width: 425px)`,
  tablet: `(max-width: 768px)`,
  laptop: `(max-width: 1024px)`,
};

// fluid grid of cards (watch list, favorit list, ratings, actors)
const UserPrivattListConteiner = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 22px;

  @media ${device.mobile} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }
`;


//import css
import "./UserContentLayouts.css"

const UserContentLayouts = ({ children }) => {
  return (
    <UserPrivattListConteiner>
      {children}
    </UserPrivattListConteiner>
  )
}

export default UserContentLayouts
