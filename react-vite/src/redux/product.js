
//react-vite/src/redux/product.js
const ADD_PRODUCT = 'products/addProductOne';
const ADD_PRODUCT_IMAGES = 'products/addProductImages';
const DELETE_PRODUCT_IMAGES = 'products/deleteProductImages';
const DELETE_PRODUCT = "products/deleteProductOne"
const LOAD_PRODUCTS_ALL = "products/loadProductsAll"
const LOAD_PRODUCTS_ONE = "products/loadProductsOne"
const LOAD_PRODUCTS_OWNED = "products/loadProductsOwned"
const UPDATE_PRODUCT = "products/updateProductOne"
// const GET_REVIEWS = 'reviews/getReviews';


// // Actions
// const getReviews = (productId) => ({
//     type: GET_REVIEWS,
//     payload: productId
// });

const addProduct = (data) => ({
    type: ADD_PRODUCT,
    payload: data
})

const addProductImages = (data) => ({
    type: ADD_PRODUCT_IMAGES,
    payload: data
})

const removeProductImages = (data) => ({
    type: DELETE_PRODUCT_IMAGES,
    payload: data
})

const deleteProduct = (data) => ({
    type: DELETE_PRODUCT,
    payload: data
})

const loadProductsAll = (data) => {
    return {
        type: LOAD_PRODUCTS_ALL,
        payload: data
    };
};

const loadProductsOne = (data) => {
    return {
        type: LOAD_PRODUCTS_ONE,
        payload: data
    };
};

const loadProductsOwned = (data) => {
    return {
        type: LOAD_PRODUCTS_OWNED,
        payload: data,
    };
};

const updateProduct = (data) => ({
    type: UPDATE_PRODUCT,
    payload: data
})

//Thunks
// export const getProductReviewsThunk = (productId) => async (dispatch) => {
//     const response = await fetch(`/api/reviews/${productId}`);
//     if (response.ok) {
//         const data = await response.json();
//         dispatch(getReviews(data));
//     }
// };

export const addProductThunk = (product) => async (dispatch) => {
    const { images, ...body } = product;  // Spread out product to separate images

    const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    });

    const data = await response.json();

    console.log(data, 'data');

    if (response.ok) {
        await insertProductImages({ productId: data.id, imageURLs: images });
        dispatch(addProduct(data));
        return data;
    }
};

export const deleteProductThunk = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(deleteProduct(productId))
        return data
    }
}

export const getProductsAllThunk = () => async (dispatch) => {
    try {
        const response = await fetch('/api/products/');

        console.log(response);

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const data = await response.json();

        //Add Product Images to Products
        for (let product of data) {
            const response = await fetch(`/api/products/${product.id}/images`);
            if (!response.ok) {
                throw new Error('Failed to fetch product images');
            }
            const images = await response.json();
            product.images = images;
        }

        // //Add Reviews to Products
        // for (let product of data) {
        //     const response = await fetch(`/api/products/${product.id}/reviews`);
        //     if (!response.ok) {
        //         throw new Error('Failed to fetch product reviews');
        //     }
        //     const reviews = await response.json();
        //     product.reviews = reviews;
        // }

        console.log(data, 'data');
        dispatch(loadProductsAll(data));
        return data;

    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

export const getProductsOwnedThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/listings`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadProductsOwned(data));
    }
};

export const getProductsOneThunk = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}`)
    if (response.ok) {
        const data = await response.json();
        dispatch(loadProductsOne(data))
        return data
    }
}

export const updateProductThunk = (productForm) => async (dispatch) => {
    console.log(productForm, 'productForm');
    const response = await fetch(`/api/products/${productForm.productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productForm)
    })
    const data = await response.json();
    console.log(data, 'data');
    if (response.ok) {
        dispatch(updateProduct(data))
        return data.id
    }
}


export const insertProductImages = (productId, imageUrl) => async (dispatch) => {
    try {
        const response = await fetch(`/api/products/${productId}/images`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image_url: imageUrl }),
        });

        if (response.ok) {
            const newImage = await response.json();
            dispatch({ type: 'ADD_PRODUCT_IMAGE', payload: newImage });
        } else {
            // handle errors
        }
    } catch (err) {
        console.error('Error inserting product image:', err);
    }
};

export const deleteProductImages = (productId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/products/${productId}/images`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            dispatch({ type: DELETE_PRODUCT_IMAGES, payload: productId });
        } else {
            // Handle error
            console.error('Failed to delete product images');
        }
    } catch (err) {
        console.error('Error deleting product images:', err);
    }
};

// State Object
const initialState = { allProducts: [], byId: {} };

// Reducers
function productReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_PRODUCT: {
            let newState = { ...state }
            newState.allProducts = [...newState.allProducts, action.payload]
            newState.byId[action.payload.id] = action.payload;
            newState.single = action.payload;
            return newState;
        }

        case ADD_PRODUCT_IMAGES: {
            let newState = { ...state }
            newState.single.images = action.payload;
            return newState;
        }

        // case GET_REVIEWS: {
        //     let newState = { ...state }
        //     newState.single.reviews = action.payload;
        //     return newState;
        // }

        case DELETE_PRODUCT_IMAGES: {
            let newState = { ...state }
            newState.single.images = [];
            return newState;
        }

        case DELETE_PRODUCT: {
            let newState = { ...state }

            const filteredProducts = newState.ownedListings.filter(product => {
                return product.id !== action.payload
            });
            newState.ownedListings = filteredProducts;
            const newById = { ...newState.byId }
            delete newById[action.payload]
            newState.byId = newById;
            return newState;
        }

        case LOAD_PRODUCTS_ALL: {
            let newState = { ...state }
            newState.allProducts = action.payload;

            for (let product of newState.allProducts) {
                newState.byId[product.id] = product
            }
            return newState;
        }

        case LOAD_PRODUCTS_ONE: {
            let newState = { ...state }
            newState.single = action.payload
            return newState
        }

        case LOAD_PRODUCTS_OWNED: {
            let newState = { ...state }
            newState.ownedListings = action.payload;
            return newState;
        }

        case UPDATE_PRODUCT: {
            let newState = { ...state }

            const reviewId = action.payload.id

            const newAllProducts = [];

            for (let i = 0; i < newState.allProducts.length; i++) {
                let currentReview = newState.allProducts[i]
                if (currentReview.id === reviewId) {
                    newAllProducts.push(action.payload)
                } else {
                    newAllProducts.push(currentReview)
                }
            }

            newState.allProducts = newAllProducts
            newState.byId = { ...newState.byId, [reviewId]: action.payload }
            return newState
        }

        default:
            return state;
    }
}

export default productReducer;
