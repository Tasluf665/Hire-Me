import { View } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import { ScaledSheet } from "react-native-size-matters";
import { router, useLocalSearchParams } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrder } from "../../store/orderSlice";
import { API_URL } from "@env"

import CustomeActivityIndicator from "../../Components/CustomeActivityIndicator";

export default function SSLCOMMERZ_Web_View() {
  const { orderId } = useLocalSearchParams();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [gatewayPageUrl, setGateWayPageUrl] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/payments/${orderId}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
          }
        );

        const result = await response.json();
        setGateWayPageUrl(result.data);
      } catch (ex) {
        console.log(
          "🚀 ~ file: SSLCOMMERZ_Web_View.js ~ line 36 ~ fetchData ~ ex",
          ex
        );
      }
    };
    fetchData();
  }, []);

  const handleWebViewNavigationStateChange = (newNavState) => {
    const { url } = newNavState;
    console.log(newNavState);
    if (!url) return;

    if (url.includes("/api/payments")) {
      if (url.includes("/api/payments/paymentSuccess")) {
        dispatch(fetchOrder());
      }
      setTimeout(() => {
        router.navigate("cart");
      }, 5000);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {gatewayPageUrl ? (
        <WebView
          style={styles.container}
          source={{
            uri: gatewayPageUrl,
          }}
          onNavigationStateChange={handleWebViewNavigationStateChange}
        />
      ) : (
        <CustomeActivityIndicator />
      )}
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    width: "100%",
    height: "90%",
  },
});
