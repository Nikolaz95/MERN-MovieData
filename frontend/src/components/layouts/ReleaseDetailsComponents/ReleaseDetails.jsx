import React from 'react'


//import css
import "./ReleaseDetails.css";

const ReleaseDetails = ({ data, type }) => {
    const getStatusClass = (status) => {
        switch (status) {
            case 'Released':
                return 'statusCircle released';
            case 'In Production':
                return 'statusCircle inProduction';
            case 'Ended':
                return 'statusCircle Ended';
            case 'Returning Series':
                return 'statusCircle inWorking';
            default:
                return 'statusCircle';
        }
    };


    return (
        <section className='MovieTvDetailsReleaseDetails'>
            <div className='releasedStatusInfo'>
                <p>Status:</p>
                <span className={getStatusClass(data?.status)}>
                    <p>{data?.status}</p>
                </span>
            </div>

            <div className='releasedDateInfo'>
                {type === "movie" && (
                    <p>Datum:</p>
                )}
                {type === "tvShow" && (
                    <p>Last episode :</p>
                )}
                {type === "movie" && (
                    <span className="releasedInfoCircle">
                        {data?.release_date}
                    </span>
                )}
                {type === "tvShow" && (
                    <span className="releasedInfoCircle">
                        <p>{data?.last_episode_to_air?.air_date ?
                            data?.last_episode_to_air?.air_date : 'Coming Soon'}</p>
                    </span>
                )}
            </div>
        </section>
    )
}

export default ReleaseDetails