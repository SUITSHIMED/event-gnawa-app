import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from "react-native";
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

  let event = null;
  if (data) {
    if (Array.isArray(data)) {
      event = data.length > 0 ? data[0] : null;
    } else if (typeof data === 'object') {
      event = data;
    }
  }
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
    flex: 1,
    backgroundColor: '#121212', 
  },
  contentContainer: {
    paddingHorizontal: 20, 
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  spacer: {
    height: 16, 
  },
  
  
  banner: {
    width: '100%',
    height: 250, 
    marginBottom: 20, 
    backgroundColor: '#282828', 
  },

  
  title: {
    fontSize: 32, 
    fontWeight: '800', 
    color: '#E0E0E0', 
    marginBottom: 8,
  },
  meta: {
    fontSize: 14,
    color: '#BBBBBB', 
    marginBottom: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#CCCCCC', 
    lineHeight: 24,
    marginBottom: 20,
  },

 
  buttonPrimary: {
    marginHorizontal: 20,
    backgroundColor: '#00BFFF', 
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonSecondary: {
    marginHorizontal: 20,
    backgroundColor: '#FF4500',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonGhost: {
    marginHorizontal: 20,
    borderWidth: 2,
    borderColor: '#6F42C1', 
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { 
    color: '#ffffffff', 
    fontSize: 18,
    fontWeight: '900' 
  },
  buttonTextSecondary: { 
    color: '#FFFFFF', 
    fontSize: 18,
    fontWeight: '700' 
  },
  buttonTextGhost: { 
    color: '#E0E0E0', 
    fontSize: 18,
    fontWeight: '700' 
  },
  
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6347', 
    textAlign: 'center',
  },
  errorTextDetail: {
    fontSize: 14,
    color: '#AAAAAA',
    textAlign: 'center',
  }
});