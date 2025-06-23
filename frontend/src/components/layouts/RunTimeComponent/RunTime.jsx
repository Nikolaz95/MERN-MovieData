import React from 'react'


//import css
import "./RunTime.css";

const RunTime = ({ movieDetails }) => {
    const formatRuntime = (runtime) => {
        if (!runtime) {
            return 'N/A';
        }

        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;

        let formattedTime = '';

        if (hours > 0) {
            formattedTime += `${hours}h `;
        }

        if (minutes > 0) {
            formattedTime += `${minutes}min`;
        }

        return formattedTime;
    };
    return (
        <div className='MovieTvDetailsTimeDetails'>
            <div className="MovieTvDetailsRunTime">
                <p>Runtime : </p>
                <p> {formatRuntime(movieDetails?.runtime)}</p>
            </div>
        </div>
    )
}

export default RunTime