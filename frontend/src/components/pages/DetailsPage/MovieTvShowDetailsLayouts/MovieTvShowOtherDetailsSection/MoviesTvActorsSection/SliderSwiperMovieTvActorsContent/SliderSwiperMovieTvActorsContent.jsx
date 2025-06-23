import React from 'react'
import { NavLink } from 'react-router-dom'


//import css
import "./SliderSwiperMovieTvActorsContent.css";

//import images
import missingImg from "../../../../../../../assets/pictures/mising-pic.jpg"

const SliderSwiperMovieTvActorsContent = ({ data }) => {
    return (
        <>
            <div className="actorsCard">
                <NavLink to={`/person/${data.id}`}>
                    <img src={data?.profile_path ? `https://image.tmdb.org/t/p/w185/${data?.profile_path}` : missingImg} alt={data.name} className="actorsPosterImg" title={data.name} />
                </NavLink>
                <div className="actorsBottomContainer">
                    <p className="actorsName">{data.name}</p>
                    <p className="actorsAs">As</p>
                    <p className="actorsCharacterName">{data.character}</p>
                </div>
            </div>
        </>
    )
}

export default SliderSwiperMovieTvActorsContent