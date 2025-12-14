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
      padding: 20, 
      backgroundColor: '#fff' 
    },
    center: { 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center' 
    },
    errorText: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
      color: 'red',
      marginTop: 50,
    },
    backButtonContainer: {
        marginBottom: 20,
        alignSelf: 'flex-start',
    },
    photo: {
        width: '100%',
        height: 250,
        borderRadius: 10,
        marginBottom: 15,
    },
    photoPlaceholder: {
        width: '100%',
        height: 250,
        backgroundColor: '#eee',
        borderRadius: 10,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    photoPlaceholderText: {
        color: '#999',
        fontSize: 16,
    },
    name: { 
      fontSize: 32, 
      fontWeight: 'bold', 
      color: '#333', 
      marginBottom: 5 
    },
    schedule: { 
      fontSize: 18, 
      color: '#666', 
      marginBottom: 20 
    },
    separator: { 
      height: 1, 
      backgroundColor: '#eee', 
      marginBottom: 20 
    },
    bioTitle: { 
      fontSize: 20, 
      fontWeight: 'bold', 
      marginTop: 5, 
      marginBottom: 10,
      color: '#333',
    },
    bioText: { 
      fontSize: 16, 
      lineHeight: 24, 
      color: '#555'
    },
});