import React from 'react'
import DashBoardLayout from '../../AdminPage/Layouts/DashBoardLayout/DashBoardLayout'
import titleName from '../../../../hooks/useTitle';

//import css
import "./DeleteAccount.css"


//import img
import avatarDefault from "../../../../../assets/pictures/avatar-profile.jpg"
import { useModal } from '../../../../context/ModalContext/ModalContext'
import { PageHeader, Card, DangerButton } from '../userLayout/DashboardUI';

import { useSelector } from 'react-redux'

// what the backend deletes (authControllers.js -> deleteOwnAccount)
const DELETED_ITEMS = ["Your profile (name, email, password)", "Your profile picture", "You are logged out right away"];

const DeleteAccount = () => {
    titleName(`Delete Account`);
    const { user } = useSelector((state) => state.auth);

    const { openDeleteOwnAccountModal } = useModal();

    return (
        <DashBoardLayout>
            <PageHeader title="Delete Account" subtitle="Permanently remove your account" />

            <Card className="deleteAccountCard">
                <div className="deleteAccountUser">
                    <img src={user?.avatar?.url || avatarDefault} alt="" className='deleteAccountImg' />
                    <div>
                        <p className="deleteAccountName">{user?.name}</p>
                        <p className="deleteAccountEmail">{user?.email}</p>
                    </div>
                </div>

                <div className="deleteAccountWarning">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01" />
                    </svg>
                    <div>
                        <p className="deleteAccountWarningTitle">This action cannot be undone</p>
                        <p>Deleting your account:</p>
                        <ul className="deleteAccountList">
                            {DELETED_ITEMS.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                    </div>
                </div>

                <DangerButton type="button" onClick={openDeleteOwnAccountModal}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6" />
                    </svg>
                    Delete my account
                </DangerButton>
            </Card>
        </DashBoardLayout>
    )
}

export default DeleteAccount
