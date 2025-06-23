import React from 'react'
import titleName from '../../../../hooks/useTitle';
import { useSelector } from 'react-redux';
//import css
import "./UserProfileInfo.css"


import avatarDefault from "../../../../../assets/pictures/avatar-profile.jpg"


//import components
import DashBoardLayout from '../../AdminPage/Layouts/DashBoardLayout/DashBoardLayout'
import Image from '../../../../layouts/ImagesContent/Image';
import UsersLayouts from '../userLayout/UsersLayouts';

const UserProfileInfo = () => {
    titleName(`Profile Info`)
    const { user } = useSelector((state) => state.auth);
    return (
        <DashBoardLayout>
            <h1>Profile Info</h1>
            <UsersLayouts>
                <div className="userProfileConteiner">
                    <div className="userProfileConteinerTop">
                        <Image src={
                            user?.avatar ? user?.avatar?.url : avatarDefault
                        }
                            variant="profile"
                            className='userProfileImg' alt="userImg" />
                    </div>
                    <div className="userProfileConteinerBottom">
                        <div className="userProfileNameContent">
                            <h1>Full Name:</h1>
                            <p>{user?.name}</p>
                        </div>
                        <div className="userProfileEmailContent">
                            <h1>Email:</h1>
                            <p>{user?.email}</p>
                        </div>
                        <div className="userProfileJoinedContent">
                            <h1>Joined On:</h1>
                            <p>{user?.createdAt?.substring(0, 10)}</p>
                        </div>
                    </div>
                </div>
            </UsersLayouts>
        </DashBoardLayout>
    )
}

export default UserProfileInfo