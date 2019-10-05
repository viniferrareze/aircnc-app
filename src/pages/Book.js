import React, { useState } from 'react';
import { View, Alert, AsyncStorage, StyleSheet, Text, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';

import api from '../services/api';

export default function Book({ navigation }) {
   const id = navigation.getParam('id');
   const [date, setDate] = useState('');

   async function reserva(){
      const user_id = await AsyncStorage.getItem('user');

      await api.post(`/spots/${id}/bookings`, {
         date
      }, {
         headers: {user_id}
      });

      Alert.alert('Solicitação de reserva enviada!');
      navigation.navigate('List');
   }

   function cancelar(){
      navigation.navigate('List');
   }

   return (
      <SafeAreaView style={styles.container}>
         <Text style={styles.label}>DATA DE INTERESSE *</Text>
         <TextInput
            style={styles.input}
            placeholder="Qual data você quer reservar?"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="words"
            autoCorrect={false}
            value={date}
            onChangeText={setDate}
         />

         <TouchableOpacity onPress={reserva} style={styles.button}>
            <Text style={styles.buttonText}>Solicitar Reserva</Text>
         </TouchableOpacity>

         <TouchableOpacity onPress={cancelar} style={[styles.button, styles.cancelButton]}>
            <Text style={styles.buttonText}>Cancelar Reserva</Text>
         </TouchableOpacity>
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container: {
      margin: 30
   },

   label: {
      fontWeight: 'bold',
      color: '#444',
      marginBottom: 8,
      marginTop: 20
   },

   input: {
      borderWidth: 1,
      borderColor: '#ddd',
      paddingHorizontal: 20,
      fontSize: 16,
      color: '#444',
      marginBottom: 20,
      borderRadius: 2,
   },

   button: {
      height: 42,
      backgroundColor: '#f05a5b',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 2,
   },

   cancelButton: {
      backgroundColor: '#ccc',
      marginTop: 10,
   },

   buttonText: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 16,

   }
});