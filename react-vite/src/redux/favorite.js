// CRD Favorites
// Action Types
const ADD_FAVORITE = 'favorites/addFavorite';
const DELETE_FAVORITE = 'favorites/deleteFavorite';
const LOAD_FAVORITES_ALL = 'favorites/loadFavoritesAll';
const LOAD_FAVORITES_ONE = 'favorites/loadFavoritesOne';

// Action Creator
const addFavorite = (data) => ({
    type: ADD_FAVORITE,
    payload: data
});

const deleteFavorite = (data) => ({
    type: DELETE_FAVORITE,
    payload: data
});

const loadFavoritesAll = (data) => ({
    type: LOAD_FAVORITES_ALL,
    payload: data
});

const loadFavoritesOne = (data) => ({
    type: LOAD_FAVORITES_ONE,
    payload: data
});


// Thunks
export const addFavoriteThunk = (favorite) => async (dispatch) => {
    // console.log("Is this working?")
    const response = await fetch("/api/favorites/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(favorite),
        credentials: 'include'
    });
    // console.log("response data in thunk", response)
    if (response.ok) {
        const data = await response.json();
        // console.log("data in thunk before dispatch", data)
        dispatch(addFavorite(data));
        // console.log("data in thunk after dispatch", data)
        return data;
    } else {
        const errorData = await response.json();
        throw new Error(errorData.error);
    }
};

export const deleteFavoriteThunk = (favoriteId) => async (dispatch) => {
    const response = await fetch(`/api/favorites/${favoriteId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        dispatch(deleteFavorite(favoriteId));
        return favoriteId;
    }
};

export const getFavoritesAllThunk = () => async (dispatch) => {
    const response = await fetch('/api/favorites/');
    // console.log("response data in thunk", response)
    if (response.ok) {
        const data = await response.json();
        // console.log("data in thunk before dispatch", data)
        dispatch(loadFavoritesAll(data));
        // console.log("data in thunk after dispatch", data)
        return data;
    }
};

// export const getFavoritesOneThunk = (favoriteId) => async (dispatch) => {
//     const response = await fetch(`/api/favorites/${favoriteId}`);

//     if (response.ok) {
//         const data = await response.json();
//         dispatch(loadFavoritesOne(data));
//         return data;
//     }
// };


export const getFavoritesOneThunk = (favoriteId) => async (dispatch) => {

    try {
        const response = await fetch(`/api/favorites/${favoriteId}`);

        if (response.ok) {
            const data = await response.json();
            dispatch(loadFavoritesOne(data));
            return data;
        }
    } catch (e) {
        console.error('Error: getFavoritesOneThunk: ', e)
        return e
    }
};

// Initialize State
const initialState = { allFavorites: [], byId: {} };


// Reducer
function favoriteReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_FAVORITE: {
            const newState = { ...state };
            newState.allFavorites = [...newState.allFavorites, action.payload];
            newState.byId[action.payload.id] = action.payload;
            return newState;
        }

        case DELETE_FAVORITE: {
            const newState = { ...state };
            newState.allFavorites = newState.allFavorites.filter(fav => fav.id !== action.payload);
            delete newState.byId[action.payload];
            return newState;
        }

        case LOAD_FAVORITES_ALL: {
            const newState = { ...state };
            newState.allFavorites = Array.isArray(action.payload) ? action.payload : [];
            // newState.allFavorites = action.payload;

            for (let favorite of newState.allFavorites) {
                newState.byId[favorite.id] = favorite;
            }
            return newState;
        }

        case LOAD_FAVORITES_ONE: {
            const newState = { ...state };
            newState.single = action.payload;
            return newState;
        }

        default:
            return state;
    }
}

export default favoriteReducer;