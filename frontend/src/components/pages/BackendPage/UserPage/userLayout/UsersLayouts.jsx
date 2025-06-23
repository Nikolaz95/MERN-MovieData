import React from 'react'
import style from "styled-components"


const UserProfileLayouts = style.div`
    display: flex;
    flex-direction: column;
    justify-content:center;
align-items: center;
    gap: 20px;
    height: 100%;
`


const UsersLayouts = ({ children }) => {
    return (
        <UserProfileLayouts>
            {children}
        </UserProfileLayouts>
    )
}

export default UsersLayouts