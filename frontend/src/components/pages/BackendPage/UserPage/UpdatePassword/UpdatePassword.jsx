import React, { useEffect, useState } from 'react'
import DashBoardLayout from '../../AdminPage/Layouts/DashBoardLayout/DashBoardLayout'
import titleName from '../../../../hooks/useTitle';
import { useUpdatePasswordMutation } from '../../../../../redux/api/userApi';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


//import css
import "./UpdatePassword.css"

import {
    PageHeader, Card, CardTitle, CardText, Form, Field, Label, PasswordInput, Hint, Actions,
    PrimaryButton, GhostButton
} from '../userLayout/DashboardUI';

// same rule as the backend (user model)
const MIN_PASSWORD_LENGTH = 6;


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
    }, [error, isSuccess, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();

        const userData = {
            oldPassword,
            password,
        };

        updatePassword(userData);
    };

    const isTooShort = password.length > 0 && password.length < MIN_PASSWORD_LENGTH;
    const canSubmit = oldPassword && password.length >= MIN_PASSWORD_LENGTH && !isLoading;

    return (
        <DashBoardLayout>
            <PageHeader title="Update Password" subtitle="Keep your account safe" />

            <Card>
                <CardTitle>Change password</CardTitle>
                <CardText>Enter your current password and choose a new one.</CardText>

                <Form onSubmit={submitHandler}>
                    <Field>
                        <Label htmlFor="old_password_field">Current password</Label>
                        <PasswordInput id="old_password_field" value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder="Your current password" autoComplete="current-password" required />
                    </Field>
                    <Field>
                        <Label htmlFor="new_password_field">New password</Label>
                        <PasswordInput id="new_password_field" value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="New password" autoComplete="new-password" required />
                        <Hint className={isTooShort ? "passwordHintError" : ""}>
                            At least {MIN_PASSWORD_LENGTH} characters
                        </Hint>
                    </Field>

                    <Actions>
                        <PrimaryButton type="submit" disabled={!canSubmit}>
                            {isLoading ? "Updating..." : "Update password"}
                        </PrimaryButton>
                        <GhostButton as={NavLink} to="/user/settings-Profile">Cancel</GhostButton>
                    </Actions>
                </Form>
            </Card>
        </DashBoardLayout>
    )
}

export default UpdatePassword
