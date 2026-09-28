import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import titleName from '../../../hooks/useTitle';
import toast from 'react-hot-toast';

//import css
import "./SingInPage.css";


//import  components
import LogInRegisterLayout from '../LogInRegisterLayout/LogInRegisterLayout';
import { Form, Field, Label, Input, PasswordInput, PrimaryButton } from '../../BackendPage/UserPage/userLayout/DashboardUI';
import { useLoginMutation } from '../../../../redux/api/authApi';
import { useSelector } from 'react-redux';

const SingInPage = () => {
    titleName('Sign In');

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [login, { isLoading, error }] = useLoginMutation();
    const { isAuthenticated, user } = useSelector((state) => state.auth)

    const navigate = useNavigate();


    useEffect(() => {
        if (isAuthenticated) {
            navigate("/user/settings-Profile");
            // Use user.name from Redux state if available
            const userName = user?.name || "User";
            toast.success(`Welcome back, ${userName}!`);
        }
    }, [isAuthenticated, navigate, user]);

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message || "Login failed");
        }
    }, [error]);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        login({
            email: formData.email,
            password: formData.password,
        });
    }

    return (
        <LogInRegisterLayout
            panelTitle="Welcome back!"
            panelText="Sign in to get to your lists, ratings and favorite actors.">
            <header className="authFormHeader">
                <h1>Sign in</h1>
                <p>Enter your email and password.</p>
            </header>

            <Form onSubmit={submitHandler}>
                <Field>
                    <Label htmlFor="mail">Email</Label>
                    <Input type="email" id='mail' name="email" autoComplete="email"
                        placeholder='you@email.com' required autoFocus
                        value={formData.email} onChange={onChange} />
                </Field>
                <Field>
                    <Label htmlFor="pwd">Password</Label>
                    <PasswordInput id='pwd' name="password" autoComplete="current-password"
                        placeholder='Your password' required
                        value={formData.password} onChange={onChange} />
                </Field>

                <PrimaryButton type="submit" className="authSubmit" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign in"}
                </PrimaryButton>
            </Form>

            <p className="authSwitch">
                Don&apos;t have an account? <NavLink to="/registration">Create one for free</NavLink>
            </p>
        </LogInRegisterLayout>

    )
}

export default SingInPage
