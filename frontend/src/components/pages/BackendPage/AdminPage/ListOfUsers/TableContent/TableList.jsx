import React from 'react'
//import css
import "./TableList.css"

//import icon
import UpdateAcc from "../../../../../../assets/icons/icon-update.png"
import DeleteAcc from "../../../../../../assets/icons/icon-delete-account.png"
import { useModal } from '../../../../../context/ModalContext/ModalContext'

const TableList = ({ currentUsers }) => {
    const { openUpdateUserModal, openDeleteUserModal } = useModal();

    return (
        <section className='tableSection'>
            <table className='userTable'>
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
                            {/* data-label = column name shown on phones (TableList.css) */}
                            <td data-label="#ID"># {user._id}</td>
                            <td data-label="Name">{user.name}</td>
                            <td data-label="Email">{user.email}</td>
                            <td data-label="Created">{user.createdAt?.substring(0, 10)}</td>
                            <td data-label="Role">{user.role}</td>
                            <td data-label="Actions">
                                <div className='btn-userListContent'>
                                    <button className='btn-userList'
                                        onClick={() => openUpdateUserModal(user._id)}>

                                        <img src={UpdateAcc} alt=""
                                            className='btnIcon-userList' title='Update' />
                                    </button>
                                    <button className='btn-userList'
                                        onClick={() => openDeleteUserModal(user)}>
                                        <img src={DeleteAcc} alt="" className='btnIcon-userList' title='Delete' />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>


    )
}

export default TableList