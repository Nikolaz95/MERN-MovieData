import React from 'react'
import { Helmet } from 'react-helmet'

//import images
import LogoIcon from "../../../assets/icons/logo-movie.png"

export const APP_NAME = "MovieData";

// browser tab: "Title | MovieData" + page icon (deeper TitleName wins, so details pages override Root)
const TitleName = ({ title, icon }) => {
    return (
        <Helmet>
            <title>{title ? `${title} | ${APP_NAME}` : APP_NAME}</title>
            {/* rel must be the LAST attribute: Helmet then dedupes by rel="icon" (only the page icon stays), not by href */}
            <link href={icon || LogoIcon} type="image/png" rel="icon" />
        </Helmet>
    )
}

export default TitleName
