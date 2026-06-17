import { StyleSheet, Text, View } from "react-native";

/**
 * Sign in — scaffold. The native flow (to wire next): on-device Google sign-in
 * → POST the Google ID token to /api/auth/mobile → store the returned Bearer
 * JWT (expo-secure-store) → set it on @sigilife/api-client via getAuthHeader.
 *
 * Blocked on: iOS/Android OAuth client IDs (GOOGLE_IOS_CLIENT_ID /
 * GOOGLE_ANDROID_CLIENT_ID) + a device or simulator. Until then the app rides
 * the dev-identity fallback, same as the web app while AUTH_ENFORCED is off.
 */
export default function SignIn() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Sign in with Google</Text>
      <Text style={styles.body}>
        Native sign-in is scaffolded but not yet wired — it needs the iOS/Android
        OAuth client IDs and a device. For now the app reads data as the dev agent.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: "center", justifyContent: "center", gap: 14, padding: 28 },
  title: { color: "#f4f4f5", fontSize: 22, fontWeight: "600" },
  body: { color: "#a1a1aa", fontSize: 14, textAlign: "center", lineHeight: 20 },
});
