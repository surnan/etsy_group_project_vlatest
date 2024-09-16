const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});

export const thunkAuthenticate = () => async (dispatch) => {
  try {
    const response = await fetch("/api/auth/");
    if (response.ok) {
      const data = await response.json();
      if (data.errors) {
        return;
      }
      dispatch(setUser(data));
    }
  } catch (e) {
    console.error('Error: thunkAuthenticate: ', e)
  }
};

// export const thunkLogin = (credentials) => async dispatch => {
//   const response = await fetch("/api/auth/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(credentials)
//   });

//   if (response.ok) {
//     const data = await response.json();
//     dispatch(setUser(data));
//   } else if (response.status < 500) {
//     const errorMessages = await response.json();
//     return errorMessages
//   } else {
//     return { server: "Something went wrong. Please try again" }
//   }
// };


export const thunkLogin = (userCredentials) => async (dispatch) => {
  const { email, password } = userCredentials;

  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  // If the response is not OK (status not 200), throw an error manually
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData; // This will trigger the .catch block in your component
  }

  const data = await response.json();
  dispatch(setUser(data)); // Update the Redux store with user info
  return response;
};


// export const thunkSignup = (user) => async (dispatch) => {
//   const response = await fetch("/api/auth/signup", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(user)
//   });

//   if (response.ok) {
//     const data = await response.json();
//     dispatch(setUser(data));
//   } else if (response.status < 500) {
//     const errorMessages = await response.json();
//     return errorMessages
//   } else {
//     return { server: "Something went wrong. Please try again" }
//   }
// };


export const thunkSignup = (user) => async (dispatch) => {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
    } else if (response.status < 500) {
      const errorMessages = await response.json();
      return errorMessages;
    } else {
      return { server: 'Something went wrong. Please try again' };
    }
  } catch (e) {
    console.error('Error: thunkSignup:', e);
    return { server: 'Network error. Please try again.' };
  }
};



// export const thunkLogout = () => async (dispatch) => {
//   await fetch("/api/auth/logout");
//   dispatch(removeUser());
// };

export const thunkLogout = () => async (dispatch) => {
  try {
    await fetch('/api/auth/logout');
    dispatch(removeUser());
  } catch (e) {
    console.error('Error: thunkLogout:', e);
  }
};


const initialState = { user: null };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}

export default sessionReducer;
