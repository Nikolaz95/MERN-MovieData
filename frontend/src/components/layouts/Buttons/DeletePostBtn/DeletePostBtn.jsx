import React from 'react'

//import img
import RemoveComment from "../../../../assets/icons/icons-remove.png"
import Button from '../Button'

const DeletePostBtn = ({ handleDeleteReview }) => {
    return (
        <Button onClick={handleDeleteReview}
            variant="removeReview"
            icon={RemoveComment}>
            <p>Delete Post</p>
        </Button>
    )
}

export default DeletePostBtn