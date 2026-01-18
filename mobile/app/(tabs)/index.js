import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";

import Header from "../../Components/HomeScreen/Header";
import TopDeals from "../../Components/HomeScreen/TopDeals";
import Services from "../../Components/HomeScreen/Services";
import Offers from "../../Components/HomeScreen/Offers";

import Colors from "../../Constant/Colors";
import CustomeActivityIndicator from "../../Components/CustomeActivityIndicator";
import { authRefreshToken } from "../../store/authSlice";
import { API_URL } from "@env"

import { useSelector, useDispatch } from "react-redux";

export default function HomeMainScreen() {
    const [serviceItem, setServiceItem] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const token = useSelector((state) => state.auth.token);
    const refresh_token = useSelector((state) => state.auth.refresh_token);
    const dispatch = useDispatch();

    React.useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`${API_URL}/api/products`, {
                    headers: {
                        "Content-Type": "application/json",
                        "x-auth-token": token,
                    },
                });

                const result = await response.json();

                if (!result.error) {
                    setServiceItem(result.data);
                    setLoading(false);
                } else {
                    dispatch(authRefreshToken(refresh_token));
                }
            } catch (ex) {
                console.log(
                    "🚀 ~ file: HomeMainScreen.js ~ line 36 ~ getData ~ ex",
                    ex
                );
            }
        };

        getData();
    }, [token]);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.Primary_Helper }}>
            {loading ? (
                <CustomeActivityIndicator />
            ) : (
                <View style={styles.container}>
                    <Header />
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <TopDeals />
                        <Services serviceItem={serviceItem} />
                        <Offers />
                    </ScrollView>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BackGroundGray,
    },
});
