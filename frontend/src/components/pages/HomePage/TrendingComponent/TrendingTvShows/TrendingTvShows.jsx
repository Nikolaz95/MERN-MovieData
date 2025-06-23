import React, { useEffect, useState } from 'react'
import getApiUrl from '../../../../hooks/getApiUrl';
import useFetch from '../../../../hooks/useFetch';
import TrendingContent from '../TrendingContent/TrendingContent';
import TrandingTabs from '../../../../layouts/TabsComponents/TrandingTabs/TrandingTabs';
import SwiperAutoPlay from '../../../../layouts/SwiperComponents/SwiperAutoPlay/SwiperAutoPlay';


//import components


const TrendingTvShows = () => {
    const [activeTab, setActiveTab] = useState('day');
    const apiUrl = getApiUrl(`trending/tv/${activeTab}`);
    const { data, loading, error } = useFetch(apiUrl);
    console.log(data);

    useEffect(() => {
        // Fetch data on initial render and when tab changes
        console.log(data);
    }, [apiUrl]); // Dependency on apiUrl

    const handleTabClick = (newTab) => {
        setActiveTab(newTab);
    };
    return (
        <section className="TrendingSection">
            <TrandingTabs
                title={`Tv Shows Tranding : ${activeTab}`}
                variant="trendingBtn"
                activeTab={activeTab}
                onTabClick={handleTabClick} />
            <SwiperAutoPlay
                items={data?.results || []}
                renderSlide={(movie) => <TrendingContent movie={movie} type="tv" />}
                className="trendingSwiper" />
        </section>
    )
}

export default TrendingTvShows