import React from 'react'

import styled from "styled-components"


const UserPrivatListCard = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 10px;
width: 200px;
border: 1px solid black;
`;

const CardTop = styled.div`

`;

const CardBottom = styled.div`
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    /* text-align: center; */
    gap: 10px;
`;

const CardBottomTop = styled.div`
  text-align: center;
`;

const CardBottomInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;


const CardBottomBtns = styled.div`
display: flex;
    flex-direction: column;
    gap: 10px;
`;

const UserPrivatContent = ({ children }) => {
    return (
        <UserPrivatListCard>

            {children}
        </UserPrivatListCard>
    )
};

// Attach sub-components
UserPrivatContent.Top = CardTop;
UserPrivatContent.Bottom = CardBottom;
UserPrivatContent.BottomTop = CardBottomTop;
UserPrivatContent.BottomInfo = CardBottomInfo;
UserPrivatContent.BottomBtns = CardBottomBtns;

export default UserPrivatContent