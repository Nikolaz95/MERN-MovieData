import React, { useEffect, useState } from 'react'
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../../../redux/api/userApi'
import toast from 'react-hot-toast';

//import img
import avatarDefault from "../../../../assets/pictures/avatar-profile.jpg"

//import components
import {
    ModalCard, CloseX, CloseIcon, ModalHeader, Avatar, Title, SubText,
    Form, Field, Label, Input, RoleToggle, RoleOption,
    Actions, GhostButton, PrimaryButton
} from './AdminModalStyles';

const ROLES = ["user", "admin"];

const UpdateProfileModal = ({ userId, onClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const { data, isLoading: isLoadingUser } = useGetUserDetailsQuery(userId);
    const [updateUser, { error, isSuccess, isLoading: isSaving }] = useUpdateUserMutation();

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
        <ModalCard role="dialog" aria-labelledby="updateModalTitle">
            <CloseX type="button" onClick={onClose} aria-label="Close">
                <CloseIcon />
            </CloseX>

            <ModalHeader>
                <Avatar src={data?.user?.avatar?.url || avatarDefault} alt="" />
                <div>
                    <Title id="updateModalTitle">Update user</Title>
                    <SubText>{isLoadingUser ? "Loading..." : data?.user?.email}</SubText>
                </div>
            </ModalHeader>

            <Form onSubmit={submitHandler}>
                <Field>
                    <Label htmlFor="name_field">Name</Label>
                    <Input type="text" id="name_field" name="name"
                        placeholder='fakeUserName'
                        value={name} onChange={(e) => setName(e.target.value)} />
                </Field>

                <Field>
                    <Label htmlFor="email_field">Email</Label>
                    <Input type="email" id="email_field" name="email"
                        placeholder='fake@email.com'
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                </Field>

                <Field>
                    <Label as="span">Role</Label>
                    <RoleToggle role="radiogroup" aria-label="Role">
                        {ROLES.map((r) => (
                            <RoleOption key={r} type="button"
                                role="radio" aria-checked={role === r}
                                $active={role === r}
                                onClick={() => setRole(r)}>
                                {r}
                            </RoleOption>
                        ))}
                    </RoleToggle>
                </Field>

                <Actions>
                    <GhostButton type="button" onClick={onClose} disabled={isSaving}>
                        Cancel
                    </GhostButton>
                    <PrimaryButton type="submit" disabled={isSaving || isLoadingUser}>
                        {isSaving ? "Saving..." : "Save changes"}
                    </PrimaryButton>
                </Actions>
            </Form>
        </ModalCard>
    )
}

export default UpdateProfileModal
