import React, { useState } from 'react'

//import css
import "./StreamingModal.css";

//import img
import Missing from "../../../../../assets/pictures/mising-pic.jpg"

//import components
import getApiUrl from '../../../../hooks/getApiUrl';
import useFetch from '../../../../hooks/useFetch';
import ProviderSection from './ProviderSection/StreamingProviders/ProviderSection';
import CountrySelect from './CountrySelect/CountrySelect';

// TMDB watch/providers gives a list per country (region code)
const DEFAULT_REGION = "SE";
const REGION_STORAGE_KEY = "streamingRegion";

// all provider types TMDB returns, in the order they are shown
const PROVIDER_TYPES = [
    { key: "flatrate", title: "Stream", badge: "Subscription", variant: "stream" },
    { key: "free", title: "Watch", badge: "Free", variant: "free" },
    { key: "ads", title: "Watch", badge: "With ads", variant: "ads" },
    { key: "rent", title: "Rent", badge: "Rental", variant: "rent" },
    { key: "buy", title: "Buy", badge: "Purchase", variant: "buy" },
];

// "SE" -> "Sweden" (built into the browser, no extra library)
const regionNames = typeof Intl !== "undefined" && Intl.DisplayNames
    ? new Intl.DisplayNames(["en"], { type: "region" })
    : null;

const getRegionName = (code) => {
    try {
        return regionNames?.of(code) || code;
    } catch {
        return code;
    }
};

// remember the last chosen country in this browser
const loadSavedRegion = () => {
    try {
        return localStorage.getItem(REGION_STORAGE_KEY) || DEFAULT_REGION;
    } catch {
        return DEFAULT_REGION;
    }
};

const StreamingModal = ({ movieInfo, onClose, type }) => {
    const [region, setRegion] = useState(loadSavedRegion);

    /* fetch */
    // id from movieInfo - modal is rendered in GlobalModals, outside the details route
    const apiUrl = getApiUrl(`${type}/${movieInfo?.id}/watch/providers`);
    const { data, loading } = useFetch(apiUrl);

    // countries that have providers for this title (+ the selected one), sorted by name
    const regionOptions = [...new Set([...Object.keys(data?.results || {}), region])]
        .sort((a, b) => getRegionName(a).localeCompare(getRegionName(b)));

    const regionData = data?.results?.[region];
    const hasAnyProviders = PROVIDER_TYPES.some((t) => regionData?.[t.key]?.length > 0);

    const handleRegionChange = (code) => {
        setRegion(code);
        try {
            localStorage.setItem(REGION_STORAGE_KEY, code);
        } catch {
            // storage blocked - the choice just isn't remembered
        }
    };

    const title = movieInfo?.title || movieInfo?.name || movieInfo?.original_title || movieInfo?.original_name;
    const year = (movieInfo?.release_date || movieInfo?.first_air_date)?.slice(0, 4);

    return (
        <div className="streamingModal" role="dialog" aria-labelledby="streamingModalTitle">
            <button type="button" className="streamingModalClose" onClick={onClose} aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                </svg>
            </button>

            <header className="streamingModalHeader">
                <img src={movieInfo?.poster_path ? `https://image.tmdb.org/t/p/w185${movieInfo.poster_path}` : Missing}
                    alt="" className='streamingModalPosterImg' />
                <div className="streamingModalHeaderText">
                    <p className="streamingModalEyebrow">Where to watch</p>
                    <h2 id="streamingModalTitle" className="streamingModalTitle">{title}</h2>
                    {year && <p className="streamingModalMeta">{year}</p>}

                    {/* country picker with flags */}
                    <CountrySelect value={region} options={regionOptions}
                        onChange={handleRegionChange} getName={getRegionName} />
                </div>
            </header>

            {/* key={region}: provider animation plays again when the country changes */}
            <div className="streamingModalBody" key={region}>
                {loading ? (
                    // skeleton while loading
                    <ul className="providerList" aria-hidden="true">
                        {[0, 1, 2, 3].map((i) => (
                            <li key={i} className="providerItem">
                                <span className="providerSkeleton" />
                            </li>
                        ))}
                    </ul>
                ) : hasAnyProviders ? (
                    PROVIDER_TYPES.map((t) => (
                        <ProviderSection key={t.key} title={t.title} badge={t.badge}
                            variant={t.variant} providers={regionData?.[t.key]}
                            searchTitle={title} fallbackLink={regionData?.link} />
                    ))
                ) : (
                    <div className="streamingModalEmpty">
                        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="7" width="20" height="14" rx="2" />
                            <path d="m17 2-5 5-5-5" />
                        </svg>
                        <p className="streamingModalNoContentText">
                            Not available to stream, rent or buy in {getRegionName(region)} right now.
                        </p>
                        {regionOptions.length > 1 && (
                            <p className="streamingModalEmptyHint">Try another country above.</p>
                        )}
                    </div>
                )}
            </div>

            <footer className="streamingModalFooter">
                {regionData?.link && (
                    <a href={regionData.link} target="_blank" rel="noopener noreferrer" className="streamingModalMoreLink">
                        See all options →
                    </a>
                )}
                <span className="streamingModalCredit">Data by JustWatch</span>
            </footer>
        </div>
    )
}

export default StreamingModal
