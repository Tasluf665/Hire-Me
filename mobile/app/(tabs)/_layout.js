import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../Constant/Colors";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: Colors.Primary, headerShown: false }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: "Cart",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="cart" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="person" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
