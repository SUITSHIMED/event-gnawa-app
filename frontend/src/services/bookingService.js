import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "./api";

export const useBookings = (email) => useQuery({
    queryKey: ["bookings", email], 
    queryFn: async () => (await api.get(`/bookings/email/${encodeURIComponent(email)}`)).data, 
    enabled: !!email
});

export const useBookingByCode = (code) => useQuery({
    queryKey: ["booking", code],
    queryFn: async () => (await api.get(`/bookings/code/${encodeURIComponent(code)}`)).data,
    enabled: !!code
});

export const useCreateBooking = () => useMutation({
    mutationFn: (bookingData) => api.post("/bookings", bookingData).then(res => res.data)
});