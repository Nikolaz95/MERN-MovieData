import React from 'react'


//import css
import "./Footer.css";

//import img
import GitHub from '../../../assets/icons/icon-github.png';
import Gmail from '../../../assets/icons/icon-gmail.png';
import LinkeDin from '../../../assets/icons/icon-linkedin.png';
import Location from '../../../assets/icons/icon-location.png';
import MyPortfolio from '../../../assets/icons/iconPortfolio.png';
import CopyRight from '../../../assets/icons/icon-copyrights.png';

import useCurrentYear from '../../hooks/useCurrentYear';

const contactLinks = [
    { href: "mailto:nikolajoe95@gmail.com", icon: Gmail, title: "Gmail" },
    { href: "https://github.com/Nikolaz95", icon: GitHub, title: "GitHub" },
    { href: "https://www.linkedin.com/in/nikola-zovko-a50779247/", icon: LinkeDin, title: "Linkedin" },
    { href: "https://nikolazovko-portfolio.netlify.app/", icon: MyPortfolio, title: "MyPortfolio" },
];

const Footer = () => {
    const currentYear = useCurrentYear();
    return (
        <footer className="footerContent" >
            <div className='footerMainContent'>
                <div className="footerColumn footerAddres">
                    <h2 className="footerTitle">Address</h2>
                    <address>
                        <a href="https://www.google.com/maps/place/Stockholm/@59.0968211,17.5065602,7.75z/data=!4m6!3m5!1s0x465f763119640bcb:0xa80d27d3679d7766!8m2!3d59.3293235!4d18.0685808!16zL20vMDZteHM?entry=ttu"
                            target="_blank" rel="noopener noreferrer" className="footerLocationLink">
                            <img src={Location} alt="" className='locationImg' />
                            Stockholm, Sweden
                        </a>
                    </address>
                </div>

                <div className="footerColumn footerMidleContent">
                    <img src={CopyRight} alt="" className='copyrghtImg' />
                    <p className='footerText'>Copyright {currentYear}</p>
                    <p className='footerSubText'>by Nikola Zovko</p>
                </div>

                <div className="footerColumn contactFooter">
                    <h2 className="footerTitle">Contact</h2>
                    <div className="contactFooterLink">
                        {contactLinks.map((link) => (
                            <a key={link.title} href={link.href} target="_blank"
                                rel="noopener noreferrer" title={link.title} aria-label={link.title}
                                className="contactLink">
                                <img src={link.icon} alt="" className='contactImg' />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
