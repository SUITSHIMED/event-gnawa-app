import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useQueryClient } from "@tanstack/react-query";

import { useCreateBooking } from "../src/services/bookingService";
import { useBookingStore } from "../src/stores/bookingStore";

export default function BookingScreen() {
  const queryClient = useQueryClient();
  const createBooking = useCreateBooking();

  const {
    fullName,
    email,
    seats,
    terms,
    setFullName,
    setEmail,
    setSeats,
    setTerms,
    reset,
  } = useBookingStore();

  
  const isValid = () => {
    if (!fullName || !email || seats < 1 || seats > 10) {
      Alert.alert("Invalid form", "Please fill all fields correctly");
      return false;
    }
    if (!terms) {
      Alert.alert("Terms required", "Please accept terms and conditions");
      return false;
    }
    return true;
  };

  const handleBooking = () => {
    if (!isValid()) return;

    createBooking.mutate(
      {
        full_name: fullName,
        email,
        seats,
        artist_id: undefined, // Backend will pick the first available artist
        event_date: "2026-06-15",
        phone: "0000000000",
      },
      {
        onSuccess: (data) => {
          Alert.alert(
            "Booking confirmed",
            `Your code: ${data.code}`,
            [{ text: "OK", onPress: reset }]
          );
          queryClient.invalidateQueries({ queryKey: ["bookings"] });
        },
        onError: () => {
          Alert.alert("Error", "Booking failed");
        },
      }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Reserve Your Spot</Text>
      <Text style={styles.subtitle}>
        reserve your tickets for the Gnawa World Festival
      </Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
        placeholder="Your name"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="email@example.com"
      />

      <Text style={styles.label}>Number of Seats (1–10)</Text>
      <TextInput
        style={styles.input}
        value={String(seats)}
        keyboardType="numeric"
        onChangeText={(v) => setSeats(Number(v) || 1)}
      />

      <View style={styles.checkboxContainer}>
        <Checkbox value={terms} onValueChange={setTerms} />
        <Text style={styles.checkboxLabel}>
          I agree to the terms and conditions
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.cta, (!terms || createBooking.isPending) && styles.ctaDisabled]}
        onPress={handleBooking}
        disabled={!terms || createBooking.isPending}
      >
        {createBooking.isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.ctaText}>Confirm Booking</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#c9c8c8ff' 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 5 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#666', 
    marginBottom: 30 
  },
  label: { 
    fontSize: 16, 
    fontWeight: '600', 
    marginTop: 15, 
    marginBottom: 5 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ddd', 
    padding: 12, 
    borderRadius: 8, 
    fontSize: 16, 
    backgroundColor: '#fff' 
  },
  checkboxContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 20 
  },
  checkboxLabel: { 
    marginLeft: 8, 
    fontSize: 15, 
    color: '#333' 
  },
  buttonWrapper: { 
    marginTop: 30 
  },
  cta: {
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center'
  },
  ctaDisabled: {
    opacity: 0.6
  },
  ctaText: {
    color: '#fff',
    fontWeight: '700'
  }
});