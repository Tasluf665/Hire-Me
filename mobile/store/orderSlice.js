import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "@env";

export const fetchOrder = createAsyncThunk(
    "order/fetchOrder",
    async (_, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        try {
            const response = await fetch(`${API_URL}/api/users/orders/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token,
                },
            });

            const result = await response.json();

            if (result && result.error) {
                return rejectWithValue(result.error);
            }

            return result.data;
        } catch (error) {
            return rejectWithValue(error.toString());
        }
    }
);

export const addOrder = createAsyncThunk(
    "order/addOrder",
    async (order, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        try {
            const response = await fetch(`${API_URL}/api/orders/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token,
                },
                body: JSON.stringify(order),
            });

            const result = await response.json();

            if (result && result.error) {
                return rejectWithValue(result.error);
            }

            return result.data;
        } catch (error) {
            return rejectWithValue(error.toString());
        }
    }
);

const initialState = {
    orderLoading: false,
    order: [],
    orderError: null,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Fetch Order
        builder.addCase(fetchOrder.pending, (state) => {
            state.orderLoading = true;
            state.orderError = null;
        });
        builder.addCase(fetchOrder.fulfilled, (state, action) => {
            state.orderLoading = false;
            state.order = action.payload;
            state.orderError = null;
        });
        builder.addCase(fetchOrder.rejected, (state, action) => {
            state.orderLoading = false;
            state.orderError = action.payload;
        });

        // Add Order
        builder.addCase(addOrder.pending, (state) => {
            state.orderLoading = true;
            state.orderError = null;
        });
        builder.addCase(addOrder.fulfilled, (state, action) => {
            state.orderLoading = false;
            state.order.push(action.payload);
            state.orderError = null;
        });
        builder.addCase(addOrder.rejected, (state, action) => {
            state.orderLoading = false;
            state.orderError = action.payload;
        });
    },
});

export default orderSlice.reducer;
