import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import titleName from '../../../hooks/useTitle';
import toast from 'react-hot-toast';

//import css
import "./RegisterPage.css";

//import components
import LogInRegisterLayout from '../LogInRegisterLayout/LogInRegisterLayout';
import { Form, Field, Label, Input, PasswordInput, Hint, PrimaryButton } from '../../BackendPage/UserPage/userLayout/DashboardUI';
import { useRegisterMutation } from '../../../../redux/api/authApi';
import { useSelector } from 'react-redux';

// same rules as the backend (user model)
const MAX_NAME_LENGTH = 50;
const MIN_PASSWORD_LENGTH = 6;

const RegisterPage = () => {
    titleName('Register');

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = user;

    const { isAuthenticated } = useSelector((state) => state.auth)
    const navigate = useNavigate();


    const [register, { isLoading, error }] = useRegisterMutation();


    useEffect(() => {
        if (isAuthenticated) {
            navigate("/user/settings-Profile");
            toast.success(`Welcome ${name} !`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message || "Registration failed");
        }
    }, [error]);

    const submitHandler = (e) => {
        e.preventDefault();
        register({ name, email, password });
    };


    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const isPasswordTooShort = password.length > 0 && password.length < MIN_PASSWORD_LENGTH;


    return (
        <LogInRegisterLayout
            panelTitle="Join MovieData"
            panelText="Create a free account in a few seconds.">
            <header className="authFormHeader">
                <h1>Create account</h1>
                <p>It&apos;s free - no credit card needed.</p>
            </header>

            <Form onSubmit={submitHandler}>
                <Field>
                    <Label htmlFor="name">Username</Label>
                    <Input type="text" name="name" id='name' autoComplete="username"
                        placeholder='Your name' required autoFocus maxLength={MAX_NAME_LENGTH}
                        value={name} onChange={onChange} />
                </Field>
                <Field>
                    <Label htmlFor="mail">Email</Label>
                    <Input type="email" name="email" id='mail' autoComplete="email"
                        placeholder='you@email.com' required
                        value={email} onChange={onChange} />
                </Field>
                <Field>
                    <Label htmlFor="pwd">Password</Label>
                    <PasswordInput name="password" id='pwd' autoComplete="new-password"
                        placeholder='Choose a password' required minLength={MIN_PASSWORD_LENGTH}
                        value={password} onChange={onChange} />
                    <Hint className={isPasswordTooShort ? "authHintError" : ""}>
                        At least {MIN_PASSWORD_LENGTH} characters
                    </Hint>
                </Field>

                <PrimaryButton type="submit" className="authSubmit" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create account"}
                </PrimaryButton>
            </Form>

            <p className="authSwitch">
                Already have an account? <NavLink to="/signIn">Sign in</NavLink>
            </p>
        </LogInRegisterLayout>
    )
}

export default RegisterPage
