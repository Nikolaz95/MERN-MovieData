import React from 'react'
import titleName from '../../../../hooks/useTitle';
import styled from "styled-components";
//import css
import "./DashBoard.css"

const AdminDashBoardSection = styled.section`
    height: 86.7vh;
`;

//import img
import topWatchList from "../../../../../assets/icons/icon-add.png"
import topFavoritList from "../../../../../assets/icons/icons-favorite.png"
import topFavoritActors from "../../../../../assets/icons/icons-actor.png"
import topRatingList from "../../../../../assets/icons/icons-star.png"
import topReviewsList from "../../../../../assets/icons/icon-review.png"
import moviePic from "../../../../../assets/pictures/poster.jpg"

//import components
import DashBoardLayout from '../Layouts/DashBoardLayout/DashBoardLayout';
import Image from '../../../../layouts/ImagesContent/Image';
const DashBoard = () => {
    titleName(`Admin Dashboard`)
    return (
        <DashBoardLayout>
            <section className='adminDashBoardSection'>
                <h1>DashBoard</h1>
                <section className='adminContentDashBoard'>

                    <div className="adminDashboarContentTop">

                        {/* top 10 add to wathslic */}
                        <div className='borderContentTopList'>
                            <div className="borderTopListContentInner">
                                <Image variant='iconMenu' src={topWatchList} />
                                <h1>Top 10 Watch List :</h1>
                                <div className="topBorderListContent">
                                    <ol>
                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>
                                    </ol>

                                </div>
                            </div>
                        </div>

                        {/* top 10 fav list */}
                        <div className='borderContentTopList'>
                            <div className="borderTopListContentInner">
                                <Image variant='iconMenu' src={topFavoritList} />
                                <h1>Top 10 Favorit List :</h1>
                                <div className="topBorderListContent">
                                    <ol>
                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>
                                    </ol>

                                </div>
                            </div>
                        </div>

                        {/* top 10 rated list */}
                        <div className='borderContentTopList'>
                            <div className="borderTopListContentInner">
                                <Image variant='iconMenu' src={topRatingList} />
                                <h1>Top 10 Rated List :</h1>
                                <div className="topBorderListContent">
                                    <ol>
                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>
                                    </ol>

                                </div>
                            </div>
                        </div>

                        {/* top 10 fav actors */}
                        <div className='borderContentTopList'>
                            <div className="borderTopListContentInner">
                                <Image variant='iconMenu' src={topFavoritActors} />
                                <h1>Top 10 Favorti Actors :</h1>
                                <div className="topBorderListContent">
                                    <ol>
                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>
                                    </ol>

                                </div>
                            </div>
                        </div>

                        {/* Top 10 comments */}
                        <div className='borderContentTopList'>
                            <div className="borderTopListContentInner">
                                <Image variant='iconMenu' src={topReviewsList} />
                                <h1>Top 10 comments :</h1>
                                <div className="topBorderListContent">
                                    <ol>
                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <Image variant='iconTopList' src={moviePic} />
                                            <div className="topBorderListContentInner">
                                                <h1>The Lord of the Rings: The Return of the King
                                                </h1>
                                                <div className="topBorderListContentInnerInfo">
                                                    <p>Num of users:</p>
                                                    <p>1</p>
                                                </div>
                                            </div>
                                        </li>
                                    </ol>

                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="adminDashboarContentBottom">
                        <div className='borderContentBottom'>
                            <p className='borderText'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil nisi nam fugiat quam magnam sapiente, eum est illum distinctio facilis. Dignissimos, vitae accusantium velit omnis placeat libero quia maiores, numquam odit iste enim eaque vel unde ipsam molestias quis obcaecati? Magni, blanditiis fugiat delectus reprehenderit consequuntur tempora nihil voluptatibus sequi omnis, quasi, cumque nam. Qui, dolorem quo pariatur aliquam minus consectetur. Nemo voluptatum alias natus earum tempore nam nostrum velit debitis iure cumque, corporis id ut sunt tempora magni labore voluptas officiis? Est reiciendis ut tempore unde aperiam, blanditiis ab neque quaerat saepe delectus optio? Iusto rerum quod obcaecati cupiditate!</p>
                        </div>

                        <div className='borderContentBottom'>
                            <p className='borderText'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil nisi nam fugiat quam magnam sapiente, eum est illum distinctio facilis. Dignissimos, vitae accusantium velit omnis placeat libero quia maiores, numquam odit iste enim eaque vel unde ipsam molestias quis obcaecati? Magni, blanditiis fugiat delectus reprehenderit consequuntur tempora nihil voluptatibus sequi omnis, quasi, cumque nam. Qui, dolorem quo pariatur aliquam minus consectetur. Nemo voluptatum alias natus earum tempore nam nostrum velit debitis iure cumque, corporis id ut sunt tempora magni labore voluptas officiis? Est reiciendis ut tempore unde aperiam, blanditiis ab neque quaerat saepe delectus optio? Iusto rerum quod obcaecati cupiditate!</p>
                        </div>
                    </div>

                    <div className="adminDashboarContentBottom">
                        <div className='borderContentBottom'>
                            <p className='borderText'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil nisi nam fugiat quam magnam sapiente, eum est illum distinctio facilis. Dignissimos, vitae accusantium velit omnis placeat libero quia maiores, numquam odit iste enim eaque vel unde ipsam molestias quis obcaecati? Magni, blanditiis fugiat delectus reprehenderit consequuntur tempora nihil voluptatibus sequi omnis, quasi, cumque nam. Qui, dolorem quo pariatur aliquam minus consectetur. Nemo voluptatum alias natus earum tempore nam nostrum velit debitis iure cumque, corporis id ut sunt tempora magni labore voluptas officiis? Est reiciendis ut tempore unde aperiam, blanditiis ab neque quaerat saepe delectus optio? Iusto rerum quod obcaecati cupiditate!</p>
                        </div>

                        <div className='borderContentBottom'>
                            <p className='borderTextBottom'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil nisi nam fugiat quam magnam sapiente, eum est illum distinctio facilis. Dignissimos, vitae accusantium velit omnis placeat libero quia maiores, numquam odit iste enim eaque vel unde ipsam molestias quis obcaecati? Magni, blanditiis fugiat delectus reprehenderit consequuntur tempora nihil voluptatibus sequi omnis, quasi, cumque nam. Qui, dolorem quo pariatur aliquam minus consectetur. Nemo voluptatum alias natus earum tempore nam nostrum velit debitis iure cumque, corporis id ut sunt tempora magni labore voluptas officiis? Est reiciendis ut tempore unde aperiam, blanditiis ab neque quaerat saepe delectus optio? Iusto rerum quod obcaecati cupiditate!</p>
                        </div>

                    </div>
                </section>
            </section>
        </DashBoardLayout>

    )
}

export default DashBoard