import React from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useModal } from './ModalContext';
import { useDeleteMyAccountMutation, useDeleteUserMutation } from '../../../redux/api/userApi';

//import components
import Modal from '../../layouts/ModalsComponent/ModalLayoutsComponent/ModalComponent/Modal';
import DeleteAccountModal from '../../layouts/ModalsComponent/ModalsContent/DeleteAccountModal';
import UpdateProfileModal from '../../layouts/ModalsComponent/ModalsContent/UpdateProfileModal';
import MovieTvShowPictureModal from '../../layouts/ModalsComponent/ModalsContent/MovieTvShowPictureModal';
import StreamingModal from '../../layouts/ModalsComponent/ModalsContent/StreamingModal/StreamingModal';

const GlobalModals = () => {
    const navigate = useNavigate();
    const { activeModal, modalData, closeModal } = useModal();

    const [deleteMyAccount, { isLoading: isDeletingOwnAccount }] = useDeleteMyAccountMutation();
    const [deleteUser, { isLoading: isDeletingUser }] = useDeleteUserMutation();

    /* funkcija - user delete own account */
    const confirmDeleteOwnAccount = async () => {
        try {
            // Call the backend API to delete the account
            await deleteMyAccount().unwrap();
            // Remove token from localStorage or sessionStorage
            localStorage.removeItem('token');
            // Show success message
            toast.success('Your account has been deleted successfully');
            closeModal();
            // Redirect to home page or login page
            navigate('/', { replace: true });
            window.location.reload(); // Optionally force a page reload to clear session data
        } catch (error) {
            toast.error(error?.data?.message || 'Failed to delete your account');
        }
    };

    /* funkcija - admin delete user */
    const confirmDeleteUser = async () => {
        try {
            await deleteUser(modalData?.userId).unwrap();
            toast.success('User has been deleted successfully');
            closeModal();
        } catch (error) {
            toast.error(error?.data?.message || 'Failed to delete user');
        }
    };


    return (
        <>
            {/* user - delete own account */}
            <Modal isOpen={activeModal === "deleteOwnAccountModal"} onClose={closeModal}>
                <DeleteAccountModal
                    titleText="Delete account"
                    underPText="Are you sure you want to delete your account?"
                    onConfirm={confirmDeleteOwnAccount}
                    isLoading={isDeletingOwnAccount}
                    onClose={closeModal}
                />
            </Modal>

            {/* admin - update user */}
            <Modal isOpen={activeModal === "updateUserModal"} onClose={closeModal}>
                <UpdateProfileModal userId={modalData?.userId} onClose={closeModal} />
            </Modal>

            {/* admin - delete user */}
            <Modal isOpen={activeModal === "deleteUserModal"} onClose={closeModal}>
                <DeleteAccountModal
                    titleText="Delete user"
                    underPText="Are you sure you want to delete this user account?"
                    userName={modalData?.userName}
                    userEmail={modalData?.userEmail}
                    onConfirm={confirmDeleteUser}
                    isLoading={isDeletingUser}
                    onClose={closeModal}
                />
            </Modal>

            {/* movie / tv show picture */}
            <Modal isOpen={activeModal === "pictureModal"} onClose={closeModal}>
                <MovieTvShowPictureModal data={modalData?.picture} />
            </Modal>

            {/* streaming providers */}
            <Modal isOpen={activeModal === "streamingModal"} onClose={closeModal}>
                <StreamingModal
                    movieInfo={modalData?.movieInfo}
                    type={modalData?.type}
                    onClose={closeModal}
                />
            </Modal>
        </>
    )
}

export default GlobalModals
