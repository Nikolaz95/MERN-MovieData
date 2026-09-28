import React from 'react'

import styled, { keyframes } from "styled-components"

const cardIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(18px) scale(0.97);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
`;

// white card: poster on top, title + buttons below
const UserPrivatListCard = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: white;
    border-radius: 18px;
    box-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);
    transition: transform 250ms ease, box-shadow 250ms ease;
    /* backwards (not both): after the entry the hover lift still works */
    animation: ${cardIn} 420ms ease-out backwards;
    animation-delay: ${({ $index }) => ($index % 12) * 45}ms;

    &:hover {
        transform: translateY(-6px);
        box-shadow: 0 16px 32px rgba(41, 175, 248, 0.22);
    }
`;

const CardTop = styled.div`
    position: relative;
    overflow: hidden;

    img {
        display: block;
        width: 100%;
        height: auto;
        aspect-ratio: 2 / 3;
        object-fit: cover;
        border-radius: 0;
        transition: transform 400ms ease;
    }

    ${UserPrivatListCard}:hover & img {
        transform: scale(1.06);
    }
`;

const CardBottom = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    gap: 10px;
    padding: 14px 12px 16px;
    text-align: center;

    h3 {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        font-size: 15px;
        font-weight: 800;
        line-height: 1.3;
        color: #1f2937;
    }
`;

const CardBottomTop = styled.div`
  text-align: center;
`;

const CardBottomInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;


// buttons at the bottom of the card, full width
const CardBottomBtns = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    margin-top: auto;

    .button {
        width: 100%;
        font-size: 13px;
    }

    @media (max-width: 425px) {
        .button {
            padding: 0 10px;
            font-size: 12px;
        }
    }
`;

const UserPrivatContent = ({ children, index = 0 }) => {
    return (
        <UserPrivatListCard $index={index}>
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
