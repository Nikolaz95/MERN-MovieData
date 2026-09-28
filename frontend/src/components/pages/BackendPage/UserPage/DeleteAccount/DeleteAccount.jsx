import React from 'react'
import DashBoardLayout from '../../AdminPage/Layouts/DashBoardLayout/DashBoardLayout'
import UsersLayouts from '../userLayout/UsersLayouts'
import Button from '../../../../layouts/Buttons/Button'
import titleName from '../../../../hooks/useTitle';

//import css
import "./DeleteAccount.css"


//import img
import avatarDefault from "../../../../../assets/pictures/avatar-profile.jpg"
import DeleteBtn from "../../../../../assets/icons/icon-delete-account.png"
import Image from '../../../../layouts/ImagesContent/Image'
import { useModal } from '../../../../context/ModalContext/ModalContext'

//import css
import "./DeleteAccount.css"
import { useSelector } from 'react-redux'

const DeleteAccount = () => {
    titleName(`Delete Account`);
    const { user } = useSelector((state) => state.auth);
    console.log(user);

    const { openDeleteOwnAccountModal } = useModal();

    return (
        <DashBoardLayout>
            <h1>Delete Account</h1>
            <UsersLayouts>
                <h1>Delete Account</h1>
                <section className='deleteAccountContent'>
                    <div className="deleteAccountContainer">
                        <div className="deleteAccountTop">
                            <Image variant='profile' src={
                                user?.avatar ? user?.avatar?.url : avatarDefault
                            }
                                alt="" title="Your Profil picture"
                                className='deleteAccountImg' />
                        </div>
                        <div className="deleteAccountBottom">
                            <div className="deleteAccountName">
                                <h1>Full Name:</h1>
                                <p>{user.name}</p>
                            </div>
                            <div className="deleteAccountEmail">
                                <h1>Email:</h1>
                                <p>{user.email}</p>
                            </div>
                            <div className="deleteAccountBtnDelete">
                                <Button onClick={openDeleteOwnAccountModal}
                                    variant="deleteAccount" icon={DeleteBtn}
                                    title="Delete Account">
                                    <p>Delete Account</p>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </UsersLayouts>
        </DashBoardLayout>
    )
}

export default DeleteAccount