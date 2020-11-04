export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState) => {
    return {
        type: "SIGN_IN",
        payload: {
            isSignedIn: true,
            role :userState.role,
            uid: userState.uid,
            username: userState.username,
        }
    }
};

export const FETCH_USER_IMAGE = "FETCH_USER_IMAGE";
export const fetchUserProfileImageAction = (userImagePath) => {
    return {
        type: "FETCH_USER_IMAGE",
        payload: {
            type: "FETCH_SEARCH_RECIPE",
            payload: userImagePath,
        }
    }
};

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
    return {
        type: "SIGN_OUT",
        payload: {
            isSignedIn: false,
            uid: "",
            username: "",
        }
    }
};