import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";

import CardView from "../../Components/CartScreen/CardView";
import CustomeActivityIndicator from "../../Components/CustomeActivityIndicator";
import Colors from "../../Constant/Colors";

import { useDispatch, useSelector } from "react-redux";
import { fetchOrder } from "../../store/orderSlice";
import { authRefreshToken } from "../../store/authSlice";

export default function HistoryMainScreen() {
    const dispatch = useDispatch();
    const order = useSelector((state) => state.order.order);
    const orderLoading = useSelector((state) => state.order.orderLoading);
    const orderError = useSelector((state) => state.order.orderError);

    const refresh_token = useSelector((state) => state.auth.refresh_token);

    useEffect(() => {
        if (orderError) {
            console.log(orderError);
            dispatch(authRefreshToken(refresh_token));
            dispatch(fetchOrder());
        }
    }, [orderError]);

    useEffect(() => {
        dispatch(fetchOrder());
    }, [dispatch]);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.Gray }}>
            {orderLoading ? (
                <CustomeActivityIndicator />
            ) : (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item._id}
                    data={order.filter(
                        (item) =>
                            item.status[item.status.length - 1].statusState ===
                            "Payment Complete"
                    )}
                    renderItem={({ item }) => (
                        <CardView
                            image={item.categoryType}
                            title={item.category}
                            description={item.problem}
                            orderId={item._id}
                            history={true}
                        />
                    )}
                />
            )}
        </View>
    );
}
