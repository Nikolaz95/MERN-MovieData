import React, { useEffect, useState } from 'react'
import DashBoardLayout from '../../AdminPage/Layouts/DashBoardLayout/DashBoardLayout'
import UsersLayouts from '../userLayout/UsersLayouts'
import Button from '../../../../layouts/Buttons/Button'
import Image from '../../../../layouts/ImagesContent/Image'
import titleName from '../../../../hooks/useTitle';
import toast from 'react-hot-toast';


//import img
import avatarDefault from "../../../../../assets/icons/avatar-profile.jpg"
import UploadCamera from "../.././../../../assets/icons/icons-addCamera.png"
import SaveUpdate from "../.././../../../assets/icons/icon-save.png"
import CancelUpdate from "../.././../../../assets/icons/icon-cancelPic.png"

//import css
import "./UploadPicture.css"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useUploadAvatarMutation } from '../../../../../redux/api/userApi'


const UploadPicture = () => {
    titleName(`Upload Picture`)
    const navigate = useNavigate();

    const [uploadAvatar, { isLoading, error, isSuccess }] = useUploadAvatarMutation();

    const { user } = useSelector((state) => state.auth);

    const [avatar, setAvatar] = useState("");

    const [avatarPreview, setAvatarPreview] = useState(
        user?.avatar ? user?.avatar?.url : avatarDefault
    );


    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);
        }

        if (isSuccess) {
            toast.success("Avatar Uploaded");
            navigate("/user/settings-Profile");
        }
    }, [error, isSuccess]);


    const submitHandler = (e) => {
        e.preventDefault();

        const userData = {
            avatar,
        };
        console.log("========================");
        console.log(userData);
        console.log("========================");


        uploadAvatar(userData);
    };

    const onChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };


    return (
        <DashBoardLayout>
            <h1>Upload Picture</h1>
            <UsersLayouts>
                <section className='userUploadContent'>
                    <form action="" className="userUpload-info" onSubmit={submitHandler}>
                        <div className="userUpload-top">
                            <img src={avatarPreview} alt="avatar Default" className='userUpload-Profileimg' />
                            <input type="file" name='file' id='file' accept="images/*" onChange={onChange} />
                            <label htmlFor="file" className='userUpload-BtnUplFile'>
                                <img src={UploadCamera} title='Change picture' alt="chose a picture" className='userUpload-camera' />
                            </label>
                        </div>
                        <div className="userUpload-Btns">
                            <Button
                                variant="uploadPicture">
                                <img src={SaveUpdate} className="iconBtns" />
                                {/* Save Upload */}
                                {isLoading ? "Uploading..." : "Save Upload"}
                            </Button>
                            <Button
                                variant="cancelUploadImg">
                                <img src={CancelUpdate} className="iconBtns" />
                                Cancel
                            </Button>
                        </div>
                    </form>
                </section>
            </UsersLayouts>
        </DashBoardLayout>
    )
}

export default UploadPicture