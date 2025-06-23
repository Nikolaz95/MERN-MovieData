import React from 'react'
import { useMoveBack } from '../../hooks/useMoveBack';
import titleName from '../../hooks/useTitle';


//import css
import "./ErrorPage.css";

/* import img */
import Eror from "../../../assets/icons/icon-error.png"

//import components
import Button from '../../layouts/Buttons/Button';


const ErrorPage = () => {
    const goBack = useMoveBack();
    titleName(`Error Page`);
    return (
        <div className="erorContent">
            <div className="erorTopContent">
                <Button onClick={goBack}
                    variant="goBack">
                    {/* <IoCaretBackCircleSharp /> */}
                    <p>Go Back</p>
                </Button>
            </div>
            <div className="mainContent">
                <img src={Eror} alt="" className='imgEror' />
                <p className='textEror vibrate-1'>This page not exist</p>
                <img src={Eror} alt="" className='imgEror' />
            </div>
        </div>
    )
}

export default ErrorPage