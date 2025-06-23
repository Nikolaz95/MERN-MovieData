import React, { useState } from 'react'
import styled from 'styled-components';
import "./ReviewsSection.css";
import toast from 'react-hot-toast';

const ReviewsSections = styled.section`
      display: flex;
    padding: 10px;
    gap: 20px;
    flex-direction: column;

`;

const ReviewsTitle = styled.h1`
      font-size: 25px;

`;

const ReviewsContent = styled.main`
     display: flex;
    flex-direction: column;
    gap: 20px;
`;

const UserReviewsTableContent = styled.div`
     display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;
    border: 1px solid black;
`;


//import img
import AvatarDefaultImg from "../../../../../../assets/pictures/avatar-profile.jpg"
import PostDeletBtn from '../../../../../layouts/Buttons/PostDeleteComentBtn/PostDeletBtn';
import LoadMoreReviewsBtn from '../../../../../layouts/Buttons/LoadMoreReviewsBtn/LoadMoreReviewsBtn';
import HideReviewsBtn from '../../../../../layouts/Buttons/HideReviewsBtn/HideReviewsBtn';
import PostBtn from '../../../../../layouts/Buttons/PostBnt/PostBtn';
import DeletePostBtn from '../../../../../layouts/Buttons/DeletePostBtn/DeletePostBtn';
import { useSelector } from 'react-redux';
import { useAddReviewMutation, useDeleteReviewMutation, useGetReviewsQuery } from '../../../../../../redux/api/reviewsApi';
import Image from '../../../../../layouts/ImagesContent/Image';




const ReviewsSection = ({ data, type }) => {
    const { user } = useSelector((state) => state.auth);
    const [reviewText, setReviewText] = useState("");
    const [displayCount, setDisplayCount] = useState(3);

    const [addReview] = useAddReviewMutation();
    const [deleteReview] = useDeleteReviewMutation();
    const { data: reviewsData, isLoading } = useGetReviewsQuery(data?.id);

    console.log("Reviews Data:", reviewsData);

    const handlePostReview = async () => {
        if (!user) {
            toast.error("You have to log in.");
            return;
        }
        if (!reviewText.trim()) {
            alert("Review cannot be empty!");
            return;
        }

        try {
            const movieId = data.id || data.tmdbId;
            const title = data.title || data.original_title || data.name ||
                data.original_name || data.titleName;

            await addReview({
                tmdbId: movieId,
                mediaType: type,  // ✅ not type: type
                titleName: title,
                review: reviewText,  // ✅ not reviewText: reviewText
            }).unwrap();

            setReviewText("");
            toast.success("Review posted successfully!");
        } catch (error) {
            console.error("Failed to post review:", error);
            toast.error("Failed to post review.");
        }
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            await deleteReview(reviewId).unwrap();
            toast.success("Review deleted successfully!");
        } catch (error) {
            console.error("Failed to delete review:", error);
            toast.error("Failed to delete review.");
        }
    };

    const loadMoreReviews = () => {
        setDisplayCount(prevCount => prevCount + 3);
    };

    const hideReviews = () => {
        setDisplayCount(3);
    };


    return (
        <ReviewsSections>
            < ReviewsTitle> Reviews ({reviewsData?.length}) </ReviewsTitle>

            <section className='usersReviewsContent'>
                <main className='userReviewPost'>
                    <div className="usersReviewsContentTop">
                        <Image src={user?.avatar ? user?.avatar?.url : AvatarDefaultImg}
                            alt={user?.name}
                            title={user?.name}
                            variant='reviewsImg' />
                        <p>{user?.name}</p>
                    </div>
                    <div className="usersReviewsContentBottom">
                        <textarea
                            className='reviewTextArea'
                            placeholder={!user ? "You need to log in to write review" : "Here can you write review"}
                            value={reviewText}
                            disabled={!user}
                            onChange={(e) => setReviewText(e.target.value)}>
                        </textarea>
                        <PostBtn handlePostReview={handlePostReview} />
                    </div>
                </main>

                {/* all reviews */}
                {reviewsData?.slice(0, displayCount).map((allReview) => (
                    <main key={allReview._id} className="allUsersReviewsSection">
                        <div className='allUsersReviewsContent'>
                            <div className="allUsersReviewsContentTop">
                                <Image src={allReview.user?.avatar?.url || AvatarDefaultImg}
                                    alt={user?.name}
                                    title={allReview.user?.name}
                                    variant='reviewsImg' />
                                <p>{allReview.user?.name}</p>
                                <p>{new Date(allReview.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="allUsersReviewsContentBottom">
                                <textarea
                                    className='allUsersReviewsTextArea'
                                    value={allReview.review}
                                    readOnly
                                    disabled>
                                </textarea>
                                {user && user._id === allReview.user?._id && (
                                    <DeletePostBtn handleDeleteReview={() => handleDeleteReview(allReview._id)} />
                                )}
                            </div>
                        </div>
                    </main>
                ))}
            </section>

            {/* btsn load more hide */}
            <section className="loadMoreHideBtnContent">
                {reviewsData?.length > displayCount && (
                    <div className="loadMoreBtnContent">
                        <LoadMoreReviewsBtn loadMoreReviews={loadMoreReviews} />
                    </div>
                )}

                {reviewsData?.length > 3 && displayCount >= reviewsData?.length && (
                    <div className="loadMoreBtnContent">
                        <HideReviewsBtn hideReviews={hideReviews} />
                    </div>
                )}
            </section>
            {/* </UserReviewsTableContent >
            </ReviewsContent > */}
        </ReviewsSections >
    )
}

export default ReviewsSection