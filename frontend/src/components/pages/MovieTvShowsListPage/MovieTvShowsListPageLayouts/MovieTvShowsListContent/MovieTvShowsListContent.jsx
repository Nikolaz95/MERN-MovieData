import React from 'react'
import { NavLink } from 'react-router-dom'

//import css
import "./MovieTvShowsListContent.css";

//import images
import missingImg from "../../../../../assets/pictures/mising-pic.jpg"

//import components
import Rating from '../../../../layouts/RatingComponent/Rating';
import AddToBtns from '../../../../layouts/Buttons/AddToBtns/AddToBtns';

const MovieTvShowsListContent = ({ items, loading, error, titleKey, dateKey, type }) => {

    return (
        <main className='movieTvList'>
            <div className="movieTvListContent">
                {items?.map((movie) => (
                    <div key={movie.id} className={`movieTvListCard`}>
                        <div className="movieTvListCardTop">
                            <NavLink to={`/${type === 'movie' ? 'movie' : 'tvShow'}/${movie.id}`}>
                                <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path} ` : missingImg} alt={"no img"} className="amovieTvListCardPoster" title={movie.title} />
                            </NavLink>
                        </div>
                        <div className="movieTvListCardCardBottom">
                            <h1 className="movieTvListCardName">
                                {movie.name} {movie.title}
                            </h1>
                            <p className="movieTvListCardRating"><Rating movie={movie} /></p>

                            <div className="movieTvListCardBtns">
                                <AddToBtns movieData={movie} mediaType={type} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}

export default MovieTvShowsListContent