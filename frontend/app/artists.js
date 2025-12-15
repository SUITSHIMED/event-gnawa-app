import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useArtists } from "../src/services/artistService";
import Placeholder from "../assets/images/partial-react-logo.png";

export default function ArtistsListScreen() {
  const router = useRouter();
  const { data: artists, isLoading, isError, refetch, isFetching } = useArtists();

  // 1️⃣ Loading
  if (isLoading) {
    return <ActivityIndicator size="large" style={styles.center} />;
  }

  // 2️⃣ Error
  if (isError || !artists) {
    return <Text style={styles.errorText}>Error loading artists</Text>;
  }

  // 3️⃣ One artist card
  const renderArtist = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => router.push(`/artist/${item.id}`)}
    >
      <Image
        source={item.photo_url ? { uri: item.photo_url } : Placeholder}
        style={styles.avatar}
      />

      <View style={styles.meta}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.scheduleText}>{item.schedule}</Text>
      </View>
    </TouchableOpacity>
  );

  // 4️⃣ List
  return (
    <FlatList
      data={artists}
      keyExtractor={(item) => item.id}
      renderItem={renderArtist}
      contentContainerStyle={styles.list}
      onRefresh={refetch}
      refreshing={isFetching}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  list: {
    padding: 16,
  },

  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    padding: 14,
    marginBottom: 12,
    borderRadius: 12,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 15,
    backgroundColor: "#333",
  },

  meta: {
    flex: 1,
  },

  nameText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFF",
  },

  scheduleText: {
    marginTop: 4,
    fontSize: 14,
    color: "#BBB",
  },

  errorText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
    color: "red",
  },
});
