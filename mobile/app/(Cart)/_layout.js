import { Stack } from "expo-router";

export default () => {
    return (
        <Stack screenOptions={{ headerTitle: "Order" }}>
            <Stack.Screen name="OrderTrackMainScreen" />
            <Stack.Screen name="PaymentMainScreen" />
            <Stack.Screen name="SSLCOMMERZ_Web_View" options={{ headerShown: false }} />
        </Stack>
    );
};