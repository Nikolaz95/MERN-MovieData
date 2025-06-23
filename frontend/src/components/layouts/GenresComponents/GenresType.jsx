import React from 'react'


//import css
import "./GenresType.css";


//import img
import ActionIcon from "../../../assets/iconGenre/icon-action.png"
import CrimeIcon from "../../../assets/iconGenre/icon-crime.png"
import DramaIcon from "../../../assets/iconGenre/icon-drama.png"
import AdventuresIcon from "../../../assets/iconGenre/icon-adventures.png"
import SciFiIcon from "../../../assets/iconGenre/icon-sciFi.png"
import Comedy from "../../../assets/iconGenre/icon-comedy.png"
import Horor from "../../../assets/iconGenre/icon-horror.png"
import Animation from "../../../assets/iconGenre/icon-animation.png"
import Fanstasy from "../../../assets/iconGenre/icon-fantasy.png"
import Thriller from "../../../assets/iconGenre/icon-thriller.png"
import Romance from "../../../assets/iconGenre/icon-romance.png"
import Family from "../../../assets/iconGenre/icon-family.png"
import ActionAdventure from "../../../assets/iconGenre/icon-combat.png"
import Kids from "../../../assets/iconGenre/icon-kids.png"
import SciFiFantasy from "../../../assets/iconGenre/icon-star-trek-symbol.png"
import WarPolitics from "../../../assets/iconGenre/icon-war-refugee.png"
import Mystery from "../../../assets/iconGenre/icon-detective.png"
import War from "../../../assets/iconGenre/icon-war.png"
import Western from "../../../assets/iconGenre/icon-western.png"
import History from "../../../assets/iconGenre/icon-history.png"
import Documentary from "../../../assets/iconGenre/documentary-movie.png"
import Music from "../../../assets/iconGenre/icon-musicMovie.png"
import TVMovie from "../../../assets/iconGenre/icon-tvMovie.png"


// Genre to icon mapping
const genreIcons = {
    12: AdventuresIcon,
    14: Fanstasy,
    16: Animation,
    18: DramaIcon,
    27: Horor,
    28: ActionIcon,
    35: Comedy,
    36: History,
    37: Western,
    53: Thriller,
    80: CrimeIcon,
    99: Documentary,
    878: SciFiIcon,
    9648: Mystery,
    10402: Music,
    10749: Romance,
    10751: Family,
    10752: War,
    10759: ActionAdventure,
    10762: Kids,
    10765: SciFiFantasy,
    10768: WarPolitics,
    10770: TVMovie,
};



const GenresType = ({ movieDetails }) => {

    return (
        <div className="movieTvDetailsGenres">
            {movieDetails?.genres?.map((genre) => (
                <div className="movieTvDetailsGenresContent" key={genre.id}>
                    <p className='genresText'>{genre.name}</p>
                    <img src={genreIcons[genre.id]} className='genresImg' alt={genre.name} />
                </div>
            ))}
        </div>
    )
}

export default GenresType