import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        refreshToken: null,
        userId: null,
        didTryAutoLogin: false,
        isLoading: false,
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setAuthenticate: (state, action) => {
            const { userId, token, refreshToken } = action.payload;
            state.token = token;
            state.refreshToken = refreshToken;
            state.userId = userId;
            state.didTryAutoLogin = true;
        },
        setDidTryAutoLogin: (state) => {
            state.didTryAutoLogin = true;
        },
        setLogout: (state) => {
            state.token = null;
            state.refreshToken = null;
            state.userId = null;
            state.didTryAutoLogin = true;
        },
    },
});

export const { setAuthenticate, setDidTryAutoLogin, setLogout, setLoading } = authSlice.actions;

// Helper to save data
const saveDataToStorage = async (token, userId, refreshToken) => {
    try {
        await AsyncStorage.setItem(
            "userData",
            JSON.stringify({
                token: token,
                userId: userId,
                refreshToken: refreshToken,
            })
        );
    } catch (err) {
        console.log("Error saving to storage", err);
    }
};

// Thunk: Authenticate and Save
export const authenticate = (userId, token, refreshToken) => {
    return async (dispatch) => {
        dispatch(setAuthenticate({ userId, token, refreshToken }));
        await saveDataToStorage(token, userId, refreshToken);
    };
};

// Thunk: Logout and Remove
export const logout = () => {
    return async (dispatch) => {
        try {
            await AsyncStorage.removeItem("userData");
            dispatch(setLogout());
        } catch (err) {
            console.log("Error removing from storage", err);
        }
    };
};

// Thunk: Refresh Token
export const authRefreshToken = (refreshToken) => {
    return async (dispatch) => {
        if (refreshToken) {
            try {
                const response = await fetch(`${API_URL}/api/auth/newToken`, {
                    headers: {
                        "Content-Type": "application/json",
                        "refresh-token": refreshToken,
                    },
                    method: "POST",
                });
                const result = await response.json();
                if (!result.error) {
                    dispatch(authenticate(result.data._id, result.data.token, result.data.refreshToken));
                } else {
                    dispatch(logout());
                }
            } catch (ex) {
                console.log("Refresh token error", ex.message);
                dispatch(logout());
            }
        } else {
            dispatch(logout());
        }
    };
};

export const tryAutoLogin = () => {
    return async (dispatch) => {
        const userData = await AsyncStorage.getItem("userData");
        if (!userData) {
            dispatch(setDidTryAutoLogin());
            return;
        }

        const transformedData = JSON.parse(userData);
        const { token, userId, refreshToken } = transformedData;

        if (!token || !userId) {
            dispatch(setDidTryAutoLogin());
            return;
        }

        // Ideally verify token expiration here if saved
        dispatch(setAuthenticate({
            token: token,
            userId: userId,
            refreshToken: refreshToken
        }));
    };
};

export default authSlice.reducer;
