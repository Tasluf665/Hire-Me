import React from "react";
import { ScrollView, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import OffersCard from "./OffersCard";
import OfferItems from "../../Constant/OfferItems";
import HomeText from "./HomeText";
import { router } from "expo-router";
import { API_URL } from "@env";

const Offers = (props) => {
    return (
        <View>
            <HomeText>Offers</HomeText>
            <View style={styles.flatListContainer}>
                <ScrollView>
                    <View style={{ alignItems: "center" }}>
                        {OfferItems.map((item) => (
                            <OffersCard
                                onPress={() => {
                                    const targetUrl = `${API_URL}/WebView/offer.html`;
                                    router.push({ pathname: "CommonWebView", params: { url: targetUrl } });
                                }}
                                imageName={item.imageName}
                                titleText={item.titleText}
                                mainText={item.mainText}
                                uptoText={item.uptoText}
                                key={item.key}
                            />
                        ))}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = ScaledSheet.create({
    flatListContainer: {
        paddingVertical: "10@vs",
    },
});

export default Offers;
