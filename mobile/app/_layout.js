import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { PaperProvider } from "react-native-paper";
import { store } from "../store";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSegments } from "expo-router";
import { tryAutoLogin } from "../store/authSlice";

function AppContent() {
  const { token, didTryAutoLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    dispatch(tryAutoLogin());
  }, [dispatch]);

  useEffect(() => {
    if (!didTryAutoLogin) return;

    const inAuthGroup = segments[0] === "(Authentication)";
    const inTabsGroup = segments[0] === "(tabs)";
    const inCommonGroup = segments[0] === "(commonScreen)";
    const inProfileGroup = segments[0] === "(Profile)";
    const inHomeGroup = segments[0] === "(Home)";
    const inCartGroup = segments[0] === "(Cart)";

    if (token && !inTabsGroup && !inCommonGroup && !inProfileGroup && !inHomeGroup && !inCartGroup) {
      router.replace("/(tabs)");
    } else if (!token && !inAuthGroup) {
      router.replace("/(Authentication)/WelcomeScreen");
    }
  }, [token, didTryAutoLogin, segments]);

  if (!didTryAutoLogin) {
    return null; // Or a loading spinner
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(Authentication)" />
      <Stack.Screen name="(commonScreen)" />
      <Stack.Screen name="(Profile)" />
      <Stack.Screen name="(Home)" />
      <Stack.Screen name="(Cart)" />
    </Stack>
  );
}

export default function Layout() {
  const [fontsLoaded] = useFonts({
    "RobotoSlab_Bold": require("../assets/fonts/RobotoSlab-Bold.ttf"),
    "RobotoSlab_Light": require("../assets/fonts/RobotoSlab-Light.ttf"),
    "RobotoSlab_Regular": require("../assets/fonts/RobotoSlab-Regular.ttf"),
    "RobotoSlab_SemiBold": require("../assets/fonts/RobotoSlab-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PaperProvider>
        <AppContent />
      </PaperProvider>
    </Provider>
  );
}
