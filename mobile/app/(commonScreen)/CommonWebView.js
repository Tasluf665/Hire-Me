import React from "react";
import { WebView } from "react-native-webview";
import { ScaledSheet } from "react-native-size-matters";
import { API_URL } from "@env"

export default function CommonWebView() {
    const targetUrl = `${API_URL}/WebView/offer.html`;

    return (
        <WebView style={styles.container} source={{ uri: targetUrl }} />
    );
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
});
