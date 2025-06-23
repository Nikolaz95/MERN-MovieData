import React from 'react'


//import css
import "./PersonDetailsRightComponent.css";

//import pictures
import missingImg from "../../../../../../assets/pictures/mising-pic.jpg"


const PersonDetailsRightComponent = ({ data }) => {

    const formatBiography = (bio) => {
        if (!bio) return <p>No biography available.</p>;
        // Split biography text into paragraphs
        return bio.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
        ));
    };
    return (
        <aside className="actorAsideRight">
            <h1 className='actorInfoTitle'>{data?.name}</h1>
            <h1 className='actorInfoTitle'>Biograph :</h1>
            <div className="biografy">
                <p className="biografyText">{formatBiography(data?.biography)}</p>
            </div>
        </aside>
    )
}

export default PersonDetailsRightComponent