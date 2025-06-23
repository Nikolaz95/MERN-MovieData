import React from 'react'
import { useParams } from 'react-router-dom';
import { useMoveBack } from '../../../hooks/useMoveBack';


//import css
import "./PersonDetails.css";
//import components
import TitleName from '../../../hooks/TitleName/TitleName'
import getApiUrl from '../../../hooks/getApiUrl';
import useFetch from '../../../hooks/useFetch';
import Button from '../../../layouts/Buttons/Button';
import ActorMoviesContent from './ActorMoviesComponent/ActorMoviesContent';
import PersonDetailsLeftComponent from './PersonDetailsLayouts/PersonDetailsLeftLayout/PersonDetailsLeftComponent';
import PersonDetailsRightComponent from './PersonDetailsLayouts/PersonDetailsRightLayout/PersonDetailsRightComponent';

const PersonDetails = () => {
    const goBack = useMoveBack();
    /* fetch */
    const { id } = useParams();
    const apiUrl = getApiUrl(`person/${id}`);
    const { data, loading, error } = useFetch(apiUrl);
    console.log(data.name);
    return (
        <>
            <TitleName title={data?.name} />
            <section className="actorDetailsContent">
                <div className="goBackBtn">
                    <Button onClick={goBack}
                        variant="goBack">
                        <p>Go Back</p>
                    </Button>
                </div>
                <section className='actorInfoSection'>
                    <PersonDetailsLeftComponent data={data} type="person" />
                    <PersonDetailsRightComponent data={data} />
                </section>


                <ActorMoviesContent id={id} />
            </section >
        </>
    )
}

export default PersonDetails