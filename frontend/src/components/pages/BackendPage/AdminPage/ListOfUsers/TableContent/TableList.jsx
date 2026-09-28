import React from 'react'
//import css
import "./TableList.css"

//import img
import avatarDefault from "../../../../../../assets/pictures/avatar-profile.jpg"
import { useModal } from '../../../../../context/ModalContext/ModalContext'

const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "–";

const TableList = ({ currentUsers, isLoading, emptyText }) => {
    const { openUpdateUserModal, openDeleteUserModal } = useModal();

    return (
        <section className='tableSection'>
            <table className='userTable'>
                <thead>
                    <tr>
                        <th>User</th>
                        <th className="colId">ID</th>
                        <th>Joined</th>
                        <th>Role</th>
                        <th className="colActions">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {isLoading && (
                        Array.from({ length: 4 }, (_, i) => (
                            <tr key={`skeleton-${i}`} className="userRowSkeleton" aria-hidden="true">
                                <td colSpan={5}><span /></td>
                            </tr>
                        ))
                    )}

                    {!isLoading && currentUsers.length === 0 && (
                        <tr className="userRowEmpty">
                            <td colSpan={5}>{emptyText}</td>
                        </tr>
                    )}

                    {currentUsers.map((user, i) => (
                        <tr key={user._id} style={{ "--i": i }}>
                            {/* data-label = column name shown on phones (TableList.css) */}
                            <td data-label="User">
                                <div className="userCell">
                                    <img src={user.avatar?.url || avatarDefault} alt="" className="userCellAvatar" />
                                    <div className="userCellText">
                                        <span className="userCellName">{user.name}</span>
                                        <span className="userCellEmail">{user.email}</span>
                                    </div>
                                </div>
                            </td>
                            <td data-label="ID" className="colId">
                                <span className="userIdChip" title={user._id}>#{user._id?.slice(-6)}</span>
                            </td>
                            <td data-label="Joined">{formatDate(user.createdAt)}</td>
                            <td data-label="Role">
                                <span className={`userRoleBadge ${user.role === "admin" ? "admin" : ""}`}>
                                    {user.role === "admin" ? "Admin" : "User"}
                                </span>
                            </td>
                            <td data-label="Actions" className="colActions">
                                <div className='btn-userListContent'>
                                    <button type="button" className='btn-userList edit'
                                        onClick={() => openUpdateUserModal(user._id)}
                                        title={`Edit ${user.name}`} aria-label={`Edit ${user.name}`}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <path d="M12 20h9" />
                                            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
                                        </svg>
                                    </button>
                                    <button type="button" className='btn-userList delete'
                                        onClick={() => openDeleteUserModal(user)}
                                        title={`Delete ${user.name}`} aria-label={`Delete ${user.name}`}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6" />
                                        </svg>
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
