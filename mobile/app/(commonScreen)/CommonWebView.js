import React from "react";
import { WebView } from "react-native-webview";
import { ScaledSheet } from "react-native-size-matters";

import { useLocalSearchParams } from "expo-router";

export default function CommonWebView() {
    const { url } = useLocalSearchParams();

    return (
        <WebView style={styles.container} source={{ uri: url }} />
    );
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
});
