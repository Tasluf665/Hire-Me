import { Stack } from "expo-router";

export default () => {
  return (
    <Stack
      initialRouteName="WelcomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="WelcomeScreen" />
      <Stack.Screen name="SplashScreen" />
      <Stack.Screen name="SignInScreen" />
      <Stack.Screen name="SignUpScreen" />
    </Stack>
  );
};
