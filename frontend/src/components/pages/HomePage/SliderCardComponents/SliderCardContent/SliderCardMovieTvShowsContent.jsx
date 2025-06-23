import React from 'react'
import { NavLink } from 'react-router-dom';
//import css
import "./SliderCardMovieTvShowsContent.css";
//import images
import missingImg from "../../../../../assets/pictures/mising-pic.jpg"
//import components
import Rating from '../../../../layouts/RatingComponent/Rating';
import AddToBtns from '../../../../layouts/Buttons/AddToBtns/AddToBtns';

const SliderCardMovieTvShowsContent = ({ data, mediaType }) => {
    const titleMovieTvShow = data.title
        ? data.title.length > 30
            ? `${data.title.slice(0, 30)}...`
            : data.title
        : data.original_name.length > 30
            ? `${data.original_name.slice(0, 30)}...`
            : data.original_name;
    // Determine the route based on whether it's a movie or a TV show
    const isMovie = !!data.title; // Movies have a `title`, TV shows have `original_name`
    const detailPath = isMovie ? `/movie/${data.id}` : `/tvShow/${data.id}`;
    return (
        <main className="conteiner-card">
            <div className='kartica'>
                <div className="topcard">
                    <NavLink to={detailPath}>
                        <img src={data?.poster_path ? `https://www.themoviedb.org/t/p/w220_and_h330_face/${data?.poster_path}` : missingImg}
                            alt={data.title || data.original_name}
                            className="poster" title={data.title || data.original_name} />
                    </NavLink>
                </div>
                <div className="botom-card">
                    <h3 className="card-title">{titleMovieTvShow}</h3>
                    <p className="card-rating">
                        <Rating movie={data} />
                    </p>
                    {/* <div className="btns-Content">
                        <AddToBtns movieData={data} mediaType={mediaType} />
                    </div> */}
                </div>
            </div>
        </main>
    )
}

export default SliderCardMovieTvShowsContent