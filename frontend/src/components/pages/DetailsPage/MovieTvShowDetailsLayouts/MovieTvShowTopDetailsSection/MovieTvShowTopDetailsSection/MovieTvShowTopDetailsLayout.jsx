import React from 'react'


//import css
import "./MovieTvShowTopDetailsLayout.css";

const MovieTvShowTopDetailsLayout = ({ children }) => {
    return (
        <section className="MovieTvDetailTopSection">
            {children}
        </section>
    )
}

export default MovieTvShowTopDetailsLayout