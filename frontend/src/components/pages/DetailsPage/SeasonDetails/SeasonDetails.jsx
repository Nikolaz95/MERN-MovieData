import React, { useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom';

//import css
import "../MovieTvShowDetailsLayouts/MovieTvShowTopDetailsSection/MovieTvShowTopDetailsSection/MovieTvShowPosterSection/PosterLeftSection.css";
import "../MovieTvShowDetailsLayouts/MovieTvShowTopDetailsSection/MovieTvShowTopDetailsSection/MovieTvShowPosterSection/PosterRightSection.css";
import "./SeasonDetails.css";

//import images
import Missing from "../../../../assets/pictures/mising-pic.jpg"
import TvIcon from "../../../../assets/icons/icon-tvs.png"

//import components
import getApiUrl from '../../../hooks/getApiUrl';
import useFetch from '../../../hooks/useFetch';
import TitleName from '../../../hooks/TitleName/TitleName';
import useScrollToTop from '../../../hooks/useScrollToTop';
import ScrollToTop from '../../../layouts/ScrollToTop/ScrollToTop';
import Loading from '../../../layouts/Loading/Loading';
import Rating from '../../../layouts/RatingComponent/Rating';
import MovieOverview from '../../../layouts/MovieOverview/MovieOverview';
import MovieTvShowTopDetailsLayout from '../MovieTvShowDetailsLayouts/MovieTvShowTopDetailsSection/MovieTvShowTopDetailsSection/MovieTvShowTopDetailsLayout';
import TopBackGroundPoster from '../MovieTvShowDetailsLayouts/MovieTvShowTopDetailsSection/MovieTvShowTopDetailsSection/TopBackGroundPoster/TopBackGroundPoster';
import MovieTvShowPosterLayout from '../MovieTvShowDetailsLayouts/MovieTvShowTopDetailsSection/MovieTvShowTopDetailsSection/MovieTvShowPosterSection/Layout/MovieTvShowPosterLayout';
import OtherDetailsSectionLayouts from '../MovieTvShowDetailsLayouts/MovieTvShowOtherDetailsSection/OtherDetailsSectionLayouts';
import MoviesTvActorsSection from '../MovieTvShowDetailsLayouts/MovieTvShowOtherDetailsSection/MoviesTvActorsSection/MoviesTvActorsSection';
import TvShowSeasonComponent from '../TvShowDetails/TvShowSeasonComponent/TvShowSeasonComponent';
import SeasonEpisodeCard from './SeasonEpisodeCard/SeasonEpisodeCard';
import TrailerBtn from '../../../layouts/Buttons/TrailerBtn/TrailerBtn';


const SeasonDetails = () => {
    const { isVisible } = useScrollToTop();
    const { id, seasonNumber } = useParams();

    /* fetch: tv show (backdrop, name, list of seasons) + selected season (episodes) */
    const { data: tvShow } = useFetch(getApiUrl(`tv/${id}`));
    const { data: season, loading } = useFetch(getApiUrl(`tv/${id}/season/${seasonNumber}`));

    // new season picked from the dropdown -> start from the top of the page
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [seasonNumber]);

    const episodes = season?.episodes || [];
    const airYear = season?.air_date ? season.air_date.slice(0, 4) : null;

    if (loading) {
        return <Loading />;
    }

    if (season?.success === false) {
        return (
            <section className="seasonDetailsNotFound">
                <h1>Season not found</h1>
                <NavLink to={`/tvShow/${id}`} className="seasonBackLink">&larr; Back to TV show</NavLink>
            </section>
        );
    }

    return (
        <>
            <TitleName title={`${tvShow?.name || "TV Show"} - ${season?.name || `Season ${seasonNumber}`}`} icon={TvIcon} />
            <section className="movieTvDetailsPageContent">
                {isVisible && <ScrollToTop />}
                {/* hero: tv show background + season poster + season info */}
                <MovieTvShowTopDetailsLayout>
                    <TopBackGroundPoster data={tvShow} />
                    <MovieTvShowPosterLayout>
                        <main className="posterMovieTvSectionLeft">
                            <img src={season?.poster_path ? `https://www.themoviedb.org/t/p/w300_and_h450_multi_faces/${season.poster_path}`
                                : tvShow?.poster_path ? `https://www.themoviedb.org/t/p/w300_and_h450_multi_faces/${tvShow.poster_path}` : Missing}
                                className="MovieDetailsPosterImg" alt="Poster" title={season?.name} />
                            {/* trailer of this season (every season has its own) */}
                            <div className="streamingContent">
                                <TrailerBtn id={`${id}/season/${seasonNumber}`} type="tv"
                                    title={`${tvShow?.name || tvShow?.original_name || ""} - ${season?.name || ""}`} />
                            </div>
                        </main>

                        <main className="posterMovieTvSectionRight">
                            <NavLink to={`/tvShow/${id}`} className="seasonBackLink">
                                &larr; {tvShow?.original_name}
                            </NavLink>

                            <div className="posterMovieTvRightTop">
                                <h1 className="posterMovieTvRightTitle">
                                    {season?.name} {airYear && <span className="seasonYear">({airYear})</span>}
                                </h1>
                                {season?.vote_average > 0 && <Rating movie={season} />}
                            </div>

                            {season?.overview && (
                                <div className="posterMovieTvRightMiddle">
                                    <MovieOverview movieDetails={season} />
                                </div>
                            )}

                            <div className="posterMovieTvNumEpSeasonsSection">
                                <div className="tvShowEpisodesContent">
                                    <h1 className="tvShowEpisodesTitle">Num of episodes :</h1>
                                    <p className="tvShowEpisodesNum">{episodes.length}</p>
                                </div>
                                {season?.air_date && (
                                    <div className="tvShowEpisodesContent">
                                        <h1 className="tvShowEpisodesTitle">Air date :</h1>
                                        <p className="tvShowEpisodesNum">{season.air_date}</p>
                                    </div>
                                )}
                            </div>

                            <div className="posterMovieTvSeasonsSection">
                                <TvShowSeasonComponent data={tvShow} currentSeason={seasonNumber} />
                            </div>
                        </main>
                    </MovieTvShowPosterLayout>
                </MovieTvShowTopDetailsLayout>
                {/* hero */}

                <section className='movieTvOtherDetailsContent'>
                    <OtherDetailsSectionLayouts>
                        <section className="seasonEpisodesSection">
                            <h1 className="seasonEpisodesTitle">Episodes :</h1>
                            {episodes.length > 0 ? (
                                <div className="seasonEpisodesList">
                                    {episodes.map((episode) => (
                                        <SeasonEpisodeCard episode={episode} tvShowId={id} key={episode.id} />
                                    ))}
                                </div>
                            ) : (
                                <p className="seasonEpisodesEmpty">No episodes for this season yet.</p>
                            )}
                        </section>
                        <MoviesTvActorsSection id={`${id}/season/${seasonNumber}`} type="tv" />
                    </OtherDetailsSectionLayouts>
                </section>
            </section>
        </>
    )
}

export default SeasonDetails
