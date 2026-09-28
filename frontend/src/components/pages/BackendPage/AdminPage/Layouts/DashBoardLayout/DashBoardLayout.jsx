import React from 'react'
import Sidebar from '../SideBar/Sidebar'
import styled from "styled-components";

const AdminDashBoardSection = styled.section`
    height: calc(100vh - var(--headerHeight));
`;

const AdminDashBoardMainContent = styled.main`
    position: relative;
    display: flex;
    flex-direction: row;
    height: 100%;
    gap: 10px;

    /* phones: sidebar floats over the content (Sidebar.css), keep room for the closed one */
    @media (max-width: 600px) {
        padding-left: 70px;
        gap: 0;
    }
`;

const AdminDashBoardUsersContent = styled.main`
    width: 100%;
    min-width: 0;
    height: 100%;
    /* padding: 20px; */
    border: 1px solid;
    overflow-x: hidden;
    overflow-y: scroll;
    scrollbar-width: none;

    @media (max-width: 600px) {
        overflow-wrap: anywhere;

        h1 {
            font-size: 1.4rem;
        }

        h2 {
            font-size: 1.2rem;
        }
    }
`;


const DashBoardLayout = ({ children }) => {
    return (
        <AdminDashBoardSection>
            <AdminDashBoardMainContent>
                <Sidebar />
                <AdminDashBoardUsersContent>
                    {children}
                </AdminDashBoardUsersContent>
            </AdminDashBoardMainContent>
        </AdminDashBoardSection>
    )
}

export default DashBoardLayout