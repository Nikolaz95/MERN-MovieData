import React from 'react'


//import css
import "./ProviderSection.css";

const ProviderSection = ({ streamingProviders }) => {
    return (
        <>
            {streamingProviders.length > 0 && (
                <h1 className='streamingModalInfoTitleProvider'>Streaming providers :</h1>
            )}
            <div className="streamingModalRightStreamings">
                {streamingProviders.length > 0 ? (
                    streamingProviders.map((provider) => (
                        <img key={provider.provider_id}
                            src={provider.logo_path ? `https://www.themoviedb.org/t/p/original${provider.logo_path}` : Missing}
                            alt={provider.provider_name}
                            title={provider.provider_name}
                            className="streamingLogo" />
                    ))
                ) : (
                    <p className="streamingModalNoContentText">No paid streaming providers available</p> ? "" : ""
                )}
            </div>
        </>
    )
}

export default ProviderSection