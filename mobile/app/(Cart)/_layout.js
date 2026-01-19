import { Stack } from "expo-router";

export default () => {
    return (
        <Stack screenOptions={{ headerTitle: "Order" }}>
            <Stack.Screen name="OrderTrackMainScreen" />
        </Stack>
    );
};