import React from 'react'
import { NavLink } from 'react-router-dom';

//import css
import "./SeasonEpisodeCard.css";

//import images
import Missing from "../../../../../assets/pictures/mising-pic.jpg"

//import components
import Rating from '../../../../layouts/RatingComponent/Rating';

const SeasonEpisodeCard = ({ episode, tvShowId }) => {
    return (
        <NavLink to={`/tvShow/${tvShowId}/season/${episode?.season_number}/episode/${episode?.episode_number}`}
            className="seasonEpisodeCard" title={episode?.name}>
            <div className="seasonEpisodeImgWrapper">
                <img src={episode?.still_path ? `https://image.tmdb.org/t/p/w500/${episode.still_path}` : Missing}
                    alt={episode?.name} className="seasonEpisodeImg" loading="lazy" />
                <span className="seasonEpisodeNumber">E{episode?.episode_number}</span>
            </div>

            <div className="seasonEpisodeInfo">
                <h2 className="seasonEpisodeName">{episode?.name}</h2>
                <div className="seasonEpisodeFacts">
                    {episode?.air_date && <span className="seasonEpisodeChip">{episode.air_date}</span>}
                    {episode?.runtime > 0 && <span className="seasonEpisodeChip">{episode.runtime} min</span>}
                    {episode?.vote_average > 0 && <Rating movie={episode} />}
                </div>
                {episode?.overview && <p className="seasonEpisodeOverview">{episode.overview}</p>}
            </div>
        </NavLink>
    )
}

export default SeasonEpisodeCard
