import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "@env";

export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async (_, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        try {
            const response = await fetch(`${API_URL}/api/users/me`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || "Something went wrong!");
            }

            return data.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateUserDetails = createAsyncThunk(
    "user/updateUserDetails",
    async (updateData, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        try {
            const response = await fetch(`${API_URL}/api/users/update`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token,
                },
                body: JSON.stringify(updateData),
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || "Something went wrong!");
            }

            return updateData;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateUserAddress = createAsyncThunk(
    "user/updateUserAddress",
    async (addressData, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        const { addressId, ...body } = addressData;

        let url = `${API_URL}/api/users/userAddress`;
        let method = "POST";

        if (addressId) {
            url = `${API_URL}/api/users/userAddress/${addressId}`;
            method = "PATCH";
        }

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token,
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || "Something went wrong!");
            }

            return {
                addressess: data.data,
                defaultAddress: data.defaultAddress
            };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteUserAddress = createAsyncThunk(
    "user/deleteUserAddress",
    async (addressId, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        try {
            const response = await fetch(`${API_URL}/api/users/userAddress/${addressId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || "Something went wrong!");
            }

            return {
                addressess: data.data,
                defaultAddress: data.defaultAddress
            };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    userLoading: false,
    name: "Not Set",
    phone: "Not Set",
    email: "Not Set",
    gender: "Not Set",
    birthday: "Not Set",
    address: [],
    userError: null,
    defaultAddress: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Fetch User
        builder.addCase(fetchUser.pending, (state) => {
            state.userLoading = true;
            state.userError = null;
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.userLoading = false;
            state.name = action.payload.name || "Not Set";
            state.phone = action.payload.phone || "Not Set";
            state.email = action.payload.email || "Not Set";
            state.gender = action.payload.gender || "Not Set";
            state.birthday = action.payload.birthday || "Not Set";
            state.address = action.payload.addressess || [];
            state.defaultAddress = action.payload.defaultAddress || null;
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.userLoading = false;
            state.userError = action.payload;
        });

        // Update User Details
        builder.addCase(updateUserDetails.fulfilled, (state, action) => {
            Object.keys(action.payload).forEach(key => {
                state[key] = action.payload[key];
            });
            state.userLoading = false;
        });
        builder.addCase(updateUserDetails.rejected, (state, action) => {
            state.userError = action.payload;
            state.userLoading = false;
        });

        // Update User Address (Create/Edit)
        builder.addCase(updateUserAddress.fulfilled, (state, action) => {
            state.address = action.payload.addressess;
            state.defaultAddress = action.payload.defaultAddress;
            state.userLoading = false;
        });
        builder.addCase(updateUserAddress.rejected, (state, action) => {
            state.userError = action.payload;
            state.userLoading = false;
        });

        // Delete User Address
        builder.addCase(deleteUserAddress.fulfilled, (state, action) => {
            state.address = action.payload.addressess;
            state.defaultAddress = action.payload.defaultAddress;
            state.userLoading = false;
        });
        builder.addCase(deleteUserAddress.rejected, (state, action) => {
            state.userError = action.payload;
            state.userLoading = false;
        });
    },
});

export default userSlice.reducer;
