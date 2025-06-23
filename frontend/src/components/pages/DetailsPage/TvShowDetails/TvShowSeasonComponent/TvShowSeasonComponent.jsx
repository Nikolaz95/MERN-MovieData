import React, { useState } from 'react'

//import css
import "./TvShowSeasonComponent.css"

const TvShowSeasonComponent = ({ data }) => {
    /* const [seasons, setSeasons] = useState([]); */
    if (!data || !data.seasons) {
        return null;
    }
    console.log(data);


    return (
        <div className='tvShowSeasonSection'>
            <article className='tvShowSeason'>
                <label for="seasons" className='seasonLabel'>Seasons : </label>
                <select id="seasons" className='seasonsOption'>
                    <option value="">Seasons</option>
                    {data?.seasons.map((season) => (
                        <option value={season.season_number} key={season.id}>
                            Season {season.season_number}
                        </option>
                    ))}

                </select>
            </article>
        </div>
    )
}

export default TvShowSeasonComponent