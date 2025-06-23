import React from 'react'


//import css
import "./PersonDetailsLeftComponent.css";

//import pictures
import missingImg from "../../../../../../assets/pictures/mising-pic.jpg"
import Button from '../../../../../layouts/Buttons/Button';
import AddFavActorBtn from '../../../../../layouts/Buttons/AddFavActorBtn/AddFavActorBtn';

const PersonDetailsLeftComponent = ({ data, type }) => {

    const today = new Date();
    const birthDate = new Date(data.birthday);

    const age = today.getFullYear() - birthDate.getFullYear();

    return (
        <aside className='actorAsideLeft'>
            <img src={data?.profile_path ? `https://image.tmdb.org/t/p/w500${data.profile_path}` : missingImg} alt={data?.name} title={data?.name} className='actorsImg' />

            <article className="actorDetailsInfo">
                <div className="detailAddbtns">
                    <AddFavActorBtn actorData={data} mediaType={type} />
                </div>
                <div className='actorInfo'>
                    <div className='actorInfoContent'>
                        <h1 className='actorInfoTitle'>Personal Info</h1>
                    </div>
                    <div className='actorInfoContent'>
                        <h1 className='actorInfoTitle'>Know for:</h1>
                        <p className='actorInfoText'>{data?.known_for_department}</p>
                    </div>
                    <div className='actorInfoContent'>
                        <h1 className='actorInfoTitle'>Birthday:</h1>
                        <p className='actorInfoText'>{data?.birthday}, ({age})</p>
                    </div>
                    <div className='actorInfoContent'>
                        <h1 className='actorInfoTitle'>Place of Birth:</h1>
                        <p className='actorInfoText'>{data?.place_of_birth} </p>
                    </div>
                </div>
            </article>
        </aside>
    )
}

export default PersonDetailsLeftComponent