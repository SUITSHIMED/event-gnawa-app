import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

const store = (set) => ({
  fullName: "",
  email: "",
  seats: 1,
  terms: false,
  
  setFullName: (fullName) => set({ fullName }),
  setEmail: (email) => set({ email }),
  setSeats: (seats) => set({ seats }),
  setTerms: (terms) => set({ terms }),
  
  reset: () => set({ fullName: "", email: "", seats: 1, terms: false }),
  
});

export const useBookingStore = create(
  persist(
    store,
    {
      name: "booking_form_storage", 
      storage: createJSONStorage(() => AsyncStorage), 
      partialize: (state) => ({ 
        fullName: state.fullName, 
        email: state.email, 
        seats: state.seats 
      }), 
    }
  )
);

export default useBookingStore;