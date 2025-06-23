import React from 'react'
import Button from '../../Buttons/Button'
import style from "styled-components"
import toast from 'react-hot-toast';




//import img
import Yes from "../../../../assets/icons/icon-check.png"
import No from "../../../../assets/icons/icon-cancelPic.png"
//import components
import Image from '../../ImagesContent/Image'
import { useDeleteMyAccountMutation } from '../../../../redux/api/userApi';
import { useNavigate } from 'react-router-dom';

const DeleteAccountModalLayout = style.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 20px;
    background-color: bisque;
    border-radius: 30px;
`
const DeleteAccountModalContent = style.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 20px;
    background-color: bisque;
    border-radius: 30px;
`

const DeleteAccountModal = ({ onClose }) => {
    const navigate = useNavigate()
    const [deleteMyAccount, { isLoading }] = useDeleteMyAccountMutation();

    const handleDelete = async () => {
        try {
            // Call the backend API to delete the account
            await deleteMyAccount().unwrap();
            // Remove token from localStorage or sessionStorage
            localStorage.removeItem('token');
            // Show success message
            toast.success('Your account has been deleted successfully');
            // Redirect to home page or login page
            navigate('/', { replace: true });
            window.location.reload(); // Optionally force a page reload to clear session data
        } catch (error) {
            toast.error(error?.data?.message || 'Failed to delete your account');
        }
    };


    return (
        <DeleteAccountModalLayout>
            <h1>Do you realy wanna delete account ?</h1>
            <p>Are you sure you want to delete this user account?</p>
            <p>This action cannot be undone.</p>
            <DeleteAccountModalContent>
                <Button onClick={handleDelete}
                    disabled={isLoading}>
                    <Image src={Yes} variant='iconImg' />
                </Button>
                <Button>
                    <Image src={No} variant='iconImg' onClick={onClose} /></Button>
            </DeleteAccountModalContent>
        </DeleteAccountModalLayout>
    )
}

export default DeleteAccountModal