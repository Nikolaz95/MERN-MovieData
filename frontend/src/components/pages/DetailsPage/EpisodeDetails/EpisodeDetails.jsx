import React, { useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom';

//import css
import "../MovieTvShowDetailsLayouts/MovieTvShowTopDetailsSection/MovieTvShowTopDetailsSection/MovieTvShowPosterSection/PosterLeftSection.css";
import "../MovieTvShowDetailsLayouts/MovieTvShowTopDetailsSection/MovieTvShowTopDetailsSection/MovieTvShowPosterSection/PosterRightSection.css";
import "../MovieTvShowDetailsLayouts/MovieTvShowOtherDetailsSection/MoviesTvActorsSection/MoviesTvActorsSection.css";
import "../SeasonDetails/SeasonDetails.css";
import "./EpisodeDetails.css";

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
import SwiperSliderCard from '../../../layouts/SwiperComponents/SwiperSliderCard/SwiperSliderCard';
import MovieTvShowTopDetailsLayout from '../MovieTvShowDetailsLayouts/MovieTvShowTopDetailsSection/MovieTvShowTopDetailsSection/MovieTvShowTopDetailsLayout';
import TopBackGroundPoster from '../MovieTvShowDetailsLayouts/MovieTvShowTopDetailsSection/MovieTvShowTopDetailsSection/TopBackGroundPoster/TopBackGroundPoster';
import MovieTvShowPosterLayout from '../MovieTvShowDetailsLayouts/MovieTvShowTopDetailsSection/MovieTvShowTopDetailsSection/MovieTvShowPosterSection/Layout/MovieTvShowPosterLayout';
import OtherDetailsSectionLayouts from '../MovieTvShowDetailsLayouts/MovieTvShowOtherDetailsSection/OtherDetailsSectionLayouts';
import MoviesTvActorsSection from '../MovieTvShowDetailsLayouts/MovieTvShowOtherDetailsSection/MoviesTvActorsSection/MoviesTvActorsSection';
import SliderSwiperMovieTvActorsContent from '../MovieTvShowDetailsLayouts/MovieTvShowOtherDetailsSection/MoviesTvActorsSection/SliderSwiperMovieTvActorsContent/SliderSwiperMovieTvActorsContent';
import PicturesFromMovieSection from '../MovieTvShowDetailsLayouts/MovieTvShowOtherDetailsSection/PicturesFromMovieSection/PicturesFromMovieSection';


const EpisodeDetails = () => {
    const { isVisible } = useScrollToTop();
    const { id, seasonNumber, episodeNumber } = useParams();
    const episodePath = `${id}/season/${seasonNumber}/episode/${episodeNumber}`;

    /* fetch: tv show (name, backdrop, season posters, episode count) + selected episode */
    const { data: tvShow } = useFetch(getApiUrl(`tv/${id}`));
    const { data: episode, loading } = useFetch(getApiUrl(`tv/${episodePath}`));

    // prev / next episode -> start from the top of the page
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [seasonNumber, episodeNumber]);

    const season = tvShow?.seasons?.find((s) => String(s.season_number) === String(seasonNumber));
    const episodeCount = season?.episode_count || 0;
    const currentEpisode = Number(episodeNumber);
    const seasonUrl = `/tvShow/${id}/season/${seasonNumber}`;

    const directors = episode?.crew?.filter((person) => person.job === "Director") || [];
    const writers = episode?.crew?.filter((person) => person.department === "Writing") || [];
    const guestStars = episode?.guest_stars || [];

    const sliderSettings = {
        320: { slidesPerView: 1, spaceBetween: 10 },
        660: { slidesPerView: 2, spaceBetween: 10 },
        960: { slidesPerView: 4, spaceBetween: 16 },
        1260: { slidesPerView: 5, spaceBetween: 16 },
        1600: { slidesPerView: 6, spaceBetween: 16 },
    };

    if (loading) {
        return <Loading />;
    }

    if (episode?.success === false) {
        return (
            <section className="seasonDetailsNotFound">
                <h1>Episode not found</h1>
                <NavLink to={seasonUrl} className="seasonBackLink">&larr; Back to season</NavLink>
            </section>
        );
    }

    return (
        <>
            <TitleName title={`${tvShow?.name || "TV Show"} - S${seasonNumber} E${episodeNumber}${episode?.name ? ` ${episode.name}` : ""}`} icon={TvIcon} />
            <section className="movieTvDetailsPageContent">
                {isVisible && <ScrollToTop />}
                {/* hero: episode picture as background + season poster + episode info */}
                <MovieTvShowTopDetailsLayout>
                    <TopBackGroundPoster data={{ backdrop_path: episode?.still_path || tvShow?.backdrop_path, original_title: episode?.name }} />
                    <MovieTvShowPosterLayout>
                        <main className="posterMovieTvSectionLeft">
                            <img src={season?.poster_path ? `https://www.themoviedb.org/t/p/w300_and_h450_multi_faces/${season.poster_path}`
                                : tvShow?.poster_path ? `https://www.themoviedb.org/t/p/w300_and_h450_multi_faces/${tvShow.poster_path}` : Missing}
                                className="MovieDetailsPosterImg" alt="Poster" title={season?.name} />
                        </main>

                        <main className="posterMovieTvSectionRight">
                            <div className="episodeBackLinks">
                                <NavLink to={`/tvShow/${id}`} className="seasonBackLink">&larr; {tvShow?.original_name}</NavLink>
                                <NavLink to={seasonUrl} className="seasonBackLink">{season?.name || `Season ${seasonNumber}`}</NavLink>
                            </div>

                            <div className="posterMovieTvRightTop">
                                <h1 className="posterMovieTvRightTitle">
                                    <span className="episodeCode">S{seasonNumber} E{episodeNumber}</span> {episode?.name}
                                </h1>
                                {episode?.vote_average > 0 && <Rating movie={episode} />}
                            </div>

                            {episode?.overview && (
                                <div className="posterMovieTvRightMiddle">
                                    <MovieOverview movieDetails={episode} />
                                </div>
                            )}

                            <div className="posterMovieTvNumEpSeasonsSection">
                                {episode?.air_date && (
                                    <div className="tvShowEpisodesContent">
                                        <h1 className="tvShowEpisodesTitle">Air date :</h1>
                                        <p className="tvShowEpisodesNum">{episode.air_date}</p>
                                    </div>
                                )}
                                {episode?.runtime > 0 && (
                                    <div className="tvShowEpisodesContent">
                                        <h1 className="tvShowEpisodesTitle">Runtime :</h1>
                                        <p className="tvShowEpisodesNum">{episode.runtime} min</p>
                                    </div>
                                )}
                            </div>

                            {(directors.length > 0 || writers.length > 0) && (
                                <div className="episodeCrew">
                                    {directors.length > 0 && (
                                        <p className="episodeCrewRow">
                                            <span className="episodeCrewJob">Directed by :</span>
                                            {directors.map((person) => (
                                                <NavLink to={`/person/${person.id}`} className="episodeCrewName" key={person.credit_id}>{person.name}</NavLink>
                                            ))}
                                        </p>
                                    )}
                                    {writers.length > 0 && (
                                        <p className="episodeCrewRow">
                                            <span className="episodeCrewJob">Written by :</span>
                                            {writers.map((person) => (
                                                <NavLink to={`/person/${person.id}`} className="episodeCrewName" key={person.credit_id}>{person.name}</NavLink>
                                            ))}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* previous / next episode of this season */}
                            <div className="episodeNavigation">
                                {currentEpisode > 1 ? (
                                    <NavLink to={`${seasonUrl}/episode/${currentEpisode - 1}`} className="episodeNavBtn">&larr; Episode {currentEpisode - 1}</NavLink>
                                ) : <span />}
                                {currentEpisode < episodeCount && (
                                    <NavLink to={`${seasonUrl}/episode/${currentEpisode + 1}`} className="episodeNavBtn">Episode {currentEpisode + 1} &rarr;</NavLink>
                                )}
                            </div>
                        </main>
                    </MovieTvShowPosterLayout>
                </MovieTvShowTopDetailsLayout>
                {/* hero */}

                <section className='movieTvOtherDetailsContent'>
                    <OtherDetailsSectionLayouts>
                        <MoviesTvActorsSection id={episodePath} type="tv" />
                        {guestStars.length > 0 && (
                            <section className='movieTvActorsSection'>
                                <h1 className='movieTvActorsTitle'>Guest stars :</h1>
                                <SwiperSliderCard
                                    className="swiperSliderActorsMovie"
                                    items={guestStars}
                                    sliderSettings={sliderSettings}
                                    pagination={true}
                                    renderContent={(actor) => <SliderSwiperMovieTvActorsContent data={actor} />} />
                            </section>
                        )}
                        <PicturesFromMovieSection id={episodePath} type="tv" title="Pictures from Episode :" />
                    </OtherDetailsSectionLayouts>
                </section>
            </section>
        </>
    )
}

export default EpisodeDetails
