import React, { useEffect, useState } from 'react'


//import css
import "./Footer.css";

//import img
import GitHub from '../../../assets/icons/icon-github.png';
import Gmail from '../../../assets/icons/icon-gmail.png';
import LinkeDin from '../../../assets/icons/icon-linkedin.png';
import Location from '../../../assets/icons/icon-location.png';
import MyPortfolio from '../../../assets/icons/iconPortfolio.png';
import CopyRight from '../../../assets/icons/icon-copyrights.png';

import Image from "../ImagesContent/Image"
import useCurrentYear from '../../hooks/useCurrentYear';

const Footer = () => {
    const currentYear = useCurrentYear();
    return (
        <footer className="footerContent" >
            <div className='footerMainContent'>
                <div className="footerAddres">
                    <h1>Address:</h1>
                    <address> Stockholm, Sweden
                        <a href="https://www.google.com/maps/place/Stockholm/@59.0968211,17.5065602,7.75z/data=!4m6!3m5!1s0x465f763119640bcb:0xa80d27d3679d7766!8m2!3d59.3293235!4d18.0685808!16zL20vMDZteHM?entry=ttu" target="_blank"><img src={Location} alt="" className='locationImg' />
                        </a>
                    </address>
                </div>

                <div className="footerMidleContent">
                    {/* <div className="footer-midle"> */}
                    <img src={CopyRight} alt="" className='copyrghtImg' />
                    <p className='footerText'>Copyright</p>
                    <p className='footerText'>{currentYear} by Nikola Zovko</p>
                    {/* </div> */}
                </div>

                <div className="contactFooter">
                    <h1>Contact:</h1>
                    <div className="contactFooterLink">
                        <a href="mailto:nikolajoe95@gmail.com" target="_blank">
                            <img src={Gmail} alt="" className='contactImg' title="Gmail" />
                        </a>
                        <a href="https://github.com/Nikolaz95" target="_blank">
                            <img src={GitHub} alt="" className='contactImg' title="GitHub" />
                        </a>
                        <a href="https://www.linkedin.com/in/nikola-zovko-a50779247/" target="_blank">
                            <img src={LinkeDin} alt="" className='contactImg' title="Linkedin" />
                        </a>
                        <a href="https://nikolazovko-portfolio.netlify.app/" target="_blank">
                            <Image src={MyPortfolio} alt="" className='contactImg' title="MyPortfolio" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer