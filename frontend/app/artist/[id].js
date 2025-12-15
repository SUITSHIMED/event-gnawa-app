import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Image, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useArtistDetail } from '../../src/services/artistService';
import { useState } from 'react';
import Placeholder from '../../assets/images/partial-react-logo.png';
export default function ArtistDetailScreen() {
  const { id } = useLocalSearchParams(); 
  const router = useRouter();

  const { data: artist, isLoading, isError } = useArtistDetail(id);

  if (isLoading) return <ActivityIndicator size="large" style={styles.center} />;

  if (isError || !artist) {
    return <Text style={styles.centerText}>Artist details not found or failed to load.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Button title="Back" onPress={() => router.back()} />

      {artist.photo_url ? (
        <ArtistImage uri={artist.photo_url} />
      ) : (
        <Image source={Placeholder} style={styles.photo} resizeMode="cover" />
      )}

      <Text style={styles.name}>{artist.name}</Text>
      <Text style={styles.schedule}>Performing: {artist.schedule}</Text>
      <View style={styles.separator} />
      <Text style={styles.bioTitle}>Biography</Text>
      <Text style={styles.bioText}>{artist.bio}</Text>
    </ScrollView>
  );
}

function ArtistImage({ uri }) {
  const [failed, setFailed] = useState(false);
  const source = !failed && uri ? { uri } : Placeholder;
  return <Image source={source} style={styles.photo} resizeMode="cover" onError={() => setFailed(true)} />;
}
const styles = StyleSheet.create({
 
  container: { 
    flex: 1, 
    backgroundColor: '#121212'
  },
  contentContainer: {
    paddingBottom: 40,
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#121212'
  },
  
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: '600',
  },

  photoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 100, 
    borderWidth: 4,
    borderColor: '#007BFF', 
    backgroundColor: '#333', 
  },
  
  detailCard: {
    paddingHorizontal: 20,
  },
  name: { 
    fontSize: 34, 
    fontWeight: '800', 
    color: '#FFFFFF', 
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 10,
  },
  schedule: { 
    fontSize: 18, 
    color: '#007BFF', 
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 20, 
  },
  separator: { 
    height: 1, 
    backgroundColor: '#333333', 
    marginVertical: 20, 
  },
  bioTitle: { 
    fontSize: 22, 
    fontWeight: '700', 
    marginBottom: 10,
    color: '#E0E0E0', 
  },
  bioText: { 
    fontSize: 16, 
    lineHeight: 24, 
    color: '#CCCCCC' 
  },
  
  
  errorText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6347',
    marginTop: 50,
  },
});