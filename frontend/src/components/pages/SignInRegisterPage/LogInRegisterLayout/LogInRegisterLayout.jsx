import React from 'react'

//import css
import "./LogInRegisterLayout.css";

//import img
import Logo from "../../../../assets/pictures/logo.gif"

// what a free account gives you (all real features of the app)
const BENEFITS = [
    { title: "Your Watch List", text: "Save movies and TV shows you want to watch later." },
    { title: "Favorites", text: "Keep a list of everything you love." },
    { title: "Rate & review", text: "Give your stars and share your opinion with others." },
    { title: "Favorite actors", text: "Follow the actors you like the most." },
];

// split card: blue panel with the benefits on the left, the form on the right
const LogInRegisterLayout = ({ children, panelTitle, panelText }) => {
    return (
        <section className="sectionLogInRegisterLayout">
            <main className="logInRegisterLayoutSection">
                <aside className="authPanel">
                    <img src={Logo} alt="" className="authPanelLogo" />
                    <h2 className="authPanelTitle">{panelTitle}</h2>
                    <p className="authPanelText">{panelText}</p>

                    <ul className="authBenefits">
                        {BENEFITS.map((benefit, i) => (
                            <li key={benefit.title} className="authBenefit" style={{ "--i": i }}>
                                <span className="authBenefitCheck" aria-hidden="true">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 6 9 17l-5-5" />
                                    </svg>
                                </span>
                                <span>
                                    <strong>{benefit.title}</strong>
                                    <span className="authBenefitText">{benefit.text}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </aside>

                <div className="logInRegisterLayoutContent">
                    {children}
                </div>
            </main>
        </section>
    )
}

export default LogInRegisterLayout
