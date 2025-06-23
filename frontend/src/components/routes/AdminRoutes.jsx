import React from 'react'
import ProtectRoute from '../pages/SignInRegisterPage/ProtectRoute'
import DashBoard from '../pages/BackendPage/AdminPage/DashBoardSection/DashBoard'
import ListOfUsers from '../pages/BackendPage/AdminPage/ListOfUsers/ListOfUsers'
import DataFact from '../pages/BackendPage/AdminPage/DataFact/DataFact'

export const AdminRoutes = [
    {
        path: "/admin/dashBoard",
        element: (
            <ProtectRoute admin={true}>
                <DashBoard />
            </ProtectRoute>
        )
    },
    {
        path: "/admin/listOfUsers",
        element: (
            <ProtectRoute admin={true}>
                <ListOfUsers />
            </ProtectRoute>
        )
    },
    {
        path: "/admin/dataFacts",
        element: (
            <ProtectRoute admin={true}>
                <DataFact />
            </ProtectRoute>
        )
    },
]

