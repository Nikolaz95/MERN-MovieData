import React, { useEffect, useRef, useState } from 'react'
import DashBoardLayout from '../../AdminPage/Layouts/DashBoardLayout/DashBoardLayout'
import titleName from '../../../../hooks/useTitle';
import toast from 'react-hot-toast';


//import img
import avatarDefault from "../../../../../assets/icons/avatar-profile.jpg"

//import css
import "./UploadPicture.css"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useUploadAvatarMutation } from '../../../../../redux/api/userApi'
import { PageHeader, Card, CardTitle, CardText, Actions, PrimaryButton, GhostButton } from '../userLayout/DashboardUI';

// the picture is sent as base64 in JSON (backend limit is 10 MB)
const MAX_FILE_SIZE_MB = 5;


const UploadPicture = () => {
    titleName(`Upload Picture`)
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [uploadAvatar, { isLoading, error, isSuccess }] = useUploadAvatarMutation();

    const { user } = useSelector((state) => state.auth);
    const currentAvatar = user?.avatar?.url || avatarDefault;

    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(currentAvatar);
    const [isDragging, setIsDragging] = useState(false);


    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);
        }

        if (isSuccess) {
            toast.success("Avatar Uploaded");
            navigate("/user/settings-Profile");
        }
    }, [error, isSuccess, navigate]);


    const submitHandler = (e) => {
        e.preventDefault();
        if (!avatar) return;
        uploadAvatar({ avatar });
    };

    const readFile = (file) => {
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            toast.error("Please choose an image file.");
            return;
        }
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
            toast.error(`The picture is too big (max ${MAX_FILE_SIZE_MB} MB).`);
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(file);
    };

    const onChange = (e) => {
        readFile(e.target.files[0]);
        e.target.value = ""; // choosing the same file again still triggers onChange
    };

    const onDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        readFile(e.dataTransfer.files[0]);
    };

    // cancel = back to the current picture (does not submit)
    const cancelChange = () => {
        setAvatar("");
        setAvatarPreview(currentAvatar);
    };


    return (
        <DashBoardLayout>
            <PageHeader title="Upload Picture" subtitle="Change your profile picture" />

            <Card>
                <CardTitle>Profile picture</CardTitle>
                <CardText>JPG, PNG or WEBP, max {MAX_FILE_SIZE_MB} MB. Click the picture or drop a file on it.</CardText>

                <form className="userUpload-info" onSubmit={submitHandler}>
                    <div className={`userUpload-top ${isDragging ? "dragging" : ""}`}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={onDrop}>
                        <button type="button" className="userUpload-pickBtn" onClick={() => fileInputRef.current?.click()}
                            aria-label="Choose a new picture">
                            <img src={avatarPreview} alt="" className='userUpload-Profileimg' key={avatarPreview.slice(-40)} />
                            <span className="userUpload-overlay">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                    <circle cx="12" cy="13" r="4" />
                                </svg>
                                Change
                            </span>
                        </button>
                        <span className="userUpload-camera" aria-hidden="true">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 5v14M5 12h14" />
                            </svg>
                        </span>
                        <input ref={fileInputRef} type="file" name='file' id='file' accept="image/*" onChange={onChange} />
                    </div>

                    {avatar && <p className="userUpload-newHint">New picture selected - save to use it.</p>}

                    <Actions className="userUpload-Btns">
                        <PrimaryButton type="submit" disabled={!avatar || isLoading}>
                            {isLoading ? "Uploading..." : "Save picture"}
                        </PrimaryButton>
                        <GhostButton type="button" onClick={cancelChange} disabled={!avatar || isLoading}>
                            Cancel
                        </GhostButton>
                    </Actions>
                </form>
            </Card>
        </DashBoardLayout>
    )
}

export default UploadPicture
