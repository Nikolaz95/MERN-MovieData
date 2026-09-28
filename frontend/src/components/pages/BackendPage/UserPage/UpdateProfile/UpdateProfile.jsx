import React, { useEffect, useState } from 'react'
import titleName from '../../../../hooks/useTitle';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUpdateProfileMutation } from '../../../../../redux/api/userApi';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

//import css
import "./UpdateProfile.css"

// import components
import DashBoardLayout from '../../AdminPage/Layouts/DashBoardLayout/DashBoardLayout'
import {
    PageHeader, Card, CardTitle, CardText, Form, Field, Label, Input, Actions,
    PrimaryButton, GhostButton
} from '../userLayout/DashboardUI';

const UpdateProfile = () => {
    titleName(`Update Profile`);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const [updateProfile, { isLoading, error, isSuccess }] = useUpdateProfileMutation();

    const { user } = useSelector((state) => state.auth);

    // fill the form with the current values
    useEffect(() => {
        if (user) {
            setName(user?.name);
            setEmail(user?.email);
        }
    }, [user]);

    useEffect(() => {
        if (isSuccess) {
            toast.success("User Updated")
            navigate("/user/settings-Profile");
        }

        if (error) {
            toast.error(error?.data?.message);
        }
    }, [error, isSuccess, navigate]);


    const submitHandler = (e) => {
        e.preventDefault();

        const userData = {
            name,
            email,
        };

        updateProfile(userData);
    };

    const hasChanges = name !== user?.name || email !== user?.email;

    return (
        <DashBoardLayout>
            <PageHeader title="Update Profile" subtitle="Change your name and email" />

            <Card>
                <CardTitle>Personal info</CardTitle>
                <CardText>This is how other users see you in reviews.</CardText>

                <Form onSubmit={submitHandler}>
                    <Field>
                        <Label htmlFor="name_field">Name</Label>
                        <Input type="text" id="name_field" name="name" autoComplete="name"
                            placeholder='Your name' required
                            value={name} onChange={(e) => setName(e.target.value)} />
                    </Field>
                    <Field>
                        <Label htmlFor="email_field">Email</Label>
                        <Input type="email" id="email_field" name="email" autoComplete="email"
                            placeholder='you@email.com' required
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Field>

                    <Actions>
                        <PrimaryButton type="submit" disabled={isLoading || !hasChanges}>
                            {isLoading ? "Saving..." : "Save changes"}
                        </PrimaryButton>
                        <GhostButton as={NavLink} to="/user/settings-Profile">Cancel</GhostButton>
                    </Actions>
                </Form>
            </Card>
        </DashBoardLayout>

    )
}

export default UpdateProfile
