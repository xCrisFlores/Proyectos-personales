import * as SecureStore from 'expo-secure-store'
import { createClient } from '@supabase/supabase-js'

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key)
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value)
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key)
  },
}

//modifica estas constantes apra conectar tu base de pruebas
const supabaseUrl = 'https://nqgrfuydjbdkbvdjurxk.supabase.co';
//esta constante tambien
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xZ3JmdXlkamJka2J2ZGp1cnhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ2Njk5MzMsImV4cCI6MjAzMDI0NTkzM30.yXSPvDsNy2XUHyQ9DJQKhOt19veNHS2JRrdKHM38uV0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: ExpoSecureStoreAdapter as any,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  })