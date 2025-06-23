import React, { useState } from 'react'


//import img
import RemoveComment from "../../../../assets/icons/icons-remove.png"
import PostComment from "../../../../assets/icons/icon-comment.png"

import Button from '../Button'

const PostDeletBtn = (/* { review } */) => {
    const [createComment, setCreateComment] = useState(false);

    return (
        <Button
            variant={createComment ? 'removeReview' : 'postComment'}
            icon={createComment ? RemoveComment : PostComment}>
            <p>{createComment ? 'Delete Post' : 'Post'}</p>
        </Button>
    )
}

export default PostDeletBtn