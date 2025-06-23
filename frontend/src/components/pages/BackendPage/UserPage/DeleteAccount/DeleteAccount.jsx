import React, { useState } from 'react'
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
import Modal from '../../../../layouts/ModalsComponent/ModalLayoutsComponent/ModalComponent/Modal'
import DeleteAccountModal from '../../../../layouts/ModalsComponent/ModalsContent/DeleteAccountModal'

//import css
import "./DeleteAccount.css"
import { useSelector } from 'react-redux'

const DeleteAccount = () => {
    titleName(`Delete Account`);
    const { user } = useSelector((state) => state.auth);
    console.log(user);

    // State to track which modal is open
    const [activeModal, setActiveModal] = useState("");

    // Function to close the modal
    const closeModal = () => setActiveModal("");
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
                                <Button onClick={() => setActiveModal("deleteAccount")}
                                    variant="deleteAccount" icon={DeleteBtn}
                                    title="Delete Account">
                                    <p>Delete Account</p>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </UsersLayouts>

            {/* Modal for delete modal */}
            <Modal isOpen={activeModal === "deleteAccount"} onClose={closeModal}>
                <DeleteAccountModal onClose={closeModal} />
            </Modal>
        </DashBoardLayout>
    )
}

export default DeleteAccount