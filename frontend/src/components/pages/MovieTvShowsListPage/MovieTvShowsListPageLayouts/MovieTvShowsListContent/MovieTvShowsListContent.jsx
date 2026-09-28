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

    if (loading) {
        // skeleton cards while loading
        return (
            <main className='movieTvList'>
                <div className="movieTvListContent" aria-hidden="true">
                    {Array.from({ length: 8 }, (_, i) => (
                        <div key={i} className="movieTvListCard skeleton">
                            <div className="movieTvListSkeletonPoster" />
                            <div className="movieTvListSkeletonLine" />
                            <div className="movieTvListSkeletonLine short" />
                        </div>
                    ))}
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className='movieTvList'>
                <p className="movieTvListMessage">Something went wrong while loading. Please try again.</p>
            </main>
        );
    }

    return (
        <main className='movieTvList'>
            <div className="movieTvListContent">
                {items?.map((movie, i) => {
                    const name = movie[titleKey] || movie.title || movie.name;
                    const year = movie[dateKey]?.slice(0, 4);
                    return (
                        // --i: cards come in one after another
                        <div key={movie.id} className="movieTvListCard" style={{ "--i": i % 20 }}>
                            <NavLink to={`/${type === 'movie' ? 'movie' : 'tvShow'}/${movie.id}`}
                                className="movieTvListCardTop" title={name}>
                                <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : missingImg}
                                    alt={name} className="amovieTvListCardPoster" loading="lazy" />
                                {year && <span className="movieTvListCardYear">{year}</span>}
                            </NavLink>
                            <div className="movieTvListCardCardBottom">
                                <h2 className="movieTvListCardName">{name}</h2>
                                <div className="movieTvListCardRating"><Rating movie={movie} /></div>

                                <div className="movieTvListCardBtns">
                                    <AddToBtns movieData={movie} mediaType={type} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </main>
    )
}

export default MovieTvShowsListContent
