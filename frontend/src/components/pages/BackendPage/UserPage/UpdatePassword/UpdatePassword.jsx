import React, { useEffect, useState } from 'react'
import DashBoardLayout from '../../AdminPage/Layouts/DashBoardLayout/DashBoardLayout'
import titleName from '../../../../hooks/useTitle';
import { useUpdatePasswordMutation } from '../../../../../redux/api/userApi';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


//import css
import "./UpdatePassword.css"

import {
    PageHeader, Card, CardTitle, CardText, Form, Field, Label, Input, Hint, Actions,
    PrimaryButton, GhostButton
} from '../userLayout/DashboardUI';

// same rule as the backend (user model)
const MIN_PASSWORD_LENGTH = 6;


// password input with a show / hide button
const PasswordInput = ({ id, value, onChange, placeholder, autoComplete }) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <div className="passwordField">
            <Input type={isVisible ? "text" : "password"} id={id} value={value} onChange={onChange}
                placeholder={placeholder} autoComplete={autoComplete} required />
            <button type="button" className="passwordToggle" onClick={() => setIsVisible((v) => !v)}
                aria-label={isVisible ? "Hide password" : "Show password"}>
                {isVisible ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.9 17.9A10.4 10.4 0 0 1 12 20c-7 0-10-8-10-8a18 18 0 0 1 5.1-5.9M9.9 4.2A9.4 9.4 0 0 1 12 4c7 0 10 8 10 8a18 18 0 0 1-2.2 3.2M1 1l22 22" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /></svg>
                ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-8 10-8 10 8 10 8-3 8-10 8-10-8-10-8z" /><circle cx="12" cy="12" r="3" /></svg>
                )}
            </button>
        </div>
    );
};


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
                            placeholder="Your current password" autoComplete="current-password" />
                    </Field>
                    <Field>
                        <Label htmlFor="new_password_field">New password</Label>
                        <PasswordInput id="new_password_field" value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="New password" autoComplete="new-password" />
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
