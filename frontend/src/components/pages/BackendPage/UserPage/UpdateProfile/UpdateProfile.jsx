import React, { useEffect, useState } from 'react'
import titleName from '../../../../hooks/useTitle';
import { useNavigate } from 'react-router-dom';
import { useUpdateProfileMutation } from '../../../../../redux/api/userApi';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

//import css
import "./UpdateProfile.css"

// import components
import DashBoardLayout from '../../AdminPage/Layouts/DashBoardLayout/DashBoardLayout'
import UsersLayouts from '../userLayout/UsersLayouts'
import Button from '../../../../layouts/Buttons/Button';

//import img
import updateImg from "../../../../../assets/icons/icon-upload.png"

const UpdateProfile = () => {
    titleName(`Update Profile`);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const [updateProfile, { isLoading, error, isSuccess }] = useUpdateProfileMutation();

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            setName(user?.name);
            setEmail(user?.email);
        }
        if (isSuccess) {
            toast.success("User Updated")
            navigate("/user/settings-Profile");
        }

        if (error) {
            toast.error(error?.data?.message);
        }
    }, [user, error, isSuccess]);


    const submitHandler = (e) => {
        e.preventDefault();

        const userData = {
            name,
            email,
        };

        updateProfile(userData);
    };


    return (
        <DashBoardLayout>
            <h1>Update Profile</h1>
            <UsersLayouts>
                <main className='formMain'>
                    <h1>Update Your Profile:</h1>
                    <form className="formContentUpdateProfile" onSubmit={submitHandler} >
                        <label htmlFor="name_field" className="formLabel">Name:</label>
                        <input type="text" id="name_field"
                            className="form-control" placeholder='fakeUserName'
                            value={name} onChange={(e) => setName(e.target.value)} name="name" />
                        <label htmlFor="email_field" className="form-label">Email:</label>
                        <input type="email" placeholder='fake@email.com' value={email} onChange={(e) => setEmail(e.target.value)}
                            id="email_field" className="form-control" name="email" />
                        <div className="btn-updateProfileSeting">
                            <Button
                                variant="updateProfile" disabled={isLoading} >
                                <img src={updateImg} className="iconBtns" />
                                {isLoading ? "Updating..." : "Save Update"}
                            </Button>
                        </div>
                    </form>
                </main>
            </UsersLayouts>
        </DashBoardLayout>

    )
}

export default UpdateProfile
