import React from 'react'

//import css
import "./MovieTagLine.css"

const MovieTagLine = ({ movieDetails }) => {
    return (
        <p className="MovieTvDetailsTagline">
            "{movieDetails?.tagline}"
        </p>
    )
}

export default MovieTagLine