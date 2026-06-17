import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { api, ApiError } from "@sigilife/api-client";

/** Minimal shape we render from GET /api/sigils (it returns more fields). */
type SigilListItem = { id: string; name: string };

/**
 * Library — the viewer's sigils, read over the shared API client. Proves the
 * end-to-end path: RN app → @sigilife/api-client → /api/sigils → Postgres.
 * (Until native sign-in lands, this rides the dev-identity fallback like web.)
 */
export default function Library() {
  const [sigils, setSigils] = useState<SigilListItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<SigilListItem[]>("/api/sigils?scope=mine&status=active")
      .then(setSigils)
      .catch((e: unknown) =>
        setError(e instanceof ApiError ? e.message : "Could not reach the Office."),
      );
  }, []);

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (!sigils) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#c4b5fd" />
      </View>
    );
  }

  if (sigils.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>No sigils yet. Craft your first on the web app.</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={sigils}
      keyExtractor={(s) => s.id}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Text style={styles.name}>{item.name}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  list: { flex: 1, padding: 16 },
  row: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#27272a" },
  name: { color: "#f4f4f5", fontSize: 16 },
  empty: { color: "#71717a", fontSize: 15, textAlign: "center" },
  error: { color: "#f87171", fontSize: 15, textAlign: "center" },
});
