import React from 'react'

//import css
import "./Rating.css"

const Rating = ({ movie }) => {
    const getRatingClass = (rating) => {
        if (rating >= 80) {
            return 'rating-green';
        } else if (rating >= 70) {
            return 'rating-yellow';
        } else if (rating >= 60) {
            return 'rating-orange';
        }
        return 'rating-red';
    };

    const rating = Math.round(movie.vote_average * 10);
    const ratingClass = getRatingClass(rating);

    return (
        <span className='Rating'>
            <p>Rating :</p>
            <span className={`ratingCircle ${ratingClass}`}>
                {rating}
            </span>
        </span>
    )
}

export default Rating