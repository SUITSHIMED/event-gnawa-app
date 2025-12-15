import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Gnawa Festival Home' }} />
        <Stack.Screen name="artists" options={{ title: 'Festival Lineup' }} />
        <Stack.Screen name="artist/[id]" options={{ title: 'Artist Details' }} />
        <Stack.Screen name="booking" options={{ title: 'Reserve Your Spot' }} />
        <Stack.Screen name="my-bookings" options={{ title: 'My Reservations' }} />
      </Stack>
    </QueryClientProvider>
  );
}