import React from 'react'
import Button from '../Button'

//import img
import PostComment from "../../../../assets/icons/icon-comment.png"

const PostBtn = ({ handlePostReview }) => {
    return (
        <Button onClick={handlePostReview}
            variant="postComment"
            icon={PostComment}>
            <p>Post</p>
        </Button>
    )
}

export default PostBtn