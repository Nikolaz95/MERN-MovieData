import React from 'react'
import { NavLink } from 'react-router-dom';

//import css
import "./TitleOverHomePage.css";


//import components
import Button from '../Buttons/Button';

const TitleOverHomePage = ({ title, linkPath, children }) => {
    return (
        <>
            <section className="contentUnderTitle">
                <h1>{title}</h1>
                <NavLink to={linkPath}>
                    <Button variant="VievAlla">
                        <p>View All :</p>
                    </Button>
                </NavLink>
            </section>
            {children}
        </>
    )
}

export default TitleOverHomePage