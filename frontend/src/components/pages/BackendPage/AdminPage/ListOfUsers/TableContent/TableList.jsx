import React, { useState } from 'react'
//import css
import "./TableList.css"

//import icon
import UpdateAcc from "../../../../../../assets/icons/icon-update.png"
import DeleteAcc from "../../../../../../assets/icons/icon-delete-account.png"
import Modal from '../../../../../layouts/ModalsComponent/ModalLayoutsComponent/ModalComponent/Modal'
import DeleteAccountModal from '../../../../../layouts/ModalsComponent/ModalsContent/DeleteAccountModal'
import UpdateProfileModal from '../../../../../layouts/ModalsComponent/ModalsContent/UpdateProfileModal'

const TableList = ({ currentUsers }) => {
    // State to track which modal is open
    const [activeModal, setActiveModal] = useState("");
    const [selectedUserId, setSelectedUserId] = useState(null);
    // Function to close the modal
    const closeModal = () => setActiveModal("");

    const handleUpdateClick = (userId) => {
        setSelectedUserId(userId);
        setActiveModal("updateAccount");
    };

    const handleDeleteClick = (userId) => {
        setSelectedUserId(userId);
        setActiveModal("deleteAccount");
    };

    return (
        <section className='tableSection'>
            <table>
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Created</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {currentUsers.map((user) => (
                        <tr key={user._id}>
                            <td># {user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.createdAt?.substring(0, 10)}</td>
                            <td>{user.role}</td>
                            <td>
                                <div className='btn-userListContent'>
                                    <button className='btn-userList'
                                        onClick={() => handleUpdateClick(user._id)}>

                                        <img src={UpdateAcc} alt=""
                                            className='btnIcon-userList' title='Update' />
                                    </button>
                                    <button className='btn-userList'
                                        onClick={() => handleDeleteClick(user._id)}>
                                        <img src={DeleteAcc} alt="" className='btnIcon-userList' title='Delete' />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal isOpen={activeModal === "updateAccount"} onClose={closeModal}>
                <UpdateProfileModal userId={selectedUserId} onClose={closeModal} />
            </Modal>

            <Modal isOpen={activeModal === "deleteAccount"} onClose={closeModal}>
                <DeleteAccountModal userId={selectedUserId} onClose={closeModal} />
            </Modal>
        </section>


    )
}

export default TableList