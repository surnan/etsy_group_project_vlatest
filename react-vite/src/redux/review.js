//Constants
const GET_REVIEWS = 'review/GET_REVIEWS';
const GET_REVIEW = 'review/GET_REVIEW';
const ADD_REVIEW = 'review/ADD_REVIEW';
const DELETE_REVIEW = 'review/DELETE_REVIEW';
const EDIT_REVIEW = 'review/EDIT_REVIEW';
//mama
//Action Creators
const getReviews = (reviews) => ({
    type: GET_REVIEWS,
    payload: reviews
});

const getReview = (review) => ({
    type: GET_REVIEW,
    payload: review
});

const addReview = (review) => ({
    type: ADD_REVIEW,
    payload: review
});

const deleteReview = (deletedReview) => ({
    type: DELETE_REVIEW,
    payload: deletedReview
});

const editReview = (updatedReview) => ({
    type: EDIT_REVIEW,
    payload: updatedReview
});

//Thunks
export const getReviewsThunk = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}/reviews`);

    if (response.ok) {
        const reviews = await response.json();
        // console.log(reviews)
        dispatch(getReviews(reviews));
        return reviews;
    }
};

export const getReviewThunk = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`);

    if (response.ok) {
        const review = await response.json();
        dispatch(getReview(review));
        return review;
    }
};

export const addReviewThunk = (review, productId, userId) => async (dispatch) => {

    const response = await fetch(`/api/reviews/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "stars": review.stars,
            "review": review.review,
            "productId": productId,
            "userId": userId
        })
    });

    // console.log('The response is', response)

    if (response.ok) {
        const data = await response.json();

        dispatch(addReview(data));
        return data;
    }
};

export const deleteReviewThunk = (reviewId) => async (dispatch) => {

    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(deleteReview(reviewId));
    }
};

export const editReviewThunk = (review) => async (dispatch) => {
    // console.log('The edited review is ', review)
    const response = await fetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    });

    if (response.ok) {
        const review = await response.json();

        dispatch(editReview(review));
    }
};


//Reducer
const initialState = { allReviews: [], byId: {} };

function reviewReducer(state = initialState, action) {
    let newState;

    switch (action.type) {
        case GET_REVIEWS: {
            // console.log('Yayayayayayayayayayay', action.payload)
            newState = { ...state };
            newState.allReviews = action.payload;
            for (let review of newState.allReviews) {
                newState.byId[review.id] = review;
            }
            return newState;
        }

        case GET_REVIEW: {
            newState = { ...state };
            newState.currentReview = action.payload;
            return newState;
        }

        case ADD_REVIEW: {
            newState = { ...state };
            newState.allReviews = { ...action.payload };
            newState.byId = { ...newState.byId, [action.payload.id]: action.payload };
            return newState;
        }

        case EDIT_REVIEW: {

            newState = { ...state };

            const reviewId = action.payload.review.id;

            console.log(reviewId, 'is the review id');

            const newAllReviews = [];

            for (let i = 0; i < newState.allReviews.length; i++) {
                let currentReview = newState.allReviews[i];
                if (currentReview.id === reviewId) {
                    newAllReviews.push(action.payload.review);
                } else {
                    newAllReviews.push(currentReview);
                }
            }

            console.log(newAllReviews, 'is the new all reviews array');

            newState.allReviews = newAllReviews;
            newState.byId = { ...newState.byId, [reviewId]: action.payload.review };

            return newState;
        }

        case DELETE_REVIEW: {
            newState = { ...state }
            // console.log('Marilyn has a ', newState, 'lamb')

            let reviewId = action.payload;

            // console.log(newState);

            const newAllReviewsArr = newState.allReviews.filter(rev => {
                return rev.id !== reviewId;
            })

            newState.allReviews = newAllReviewsArr;
            delete newState.byId[reviewId];
            return newState;
        }

        default: {
            return state;
        }
    }
}

export default reviewReducer;