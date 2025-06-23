import React from 'react'


//import css
import "./TopBackGroundPoster.css";

//import images
import Missing from "../../../../../../../assets/pictures/mising-pic.jpg"

const TopBackGroundPoster = ({ data }) => {
    return (
        <main className="MovieTvDetailBgPoster">
            <img src={data?.backdrop_path ? `https://www.themoviedb.org/t/p/original/${data.backdrop_path}` : Missing} alt="" title={data?.original_title}
                className="MovieTvDetailBgPosterImg" />
        </main>
    )
}

export default TopBackGroundPoster