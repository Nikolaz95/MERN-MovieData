import React, { useEffect, useState } from 'react'



//import components
import TrandingTabs from '../../../../layouts/TabsComponents/TrandingTabs/TrandingTabs';
import getApiUrl from '../../../../hooks/getApiUrl';
import useFetch from '../../../../hooks/useFetch';
import SwiperAutoPlay from '../../../../layouts/SwiperComponents/SwiperAutoPlay/SwiperAutoPlay';
import TrendingContent from '../TrendingContent/TrendingContent';


const TrendingMovies = () => {
    const [activeTab, setActiveTab] = useState('day');
    const apiUrl = getApiUrl(`trending/movie/${activeTab}`);
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
                title={`Movies Trending : ${activeTab}`}
                variant="trendingBtn"
                activeTab={activeTab}
                onTabClick={handleTabClick} />
            <SwiperAutoPlay
                items={data?.results || []}
                renderSlide={(movie) => <TrendingContent movie={movie} type="movie" />}
                className="trendingSwiper" />
        </section>
    )
}

export default TrendingMovies