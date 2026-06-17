import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

/** The Office — the mobile home hub (mirrors the web /home). */
export default function Office() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>The Office</Text>
      <Text style={styles.subtitle}>What does the work require of you today?</Text>

      <View style={styles.links}>
        <Link href="/library" style={styles.link}>
          Library →
        </Link>
        <Link href="/signin" style={styles.link}>
          Sign in →
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12, padding: 24 },
  title: { color: "#f4f4f5", fontSize: 30, fontWeight: "700" },
  subtitle: { color: "#a1a1aa", fontSize: 15, textAlign: "center" },
  links: { marginTop: 24, gap: 16, alignItems: "center" },
  link: { color: "#c4b5fd", fontSize: 18 },
});
