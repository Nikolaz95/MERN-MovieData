import React from 'react'


//import css
import "./ProviderSection.css";

//import img
import Missing from "../../../../../../../assets/pictures/mising-pic.jpg"

import { getProviderLink } from '../providerLinks';

// one group of providers (Stream / Free / Ads / Rent / Buy) - styles in StreamingModal.css
// click on a logo opens the service in a new tab
const ProviderSection = ({ title, badge, variant, providers, searchTitle, fallbackLink }) => {
    if (!providers?.length) return null;

    return (
        <section className="providerGroup">
            <h3 className='providerGroupTitle'>
                {title} <span className={`providerBadge ${variant}`}>{badge}</span>
            </h3>
            <ul className="providerList">
                {providers.map((provider, i) => {
                    const link = getProviderLink(provider.provider_id, searchTitle, fallbackLink);
                    const content = (
                        <>
                            <span className="streamingLogoWrapper">
                                <img src={provider.logo_path ? `https://image.tmdb.org/t/p/w92${provider.logo_path}` : Missing}
                                    alt="" className="streamingLogo" />
                                {link && (
                                    <svg className="providerExternalIcon" width="12" height="12" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M7 17 17 7M8 7h9v9" />
                                    </svg>
                                )}
                            </span>
                            <span className="providerName">{provider.provider_name}</span>
                        </>
                    );

                    return (
                        <li key={provider.provider_id} className="providerItem" style={{ "--i": i }}>
                            {link ? (
                                <a href={link} target="_blank" rel="noopener noreferrer" className="providerLink"
                                    title={`Open ${provider.provider_name} in a new tab`}>
                                    {content}
                                </a>
                            ) : content}
                        </li>
                    );
                })}
            </ul>
        </section>
    )
}

export default ProviderSection
