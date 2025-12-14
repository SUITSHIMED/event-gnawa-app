import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Image } from "react-native";
import { useState } from 'react';
import Placeholder from '../assets/images/partial-react-logo.png';
import { useArtists } from "../src/services/artistService"; 
import { useRouter } from "expo-router";

export default function ArtistsListScreen() {
  const { data: artists, isLoading, isError, refetch, isFetching } = useArtists();
  const router = useRouter();

  if (isLoading) return <ActivityIndicator size="large" style={styles.center} />;
  
  if (isError || !artists) {
    return <Text style={styles.centerText}>Error loading artists.</Text>;
  }

  const placeholder = Placeholder;

  function ArtistRow({ item }) {
    const [failed, setFailed] = useState(false);
    const source = !failed && item.photo_url ? { uri: item.photo_url } : placeholder;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => router.push(`/artist/${item.id}`)}
      >
        <Image source={source} style={styles.avatar} resizeMode="cover" onError={() => setFailed(true)} />
        <View style={styles.meta}>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.scheduleText}>{item.schedule}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={artists}
      keyExtractor={(item) => item.id.toString()}
      onRefresh={refetch}
      refreshing={isFetching}
      renderItem={({ item }) => <ArtistRow item={item} />}
    />
  );
}
const styles = StyleSheet.create({
  list: { padding: 12 },
  itemContainer: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#fff', marginBottom: 10, borderRadius: 8, elevation: 2 },
  avatar: { width: 64, height: 64, borderRadius: 8, marginRight: 12, backgroundColor: '#eee' },
  meta: { flex: 1 },
  nameText: { fontSize: 18, fontWeight: '600' },
  scheduleText: { color: '#666', marginTop: 4 }
});