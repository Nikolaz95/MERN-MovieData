import React from 'react'
import { NavLink } from 'react-router-dom';
import titleName from '../../../../hooks/useTitle';
//import css
import "./DashBoard.css"

//import img
import topWatchList from "../../../../../assets/icons/icon-add.png"
import topFavoritList from "../../../../../assets/icons/icons-favorite.png"
import topFavoritActors from "../../../../../assets/icons/icons-actor.png"
import topRatingList from "../../../../../assets/icons/icons-star.png"
import topReviewsList from "../../../../../assets/icons/icon-review.png"
import usersIcon from "../../../../../assets/icons/icon-users.png"
import missingImg from "../../../../../assets/pictures/mising-pic.jpg"

//import components
import DashBoardLayout from '../Layouts/DashBoardLayout/DashBoardLayout';
import { PageHeader, GhostButton } from '../../UserPage/userLayout/DashboardUI';
import getApiUrl from '../../../../hooks/getApiUrl';
import useFetch from '../../../../hooks/useFetch';
import { useGetAdminTopStatsQuery } from '../../../../../redux/api/userApi';


const posterUrl = (path) => (path ? `https://image.tmdb.org/t/p/w92${path}` : missingImg);

// ratings / reviews are saved without a poster -> get it from TMDB
const FetchedPoster = ({ tmdbId, mediaType }) => {
    const { data } = useFetch(getApiUrl(`${mediaType === 'movie' ? 'movie' : 'tv'}/${tmdbId}`));
    return <img src={posterUrl(data?.poster_path)} alt="" className="topRowPoster" loading="lazy" />;
};

const TitlePoster = ({ item }) => (
    item.posterMedia
        ? <img src={posterUrl(item.posterMedia)} alt="" className="topRowPoster" loading="lazy" />
        : <FetchedPoster tmdbId={item.tmdbId} mediaType={item.mediaType} />
);

const titleLink = (item) => `/${item.mediaType === 'movie' ? 'movie' : 'tvShow'}/${item.tmdbId}`;

const plural = (count, word) => `${count} ${word}${count === 1 ? "" : "s"}`;


// one "Top 10" card
const TopPanel = ({ title, subtitle, icon, items, isLoading, index, renderRow }) => (
    <section className="topPanel" style={{ "--p": index }}>
        <header className="topPanelHeader">
            <img src={icon} alt="" className="topPanelIcon" />
            <div>
                <h2 className="topPanelTitle">{title}</h2>
                <p className="topPanelSubtitle">{subtitle}</p>
            </div>
        </header>

        {isLoading ? (
            <ol className="topList" aria-hidden="true">
                {[0, 1, 2, 3].map((i) => <li key={i} className="topRow skeleton"><span /></li>)}
            </ol>
        ) : items?.length ? (
            <ol className="topList">
                {items.map((item, i) => (
                    <li key={i} className="topRow" style={{ "--i": i }}>
                        <span className={`topRank rank${i + 1}`}>{i + 1}</span>
                        {renderRow(item)}
                    </li>
                ))}
            </ol>
        ) : (
            <p className="topEmpty">No data yet.</p>
        )}
    </section>
);

// row content for movies / tv shows
const TitleRow = ({ item, metric }) => (
    <>
        <NavLink to={titleLink(item)} className="topRowLink">
            <TitlePoster item={item} />
            <span className="topRowText">
                <span className="topRowTitle">{item.titleName}</span>
                <span className={`topTypeBadge ${item.mediaType}`}>{item.mediaType === 'movie' ? "Movie" : "TV"}</span>
            </span>
        </NavLink>
        <span className="topMetric">{metric}</span>
    </>
);


const DashBoard = () => {
    titleName(`DashBoard`);
    // always fresh numbers when the dashboard is opened
    const { data, isLoading, isFetching, isError, refetch } = useGetAdminTopStatsQuery(undefined, { refetchOnMountOrArgChange: true });

    const totals = data?.totals || {};
    const top = data?.top || {};

    const totalTiles = [
        { label: "Users", value: totals.users, icon: usersIcon, path: "/admin/listOfUsers" },
        { label: "In watch lists", value: totals.watchList, icon: topWatchList },
        { label: "Favorites", value: totals.favoritList, icon: topFavoritList },
        { label: "Ratings", value: totals.ratings, icon: topRatingList },
        { label: "Favorite actors", value: totals.favoritActors, icon: topFavoritActors },
        { label: "Reviews", value: totals.reviews, icon: topReviewsList },
    ];

    return (
        <DashBoardLayout>
            <section className='adminDashBoardSection'>
                <PageHeader title="Dashboard" subtitle="What users love right now">
                    <GhostButton type="button" onClick={refetch} disabled={isFetching} className="dashRefreshBtn">
                        <svg className={isFetching ? "spinning" : ""} width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M21 12a9 9 0 1 1-2.6-6.4M21 3v6h-6" />
                        </svg>
                        {isFetching ? "Refreshing..." : "Refresh"}
                    </GhostButton>
                </PageHeader>

                {isError && <p className="dashError">Could not load the statistics. Try Refresh.</p>}

                {/* totals */}
                <div className="dashTotals">
                    {totalTiles.map((tile, i) => {
                        const content = (
                            <>
                                <img src={tile.icon} alt="" className="dashTotalIcon" />
                                <span className="dashTotalValue">{isLoading ? "…" : (tile.value ?? 0)}</span>
                                <span className="dashTotalLabel">{tile.label}</span>
                            </>
                        );
                        return tile.path ? (
                            <NavLink key={tile.label} to={tile.path} className="dashTotal" style={{ "--i": i }}>{content}</NavLink>
                        ) : (
                            <div key={tile.label} className="dashTotal" style={{ "--i": i }}>{content}</div>
                        );
                    })}
                </div>

                {/* top 10 lists */}
                <div className="topPanels">
                    <TopPanel index={0} title="Top 10 Watch List" subtitle="Most added to watch lists"
                        icon={topWatchList} items={top.watchList} isLoading={isLoading}
                        renderRow={(item) => <TitleRow item={item} metric={plural(item.count, "user")} />} />

                    <TopPanel index={1} title="Top 10 Favorit List" subtitle="Most added to favorites"
                        icon={topFavoritList} items={top.favoritList} isLoading={isLoading}
                        renderRow={(item) => <TitleRow item={item} metric={plural(item.count, "user")} />} />

                    <TopPanel index={2} title="Top 10 Rated" subtitle="Highest average user rating"
                        icon={topRatingList} items={top.rated} isLoading={isLoading}
                        renderRow={(item) => (
                            <TitleRow item={item} metric={
                                <>
                                    <span className="topStar">★ {item.avgRating}</span>
                                    <span className="topMetricSmall">{plural(item.count, "rating")}</span>
                                </>
                            } />
                        )} />

                    <TopPanel index={3} title="Top 10 Favorite Actors" subtitle="Most followed actors"
                        icon={topFavoritActors} items={top.actors} isLoading={isLoading}
                        renderRow={(actor) => (
                            <>
                                <NavLink to={`/person/${actor.actorId}`} className="topRowLink">
                                    <img src={posterUrl(actor.actorPoster)} alt="" className="topRowPoster round" loading="lazy" />
                                    <span className="topRowText">
                                        <span className="topRowTitle">{actor.actorName}</span>
                                    </span>
                                </NavLink>
                                <span className="topMetric">{plural(actor.count, "user")}</span>
                            </>
                        )} />

                    <TopPanel index={4} title="Top 10 Most Reviewed" subtitle="Movies and TV shows with the most comments"
                        icon={topReviewsList} items={top.reviewed} isLoading={isLoading}
                        renderRow={(item) => <TitleRow item={item} metric={plural(item.count, "review")} />} />
                </div>
            </section>
        </DashBoardLayout>
    )
}

export default DashBoard
