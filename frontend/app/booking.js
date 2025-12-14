import { 
  View, Text, TextInput, StyleSheet, ScrollView, 
  Alert, TouchableOpacity, ActivityIndicator 
} from 'react-native';
import { Checkbox } from 'expo-checkbox'; 
import { useCreateBooking } from '../src/services/bookingService'; 
import { useQueryClient } from '@tanstack/react-query';
import { useBookingStore } from '../src/stores/bookingStore';

console.log('[store] useBookingStore (imported):', typeof useBookingStore, useBookingStore ? Object.keys(useBookingStore) : useBookingStore);

export default function BookingScreen() {
  const queryClient = useQueryClient();
  const createBookingMutation = useCreateBooking();
  
  const { fullName, email, seats, terms, setFullName, setEmail, setSeats, setTerms, reset } = useBookingStore();

  const validateForm = () => {
    if (!fullName || !email || seats < 1 || seats > 10) {
      Alert.alert("Invalid Input", "Please provide a valid name, email, and between 1-10 seats.");
      return false;
    }
    if (!terms) {
      Alert.alert("Agreement Required", "You must agree to the terms and conditions.");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const payload = {
      full_name: fullName,
      email: email,
      seats: seats,
      artist_id: '29c35f6a-55ff-4805-b3b9-3d3c682a5625', // Hardcoded for demo
      event_date: '2026-06-15',
      phone: '0000000000',
    };

    createBookingMutation.mutate(payload, {
      onSuccess: (data) => {
        Alert.alert(
          "Success!",
          `Booking confirmed! Code: ${data.code}`,
          [{ 
            text: "OK", 
            onPress: () => {
              queryClient.invalidateQueries({ queryKey: ['bookings'] });
              reset(); 
            }
          }]
        );
      },
      onError: (error) => {
        Alert.alert("Error", "Could not complete your booking.");
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Reserve Your Spot</Text>
      <Text style={styles.subtitle}>Secure your tickets for the Gnawa World Festival.</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
        placeholder="Enter your full name"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="Enter your email address"
      />

      <Text style={styles.label}>Number of Seats (1-10)</Text>
      <TextInput
        style={styles.input}
        value={String(seats)}
        onChangeText={(text) => {
          const num = parseInt(text.replace(/[^0-9]/g, '')) || 1;
          if (num >= 1 && num <= 10) setSeats(num);
        }}
        keyboardType="numeric"
        placeholder="Minimum 1"
      />

      <View style={styles.checkboxContainer}>
        <Checkbox
          value={terms}
          onValueChange={setTerms}
          color={terms ? '#007BFF' : undefined}
        />
        <TouchableOpacity onPress={() => setTerms(!terms)}>
          <Text style={styles.checkboxLabel}>I agree to the terms and conditions.</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={[styles.cta, !terms && styles.ctaDisabled]}
          onPress={handleSubmit}
          disabled={createBookingMutation.isPending || !terms}
        >
          <Text style={styles.ctaText}>{createBookingMutation.isPending ? 'Booking...' : 'Confirm Booking'}</Text>
        </TouchableOpacity>
        {createBookingMutation.isPending && <ActivityIndicator size="small" color="#fff" style={{marginTop:8}} />}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f9f9f9' 
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