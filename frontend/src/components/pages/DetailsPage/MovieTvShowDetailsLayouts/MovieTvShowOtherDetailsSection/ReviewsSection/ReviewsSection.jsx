import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import "./ReviewsSection.css";
import toast from 'react-hot-toast';


//import img
import AvatarDefaultImg from "../../../../../../assets/pictures/avatar-profile.jpg"
import LoadMoreReviewsBtn from '../../../../../layouts/Buttons/LoadMoreReviewsBtn/LoadMoreReviewsBtn';
import HideReviewsBtn from '../../../../../layouts/Buttons/HideReviewsBtn/HideReviewsBtn';
import PostBtn from '../../../../../layouts/Buttons/PostBnt/PostBtn';
import DeletePostBtn from '../../../../../layouts/Buttons/DeletePostBtn/DeletePostBtn';
import { useSelector } from 'react-redux';
import { useAddReviewMutation, useDeleteReviewMutation, useGetReviewsQuery } from '../../../../../../redux/api/reviewsApi';


const MAX_REVIEW_LENGTH = 1000;


const ReviewsSection = ({ data, type }) => {
    const { user } = useSelector((state) => state.auth);
    const [reviewText, setReviewText] = useState("");
    const [displayCount, setDisplayCount] = useState(3);

    const [addReview] = useAddReviewMutation();
    const [deleteReview] = useDeleteReviewMutation();
    const { data: reviewsData } = useGetReviewsQuery(data?.id);

    const reviewsCount = reviewsData?.length ?? 0;

    const handlePostReview = async () => {
        if (!user) {
            toast.error("You have to log in.");
            return;
        }
        if (!reviewText.trim()) {
            toast.error("Review cannot be empty!");
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

    // Ctrl + Enter (Cmd + Enter on Mac) posts the review
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            handlePostReview();
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
        <section className="reviewsSection">
            <h1 className="movieTvReviewsTitle">
                Reviews <span className="reviewsCount">{reviewsCount}</span>
            </h1>

            <div className='usersReviewsContent'>
                {/* write a review */}
                <div className={`userReviewPost ${!user ? "loggedOut" : ""}`}>
                    <div className="usersReviewsContentTop">
                        <img src={user?.avatar?.url || AvatarDefaultImg}
                            alt="" className="reviewAvatar" />
                        <div className="reviewAuthor">
                            <p className="reviewAuthorName">{user ? user.name : "Guest"}</p>
                            <p className="reviewAuthorHint">
                                {user ? "Share what you think about it" : (
                                    <>
                                        <NavLink to="/signIn" className="reviewSignInLink">Sign in</NavLink> to write a review
                                    </>
                                )}
                            </p>
                        </div>
                    </div>
                    <div className="usersReviewsContentBottom">
                        <textarea
                            className='reviewTextArea'
                            placeholder={!user ? "You need to log in to write review" : "Write your review here..."}
                            value={reviewText}
                            disabled={!user}
                            maxLength={MAX_REVIEW_LENGTH}
                            onKeyDown={handleKeyDown}
                            onChange={(e) => setReviewText(e.target.value)}>
                        </textarea>
                        <div className="reviewPostActions">
                            {user && (
                                <span className="reviewCharCount">
                                    {reviewText.length} / {MAX_REVIEW_LENGTH}
                                </span>
                            )}
                            <PostBtn handlePostReview={handlePostReview} />
                        </div>
                    </div>
                </div>

                {/* all reviews */}
                {reviewsCount === 0 ? (
                    <p className="reviewsEmpty">No reviews yet - be the first to write one!</p>
                ) : (
                    reviewsData.slice(0, displayCount).map((allReview, i) => (
                        <article key={allReview._id} className="allUsersReviewsSection" style={{ "--i": i % 3 }}>
                            <div className="allUsersReviewsContentTop">
                                <img src={allReview.user?.avatar?.url || AvatarDefaultImg}
                                    alt="" className="reviewAvatar" />
                                <div className="reviewAuthor">
                                    <p className="reviewAuthorName">{allReview.user?.name}</p>
                                    <p className="reviewDate">{new Date(allReview.createdAt).toLocaleDateString()}</p>
                                </div>
                                {user && user._id === allReview.user?._id && (
                                    <div className="reviewDeleteBtn">
                                        <DeletePostBtn handleDeleteReview={() => handleDeleteReview(allReview._id)} />
                                    </div>
                                )}
                            </div>
                            <p className="allUsersReviewsText">{allReview.review}</p>
                        </article>
                    ))
                )}
            </div>

            {/* btsn load more hide */}
            <div className="loadMoreHideBtnContent">
                {reviewsCount > displayCount && (
                    <LoadMoreReviewsBtn loadMoreReviews={loadMoreReviews} />
                )}

                {reviewsCount > 3 && displayCount >= reviewsCount && (
                    <HideReviewsBtn hideReviews={hideReviews} />
                )}
            </div>
        </section>
    )
}

export default ReviewsSection
