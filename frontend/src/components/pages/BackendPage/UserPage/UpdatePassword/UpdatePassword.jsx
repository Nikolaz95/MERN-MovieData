import React, { useEffect, useState } from 'react'
import DashBoardLayout from '../../AdminPage/Layouts/DashBoardLayout/DashBoardLayout'
import UsersLayouts from '../userLayout/UsersLayouts'
import titleName from '../../../../hooks/useTitle';
import Button from '../../../../layouts/Buttons/Button';
import { useUpdatePasswordMutation } from '../../../../../redux/api/userApi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


//import css
import "./UpdatePassword.css"

//import img
import SaveUpdate from "../../../../../assets/icons/icon-upload.png"


const UpdatePassword = () => {

    titleName(`Update Password`);

    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const [updatePassword, { isLoading, error, isSuccess }] =
        useUpdatePasswordMutation();


    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);
        }

        if (isSuccess) {
            toast.success("Password Updated");
            navigate("/user/settings-Profile");
        }
    }, [error, isSuccess]);

    const submitHandler = (e) => {
        e.preventDefault();

        const userData = {
            oldPassword,
            password,
        };

        updatePassword(userData);
    };

    return (
        <DashBoardLayout>
            <h1>Update Password</h1>
            <UsersLayouts>
                <section className="updatePasswordSection">
                    <h1>Update Password:</h1>
                    <form className="formUpdatePassword" onSubmit={submitHandler}>
                        <label htmlFor="name_field" className="form-label">Old Password:</label>
                        <input
                            type="password"
                            id="name_field"
                            placeholder='user password'
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="form-control"
                            name="name" />
                        <label htmlFor="email_field" className="form-label">New Password:</label>
                        <input
                            type="password"
                            id="email_field"
                            placeholder='user new password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            name="email" />
                        <Button
                            variant="updatePassword" disabled={isLoading}>
                            <img src={SaveUpdate} className="iconBtns" />
                            {/* Update Password */}

                            {isLoading ? "Updating..." : "Update Password"}
                        </Button>
                    </form>
                </section>
            </UsersLayouts>
        </DashBoardLayout>
    )
}

export default UpdatePassword