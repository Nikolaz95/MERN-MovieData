import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import titleName from '../../../hooks/useTitle';
import toast from 'react-hot-toast';

//import css
import "./RegisterPage.css";

//import  icon
import backGroundImg from '../../../../assets/pictures/slikafilm.jpg';
import Show from "../../../../assets/icons/icon-show.png"
import Hide from "../../../../assets/icons/icon-hide.png"
import LogIn from "../../../../assets/icons/icon-login.png"
import CreateAccount from "../../../../assets/icons/icon-addAccount.png"

//import components
import Button from '../../../layouts/Buttons/Button';
import LogInRegisterLayout from '../LogInRegisterLayout/LogInRegisterLayout';
import { useRegisterMutation } from '../../../../redux/api/authApi';
import { useSelector } from 'react-redux';

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


    const [register, { isLoading, error, data }] = useRegisterMutation();

    console.log("========================");
    console.log(data);
    console.log("========================");

    /* const [password, setPassword] = useState(""); */
    const [showPassword, setShowPassword] = useState(false);


    useEffect(() => {
        if (isAuthenticated) {
            navigate("/user/settings-Profile");
            toast.success(`Welcome ${name} !`);
        }
        if (error) {
            toast.error(error?.data?.message)
        }
    }, [error, isAuthenticated, setTimeout, name, toast])

    const submitHandler = (e) => {
        e.preventDefault();

        const singUpData = {
            name,
            email,
            password,
        };

        register(singUpData);
    };


    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }


    return (
        <LogInRegisterLayout backgroundImage={backGroundImg}>
            <h1 className='titleRegisterCreatAccount'>Create Accunt</h1>
            <div className="formContent-register">
                <form className='form-register' onSubmit={submitHandler}>
                    <label htmlFor="name" className='titleRegisterUserName'>Your Username:</label>
                    <input type="text" name="name" value={name} onChange={onChange} id='name' className='inputContent'
                        placeholder='username...' />
                    <label htmlFor="mail" className='titleRegisterEmail'>Your Emai:</label>
                    <input type="email" name="email" value={email} onChange={onChange} id='mail' className='inputContent' placeholder='fake@email.com' />

                    <label htmlFor="pwd" className='titleRegisterPassword'>Password :</label>
                    <div className="pasword-contentRegister">
                        <input type={showPassword ? "text" : "password"} name="password" value={password} onChange={onChange}
                            id='pwd' className='inputContent' placeholder='password...' />
                        <img title={showPassword ? "Hide password" : "Show password"}
                            src={showPassword ? Hide : Show} className='imgHideShow'
                            onClick={() => setShowPassword(prevState => !prevState)} />
                    </div>
                    <div className="bottonForm-Register">
                        <div className="btn-Register">
                            <Button type="submit" variant="createAcc" icon={CreateAccount} disabled={isLoading} >
                                {/* <p>Create a New Accoutn</p> */}
                                {isLoading ? "Creating ..." : "Create a New Accoutn"}
                            </Button>
                        </div>
                        <div className="divider-text">
                            <span className='titleRegisterDevider'>Or:</span>
                        </div>
                        <div className="btn-loginSingIn">
                            <p className='titleRegisterTextHaveAcc'>You already have account ?</p>
                            <NavLink to="/signIn" className="singIn">
                                <Button variant="loginBtn" icon={LogIn}>
                                    <p>Sing In</p>
                                </Button>
                            </NavLink>
                        </div>
                    </div>
                </form>
            </div>
        </LogInRegisterLayout>
    )
}

export default RegisterPage