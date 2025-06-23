import React, { useState } from 'react'


import LoadMore from "../../../../assets/icons/icon-load.png"


import Button from '../Button'

const LoadMoreReviewsBtn = ({ loadMoreReviews }) => {

    return (
        <Button variant="loadMore" icon={LoadMore} onClick={loadMoreReviews}>
            LoadMore
        </Button>
    )
}

export default LoadMoreReviewsBtn