import React from 'react'


import HideReviews from "../../../../assets/icons/icon-cancelPic.png"

import Button from '../Button'

const HideReviewsBtn = ({ hideReviews }) => {
    return (
        <Button variant="hideReviews" icon={HideReviews} onClick={hideReviews}>
            Hide Comments
        </Button>
    )
}

export default HideReviewsBtn