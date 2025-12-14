import { View, Text, Button, ScrollView, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useEventInfo } from "../src/services/eventService";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const { data, isLoading, isError, error } = useEventInfo();
  const router = useRouter();

  if (isLoading) {
    return <ActivityIndicator size="large" style={styles.center} />;
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: Failed to load event details.</Text>
        <Text style={styles.errorTextDetail}>Check server connection.</Text>
        <Text style={styles.errorTextDetail}>{error?.message || JSON.stringify(error)}</Text>
      </View>
    );
  }

  const event = data && data.length > 0 ? data[0] : null;
  if (!event) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Event data not found in database.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {event.banner_url ? <Image source={{ uri: event.banner_url }} style={styles.banner} /> : null}

      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.meta}>{new Date(event.date).toLocaleDateString()} • {event.venue}</Text>
      <Text style={styles.description}>{event.description}</Text>
      
      <View style={styles.spacer} />

      <TouchableOpacity style={styles.buttonPrimary} onPress={() => router.push("/artists")}> 
        <Text style={styles.buttonText}>View Artists</Text>
      </TouchableOpacity>
      
      <View style={styles.spacer} />

      <TouchableOpacity style={styles.buttonSecondary} onPress={() => router.push("/booking")}> 
        <Text style={styles.buttonTextSecondary}>Book Tickets</Text>
      </TouchableOpacity>

      <View style={styles.spacer} />

      <TouchableOpacity style={styles.buttonGhost} onPress={() => router.push("/my-bookings")}> 
        <Text style={styles.buttonTextGhost}>My Bookings</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  spacer: {
    height: 15, 
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
  errorTextDetail: {
    fontSize: 14,
    color: '#888',
  }
  ,
  banner: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: '#eee'
  },
  meta: {
    color: '#666',
    marginBottom: 10
  },
  buttonPrimary: {
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonSecondary: {
    backgroundColor: '#28a745',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonGhost: {
    borderWidth: 1,
    borderColor: '#6f42c1',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: { color: '#fff', fontWeight: '600' },
  buttonTextSecondary: { color: '#fff', fontWeight: '600' },
  buttonTextGhost: { color: '#6f42c1', fontWeight: '600' }
});