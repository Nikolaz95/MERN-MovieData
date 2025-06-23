import React from 'react'

//import css
import "./MovieTvShowPosterLayout.css";

const MovieTvShowPosterLayout = ({ children }) => {
    return (
        <section className="posterMovieTvSection">
            {children}
        </section>
    )
}

export default MovieTvShowPosterLayout