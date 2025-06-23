import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetUserDetailsQuery, useUpdateProfileMutation, useUpdateUserMutation } from '../../../../redux/api/userApi'
import { useSelector } from 'react-redux'
import Button from '../../Buttons/Button'
import styled from "styled-components"
import Image from '../../ImagesContent/Image'
import toast from 'react-hot-toast';



//import icon
import UpdateAcc from "../../../../assets/icons/icon-update.png"

const UpdateAccountModalLayout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 20px;
    background-color: bisque;
    border-radius: 30px;
`
const UpdateAccountModalContent = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 20px;
    background-color: bisque;
    border-radius: 30px;
`

const Input = styled.input`
border: none;
  border-radius: 10px;
padding: 10px;
`;

const InputSelect = styled.select`
width: 100%;
border: none;
text-align: center;
border-radius: 10px;
padding: 10px;
`;

/* const Input = styled.input<{ $inputColor?: string; }>`
  padding: 0.5em;
  margin: 0.5em;
  color: ${props => props.$inputColor || "#BF4F74"}; //ovo je da mnjenjam boje u inputu
  background: papayawhip;
  border: none;
  border-radius: 3px;
`; */

const UpdateProfileModal = ({ userId, onClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const navigate = useNavigate();
    const params = useParams();
    const { data } = useGetUserDetailsQuery(userId);
    const [updateUser, { error, isSuccess }] = useUpdateUserMutation();

    useEffect(() => {
        if (data?.user) {
            setName(data?.user?.name);
            setEmail(data?.user?.email);
            setRole(data?.user?.role);
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);
        }

        if (isSuccess) {
            toast.success("User Updated");
            onClose();
        }
    }, [error, isSuccess, onClose]);



    const submitHandler = (e) => {
        e.preventDefault();
        const userData = { name, email, role };
        updateUser({ id: userId, body: userData });
    };

    return (
        <UpdateAccountModalLayout>
            <h1>Update Profile</h1>
            <UpdateAccountModalContent onSubmit={submitHandler}>
                <label htmlFor="name_field" className="formLabel">Name:</label>
                <Input type="text" id="name_field"
                    className="form-control" placeholder='fakeUserName'
                    value={name} onChange={(e) =>
                        setName(e.target.value)} name="name" />
                <label htmlFor="email_field" className="form-label">Email:</label>

                <Input type="email" placeholder='fake@email.com' value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email_field" className="form-control" name="email" />

                <label htmlFor="role_field">
                    Role
                </label>
                <InputSelect name="role" value={role}
                    onChange={(e) => setRole(e.target.value)} id="role_field">
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                </InputSelect>

                <Button type="submit">
                    <Image src={UpdateAcc} variant='iconImg' alt="" title='Update' />
                    Update
                </Button>

            </UpdateAccountModalContent>
        </UpdateAccountModalLayout>
    )
}

export default UpdateProfileModal