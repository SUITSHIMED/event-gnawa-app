import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { useBookingByCode, useBookings } from '../src/services/bookingService'; 

export default function BookingLookupScreen() {
    const [code, setCode] = useState('');
    const [hasSearched, setHasSearched] = useState(false);
    const [email, setEmail] = useState('');

    const { data: booking, isFetching, refetch, isError, error } = useBookingByCode(code); 
    const { data: bookingsByEmail, isFetching: loadingByEmail, refetch: refetchByEmail } = useBookings(email);

    const handleLookup = async () => {
        if (!code) return;
        setHasSearched(true); 
        await refetch();
    };

    const handleLookupByEmail = async () => {
        if (!email) return;
        await refetchByEmail();
    }

    const showNotFound = hasSearched && !isFetching && !booking && !isError;
    
    return (
            <FlatList
                contentContainerStyle={styles.container}
                data={bookingsByEmail || []}
                keyExtractor={(it) => String(it.id)}
                ListHeaderComponent={() => (
                    <View>
                        <Text style={styles.title}>My Reservations</Text>
                        <Text style={styles.subtitle}>Lookup by code or view all bookings for your email</Text>

                        <TextInput style={styles.input} placeholder="Enter Confirmation Code" value={code} onChangeText={(text) => setCode(text.toUpperCase())} autoCapitalize="characters" maxLength={6} />

                        <View style={styles.buttonContainer}>
                            <Button title={isFetching ? "Searching..." : "Lookup Booking"} onPress={handleLookup} disabled={isFetching || !code} color="#007BFF" />
                        </View>

                        <View style={styles.separator} />

                        <Text style={styles.subtitle}>Or view all bookings for your email</Text>
                        <TextInput style={styles.input} placeholder="Enter your email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
                        <View style={styles.buttonContainer}>
                            <Button title={loadingByEmail ? "Loading..." : "Show My Bookings"} onPress={handleLookupByEmail} disabled={loadingByEmail || !email} color="#28a745" />
                        </View>

                        {isFetching && <ActivityIndicator size="large" style={{marginTop:12}} />}

                        {booking && (
                            <View style={styles.card}>
                                <Text style={styles.cardTitle}>CONFIRMED RESERVATION</Text>
                                <Text>Code: {booking.code}</Text>
                                <Text>Name: {booking.full_name}</Text>
                                <Text>Seats: {booking.seats}</Text>
                            </View>
                        )}

                        <View style={{ height: 12 }} />
                        <Text style={styles.sectionTitle}>Your Bookings</Text>

                        {showNotFound && <Text style={styles.notFoundText}>No reservation found.</Text>}
                        {isError && error.response?.status !== 404 && <Text style={styles.notFoundText}>Connection Error. Try again.</Text>}
                    </View>
                )}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>{item.code}</Text>
                        <Text>{item.full_name} — {item.seats} seats</Text>
                        <Text>{item.event_date}</Text>
                    </View>
                )}
                ListEmptyComponent={() => (!loadingByEmail ? <Text style={styles.notFoundText}>No bookings found.</Text> : null)}
            />
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
    subtitle: { fontSize: 16, color: '#666', marginTop: 12, marginBottom: 8 },
    input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, backgroundColor: '#fff' },
    buttonContainer: { marginTop: 10 },
    card: { padding: 12, borderRadius: 8, backgroundColor: '#f7f7f7', marginTop: 12 },
    cardTitle: { fontWeight: '700', marginBottom: 6 },
    notFoundText: { marginTop: 12, color: '#999' },
    sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 }
});