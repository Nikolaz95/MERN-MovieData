import React from 'react'
import { useNavigate } from 'react-router-dom';

//import css
import "./TvShowSeasonComponent.css"

const TvShowSeasonComponent = ({ data, currentSeason = "" }) => {
    const navigate = useNavigate();

    if (!data || !data.seasons) {
        return null;
    }

    // picking a season opens its details page
    const handleSeasonChange = (e) => {
        const seasonNumber = e.target.value;
        if (seasonNumber === "") return;
        navigate(`/tvShow/${data.id}/season/${seasonNumber}`);
    };

    return (
        <div className='tvShowSeasonSection'>
            <article className='tvShowSeason'>
                <label htmlFor="seasons" className='seasonLabel'>Seasons : </label>
                <select id="seasons" className='seasonsOption' value={currentSeason} onChange={handleSeasonChange}>
                    <option value="">Seasons</option>
                    {data?.seasons?.map((season) => (
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
