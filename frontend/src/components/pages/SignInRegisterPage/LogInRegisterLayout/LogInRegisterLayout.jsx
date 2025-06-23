import React from 'react'

//import css
import "./LogInRegisterLayout.css";


//import  components
import BackGroudImg from '../../../layouts/BackGroundContent/BackGroudImg/BackGroudImg';

const LogInRegisterLayout = ({ children, backgroundImage }) => {
    return (
        <>
            <BackGroudImg image={backgroundImage} />
            <section className="sectionLogInRegisterLayout">
                <main className="logInRegisterLayoutSection">
                    <div className="logInRegisterLayoutContent">
                        {children}
                    </div>
                </main>
            </section>
        </>
    )
}

export default LogInRegisterLayout