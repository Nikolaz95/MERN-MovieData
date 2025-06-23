import React from 'react'

//import css
import "./PosterRightSection.css";

//import components
import MovieOverview from '../../../../../../layouts/MovieOverview/MovieOverview'
import MovieTagLine from '../../../../../../layouts/MovieTagLine/MovieTagLine'
import GenresType from '../../../../../../layouts/GenresComponents/GenresType'
import ReleaseDetails from '../../../../../../layouts/ReleaseDetailsComponents/ReleaseDetails'
import RunTime from '../../../../../../layouts/RunTimeComponent/RunTime'
import Rating from '../../../../../../layouts/RatingComponent/Rating'
import UserRating from '../../../../../../layouts/UserRatingComponent/UserRating'
import AddToBtns from '../../../../../../layouts/Buttons/AddToBtns/AddToBtns';
import NumEpSeason from '../../../../TvShowDetails/NumEp&Season/NumEpSeason';
import TvShowSeasonComponent from '../../../../TvShowDetails/TvShowSeasonComponent/TvShowSeasonComponent';

const PosterRightSection = ({ data, type }) => {

    return (
        <main className="posterMovieTvSectionRight">
            <div className="posterMovieTvRightTop">
                <h1 className="posterMovieTvRightTitle">
                    {data?.original_name} {data?.original_title}
                </h1>
                {type === "tv" && (
                    <Rating movie={data} />
                )}
            </div>

            <div className="posterMovieTvRightMiddle">
                <MovieOverview movieDetails={data} />
                <MovieTagLine movieDetails={data} />
            </div>

            <div className="posterMovieTvFact">
                {/* genres */}
                <GenresType movieDetails={data} />
                {/* genres */}


                {/* relese detail */}
                {type === "movie" && (
                    <ReleaseDetails data={data} type={type} />
                )}
                {/* genres */}
            </div>
            {type === "movie" && (
                <div className="posterMovieTvTimeRatingSection">
                    {/* runTime */}
                    <RunTime movieDetails={data} />
                    {/* runTime */}

                    {/* avg rating */}
                    <Rating movie={data} />
                    {/* avg rating */}
                </div>
            )}

            {type === "tv" && (
                <div className="posterMovieTvNumEpSeasonsSection">
                    <NumEpSeason data={data} />
                </div>
            )}

            {type === "tv" && (
                <div className="posterMovieTvSeasonsSection">
                    <TvShowSeasonComponent data={data} />
                </div>

            )}



            {/* user Rating */}
            <UserRating movieData={data} mediaType={type} />
            {/* user Rating */}

            <div className="posterMovieTvBtnSection">
                <AddToBtns movieData={data} mediaType={type} />
            </div>

        </main>
    )
}

export default PosterRightSection