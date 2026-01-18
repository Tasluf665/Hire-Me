import { Stack } from "expo-router";
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

    if (token && !inTabsGroup) {
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
      <Stack.Screen name="(Account)" />
    </Stack>
  );
}

export default function Layout() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <AppContent />
      </PaperProvider>
    </Provider>
  );
}
