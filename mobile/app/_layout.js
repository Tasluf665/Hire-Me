import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../store";


import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { tryAutoLogin } from "../store/authSlice";

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tryAutoLogin());
  }, [dispatch]);

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
      <AppContent />
    </Provider>
  );
}
