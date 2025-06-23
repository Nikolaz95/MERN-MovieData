import React from 'react'


//import css
import "./FreeProviders.css";

const FreeProviders = ({ freeProviders }) => {
    return (
        <>
            {freeProviders.length > 0 && (
                <h1 className='freeModalInfoTitleProvider'>Free :</h1>
            )}
            <div className="freeModalRightStreamings">
                {freeProviders.length > 0 ? (
                    freeProviders.map((free) => (
                        <img key={free.provider_id}
                            src={free.logo_path ? `https://www.themoviedb.org/t/p/original${free.logo_path}` : Missing}
                            alt={free.provider_name}
                            title={free.provider_name}
                            className="streamingLogo" />
                    ))
                ) : (
                    <p className="streamingModalNoContentText">No free streaming providers available</p> ? "" : ""
                )}
            </div>
        </>
    )
}

export default FreeProviders