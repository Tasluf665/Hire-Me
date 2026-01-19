import { Stack } from "expo-router";

export default () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="DeliveryAddressScreen" />
            <Stack.Screen name="AddNewAddressScreen" />
            <Stack.Screen name="HistoryScreen" />
            <Stack.Screen name="MyDetailsScreen" />
            <Stack.Screen name="RegionScreen" />
            <Stack.Screen name="CityScreen" />
            <Stack.Screen name="AreaScreen" />
        </Stack>
    );
};