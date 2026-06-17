import { Stack } from "expo-router";
import "@/lib/config"; // configure the shared API client before any screen fetches

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#09090b" },
        headerTintColor: "#f4f4f5",
        headerTitleStyle: { fontWeight: "600" },
        contentStyle: { backgroundColor: "#09090b" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "The Office" }} />
      <Stack.Screen name="library" options={{ title: "Library" }} />
      <Stack.Screen name="signin" options={{ title: "Sign in" }} />
    </Stack>
  );
}
