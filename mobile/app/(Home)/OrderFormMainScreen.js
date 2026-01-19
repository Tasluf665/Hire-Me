import React, { useEffect } from "react";
import { StyleSheet, ScrollView, View, StatusBar } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";

import { useDispatch, useSelector } from "react-redux";
import { authRefreshToken } from "../../store/authSlice";
import { fetchUser } from "../../store/userSlice";

import FullPage from "../../Components/HomeScreen/OrderScreen/FullPage";
import CustomeActivityIndicator from "../../Components/CustomeActivityIndicator";
import Colors from "../../Constant/Colors";
import { API_URL } from "@env"

export default function OrderFormMainScreen() {
    const { item: itemParams } = useLocalSearchParams();
    const item = itemParams ? JSON.parse(itemParams) : null;

    const dispatch = useDispatch();
    const userLoading = useSelector((state) => state.user.userLoading);
    const userError = useSelector((state) => state.user.userError);
    const token = useSelector((state) => state.auth.token);
    const refresh_token = useSelector((state) => state.auth.refresh_token);
    const [brands, setBrands] = React.useState([]);

    useEffect(() => {
        if (userError) {
            console.log(userError);
            dispatch(authRefreshToken(refresh_token));
            dispatch(fetchUser());
        }
    }, [userError]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/api/products/brands/${item._id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "x-auth-token": token,
                        },
                    }
                );

                const result = await response.json();
                if (!result.error) {
                    setBrands(result.data);
                } else {
                    dispatch(authRefreshToken(refresh_token));
                }
            } catch (ex) {
                console.log(
                    "🚀 ~ file: OrderFormMainScreen.js ~ line 57 ~ getData ~ ex",
                    ex
                );
            }
        };

        getData();
        dispatch(fetchUser());
    }, [dispatch, token]);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.Primary_Helper }}>
            <Stack.Screen
                options={{
                    headerTitle: "Order",
                    headerStyle: { backgroundColor: "white" },
                }}
            />
            {userLoading ? (
                <CustomeActivityIndicator />
            ) : (
                <ScrollView style={styles.container}>
                    <FullPage item={item} brands={brands} productId={item._id} />
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        marginTop: StatusBar.currentHeight,
        marginBottom: "10%",
    },
});
