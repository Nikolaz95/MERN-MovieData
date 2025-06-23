import React from 'react'

import titleName from '../../../../hooks/useTitle';

//import img
import MoviesNum from "../../../../../assets/icons/logo-movie.png"
import TvShowNum from "../../../../../assets/icons/icon-tvs.png"
import ActorNum from "../../../../../assets/icons/icons-actor.png"
import UsersNum from "../../../../../assets/icons/icon-users.png"
import moviePic from "../../../../../assets/pictures/poster.jpg"


//import css
import "./DataFact.css"
import DashBoardLayout from '../Layouts/DashBoardLayout/DashBoardLayout';
import Image from '../../../../layouts/ImagesContent/Image';

const DataFact = () => {
    titleName(`Data Fact`)
    return (
        <DashBoardLayout>
            <h1>Data Fact</h1>
            <section className='adminContentDashBoard'>

                <div className="dataFactContentTop">

                    <div className='borderContentTop'>
                        <div className="borderContentInner">
                            <Image variant='iconMenu' src={MoviesNum} />
                            <h1>Number Of Movies :</h1>
                            <p>23</p>
                        </div>
                    </div>

                    <div className='borderContentTop'>
                        <div className="borderContentInner">
                            <Image variant='iconMenu' src={TvShowNum} />
                            <h1>Number Of TvShows :</h1>
                            <p>23</p>
                        </div>
                    </div>

                    <div className='borderContentTop'>
                        <div className="borderContentInner">
                            <Image variant='iconMenu' src={ActorNum} />
                            <h1>Number Actors :</h1>
                            <p>23</p>

                        </div>
                    </div>

                </div>

                <div className="dataFactContentBottom">

                    <div className='borderContentBottom'>
                        <p className='borderText'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil nisi nam fugiat quam magnam sapiente, eum est illum distinctio facilis. Dignissimos, vitae accusantium velit omnis placeat libero quia maiores, numquam odit iste enim eaque vel unde ipsam molestias quis obcaecati? Magni, blanditiis fugiat delectus reprehenderit consequuntur tempora nihil voluptatibus sequi omnis, quasi, cumque nam. Qui, dolorem quo pariatur aliquam minus consectetur. Nemo voluptatum alias natus earum tempore nam nostrum velit debitis iure cumque, corporis id ut sunt tempora magni labore voluptas officiis? Est reiciendis ut tempore unde aperiam, blanditiis ab neque quaerat saepe delectus optio? Iusto rerum quod obcaecati cupiditate!</p>
                    </div>

                    <div className='borderContentBottom'>
                        <p className='borderText'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil nisi nam fugiat quam magnam sapiente, eum est illum distinctio facilis. Dignissimos, vitae accusantium velit omnis placeat libero quia maiores, numquam odit iste enim eaque vel unde ipsam molestias quis obcaecati? Magni, blanditiis fugiat delectus reprehenderit consequuntur tempora nihil voluptatibus sequi omnis, quasi, cumque nam. Qui, dolorem quo pariatur aliquam minus consectetur. Nemo voluptatum alias natus earum tempore nam nostrum velit debitis iure cumque, corporis id ut sunt tempora magni labore voluptas officiis? Est reiciendis ut tempore unde aperiam, blanditiis ab neque quaerat saepe delectus optio? Iusto rerum quod obcaecati cupiditate!</p>
                    </div>
                </div>

                <div className="dataFactContentBottom">

                    <div className='borderContentBottom'>
                        <p className='borderText'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil nisi nam fugiat quam magnam sapiente, eum est illum distinctio facilis. Dignissimos, vitae accusantium velit omnis placeat libero quia maiores, numquam odit iste enim eaque vel unde ipsam molestias quis obcaecati? Magni, blanditiis fugiat delectus reprehenderit consequuntur tempora nihil voluptatibus sequi omnis, quasi, cumque nam. Qui, dolorem quo pariatur aliquam minus consectetur. Nemo voluptatum alias natus earum tempore nam nostrum velit debitis iure cumque, corporis id ut sunt tempora magni labore voluptas officiis? Est reiciendis ut tempore unde aperiam, blanditiis ab neque quaerat saepe delectus optio? Iusto rerum quod obcaecati cupiditate!</p>
                    </div>

                    <div className='borderContentBottom'>
                        <p className='borderText'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil nisi nam fugiat quam magnam sapiente, eum est illum distinctio facilis. Dignissimos, vitae accusantium velit omnis placeat libero quia maiores, numquam odit iste enim eaque vel unde ipsam molestias quis obcaecati? Magni, blanditiis fugiat delectus reprehenderit consequuntur tempora nihil voluptatibus sequi omnis, quasi, cumque nam. Qui, dolorem quo pariatur aliquam minus consectetur. Nemo voluptatum alias natus earum tempore nam nostrum velit debitis iure cumque, corporis id ut sunt tempora magni labore voluptas officiis? Est reiciendis ut tempore unde aperiam, blanditiis ab neque quaerat saepe delectus optio? Iusto rerum quod obcaecati cupiditate!</p>
                    </div>

                </div>
            </section>
        </DashBoardLayout>
    )
}

export default DataFact