import React from 'react'
import { NavLink } from 'react-router-dom'


//import css
import "./SliderSwiperMovieTvActorsContent.css";

//import images
import missingImg from "../../../../../../../assets/pictures/mising-pic.jpg"

const SliderSwiperMovieTvActorsContent = ({ data }) => {
    return (
        <NavLink to={`/person/${data.id}`} className="actorsCard" title={data.name}>
            <div className="actorsPosterWrapper">
                <img src={data?.profile_path ? `https://image.tmdb.org/t/p/w185/${data?.profile_path}` : missingImg}
                    alt={data.name} className="actorsPosterImg" loading="lazy" />
            </div>
            <div className="actorsBottomContainer">
                <p className="actorsName">{data.name}</p>
                {data.character && (
                    <p className="actorsCharacterName">
                        <span className="actorsAs">as</span> {data.character}
                    </p>
                )}
            </div>
        </NavLink>
    )
}

export default SliderSwiperMovieTvActorsContent
