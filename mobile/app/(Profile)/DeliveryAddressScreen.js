import { View, StyleSheet, StatusBar, FlatList } from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";

import CustomeTopBar from "../../Components/DeliveryAddressScreen/CustomeTopBar";
import TopAddAddressButton from "../../Components/DeliveryAddressScreen/TopAddAddressButton";
import Colors from "../../Constant/Colors";

import { fetchUser } from "../../store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { authRefreshToken } from "../../store/authSlice";

import CustomeActivityIndicator from "../../Components/CustomeActivityIndicator";
import AddressCutomeItem from "../../Components/DeliveryAddressScreen/AddressCutomeItem";

export default function DeliveryAddressScreen(props) {
    let address = useSelector((state) => state.user.address);
    let defaultAddress = useSelector((state) => state.user.defaultAddress);

    const dispatch = useDispatch();

    let userLoading = useSelector((state) => state.user.userLoading);
    let userError = useSelector((state) => state.user.userError);
    const refresh_token = useSelector((state) => state.auth.refresh_token);

    useEffect(() => {
        if (userError) {
            dispatch(authRefreshToken(refresh_token));
            dispatch(fetchUser());
        }
    }, [userError]);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    const renderItem = ({ item }) => (
        <AddressCutomeItem
            item={item}
            defaultAddress={defaultAddress}
        />
    );

    return (
        <View style={styles.container}>
            {userLoading ? (
                <CustomeActivityIndicator />
            ) : (
                <>
                    <StatusBar backgroundColor={Colors.White} />
                    <CustomeTopBar title="Address" handleBack={() => router.replace("profile")} />
                    <View style={styles.buttonContainer}>
                        <TopAddAddressButton
                            onPress={() => router.push("/AddNewAddressScreen")}
                        />
                        <FlatList
                            keyExtractor={(item) => item._id}
                            data={address}
                            renderItem={renderItem}
                            contentContainerStyle={{ paddingBottom: 20 }}
                        />
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    buttonContainer: {
        flex: 1,
    },
});
