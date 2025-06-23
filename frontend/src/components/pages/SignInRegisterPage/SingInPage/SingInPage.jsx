import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import titleName from '../../../hooks/useTitle';
import toast from 'react-hot-toast';

//import css
import "./SingInPage.css";

//import  icon
import backGroundImg from '../../../../assets/pictures/slikafilm.jpg';
import Show from "../../../../assets/icons/icon-show.png"
import Hide from "../../../../assets/icons/icon-hide.png"
import LogIn from "../../../../assets/icons/icon-login.png"
import CreateAccount from "../../../../assets/icons/icon-addAccount.png"


//import  components
import Button from '../../../layouts/Buttons/Button';
import LogInRegisterLayout from '../LogInRegisterLayout/LogInRegisterLayout';
import { useLoginMutation } from '../../../../redux/api/authApi';
import { useSelector } from 'react-redux';

const SingInPage = () => {
    titleName('Sign In');

    const [showPassword, setShowPassword] = useState(false);

    /* login part */

    /* const [email, setEmail] = useState(""); */
    /* const [password, setPassword] = useState(""); */

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [login, { isLoading, error, data }] = useLoginMutation();
    const { isAuthenticated, user } = useSelector((state) => state.auth)

    const navigate = useNavigate();

    console.log("========================");
    console.log(data);
    console.log("========================");


    useEffect(() => {
        if (isAuthenticated) {
            navigate("/user/settings-Profile");
            // Use user.name from Redux state if available
            const userName = user?.name || "User";
            toast.success(`Welcome back, ${userName}!`);
        }
        if (error) {
            toast.error(error?.data?.message)
        }
    }, [error, isAuthenticated, setTimeout, name, toast])

    const submitHandler = (e) => {
        e.preventDefault();

        /* const loginData = {
            email,
            password,
        }; */

        const loginData = {
            email: formData.email,
            password: formData.password,
        };

        login(loginData);
    }

    return (
        <LogInRegisterLayout backgroundImage={backGroundImg}>
            <h1 className="titleSingIn">Sign in</h1>
            <div className="formContent">
                <div className="lefSingIn">
                    <form className="formSingIn" onSubmit={submitHandler}>
                        <label htmlFor="mail" className="titleEmain">
                            Your Email :
                        </label>
                        <input type="email" id='mail'
                            className="inputContent"
                            placeholder='fake@email...'
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            } />
                        <label htmlFor="pwd" className="titlePwd">
                            Password :
                        </label>
                        <div className="paswordContentSingIn">
                            <input type={showPassword ? "text" : "password"}
                                id='pwd'
                                value={formData.password}

                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                                className="inputContent" placeholder='password...' />
                            <img title={showPassword ? "Hide password" : "Show password"}
                                src={showPassword ? Hide : Show} className="imgHideShow"
                                onClick={() => setShowPassword(prevState => !prevState)} />
                        </div>

                        <div className="bottonForm">
                            <div className="loginSingIn" >
                                <Button variant="loginBtn" icon={LogIn} disabled={isLoading}>
                                    {isLoading ? "Authenticating....." : "Log in"}
                                    {/* <p>Log in</p> */}
                                </Button>
                            </div>
                            <div className="dividerText">
                                <span className="dividerTextTitle">Or :</span>
                            </div>
                            <div className="btnRegistering">
                                <NavLink to="/registration">
                                    <Button variant="createAcc" icon={CreateAccount}>
                                        <p>Create a New Accoutn</p>
                                    </Button>
                                </NavLink>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="rightSingIn">
                    <h1 className="registeringInfoTitle">Benefits of your free  account</h1>
                    <p className="registeringInfoText">Personalized Recommendations</p>
                    <h1 className="registeringInfoTitle">Your Watchlist</h1>
                    <p className="registeringInfoText">Track everything you want to watch and receive e-mail when movies open in theaters.</p>
                    <h1 className="registeringInfoTitle">Your Favorit list</h1>
                    <p className="registeringInfoText">Track everything you want to watch and receive e-mail when movies open in theaters.</p>
                </div>
            </div>
        </LogInRegisterLayout>

    )
}

export default SingInPage