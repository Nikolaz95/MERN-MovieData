import React from 'react'
import { NavLink } from 'react-router-dom';


//import css
import "./TrendingContent.css";

//import components
import Rating from '../../../../layouts/RatingComponent/Rating';

const TrendingContent = ({ movie, type }) => {
    const route = type === 'movie' ? `/movie/${movie.id}` : `/tvShow/${movie.id}`;
    return (
        <>
            <div className="TrendingBgPoster">
                <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title} className="TrendingBgPosterImg" />
            </div>
            <div className="TrendingPosterContent">
                <div className="TrendingLeft">
                    <NavLink to={route}>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title} className="TrendingPosterCard"
                            title={movie.title} />
                    </NavLink>
                </div>
                <div className="TrendingRight">
                    <div className="TrendingRightTop">
                        <h1 className="TrendingRightTitle">{movie.title || movie.name}</h1>
                    </div>
                    <div className="TrendingRightMiddle">
                        <p className="TrendingOverWiev">{movie.overview}</p>
                    </div>
                    <div className="TrendingRightBottom">
                        <span className="TrendingReleaseDate">
                            <p>{movie.release_date || movie.first_air_date}</p>
                        </span>
                        <Rating movie={movie} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default TrendingContent