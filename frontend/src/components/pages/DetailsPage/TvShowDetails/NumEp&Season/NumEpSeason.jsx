import React from 'react'


//import css
import "./NumEpSeason.css"

const NumEpSeason = ({ data }) => {
    return (
        <div className='tvShowNumSeasonEpSection'>
            <article className='tvShowEpisodes'>
                <div className="tvShowEpisodesContent">
                    <h1 className='tvShowEpisodesTitle'>Num of episodes :</h1>
                    <p className='tvShowEpisodesNum'>{data.number_of_episodes} </p>
                </div>
            </article>
            <article className='tvShowSeason'>
                <div className="tvShowEpisodesContent">
                    <h1 className='tvShowEpisodesTitle'>Num of Seasons :</h1>
                    <p className='tvShowEpisodesNum'>{data.number_of_seasons}</p>
                </div>
            </article>
        </div>
    )
}

export default NumEpSeason