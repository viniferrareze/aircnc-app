import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Alert, Image, AsyncStorage, ScrollView} from 'react-native';
import socketio from 'socket.io-client';

import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';

export default function List(){
   const [techs, setTechs] = useState([]);

   useEffect(() => {
      AsyncStorage.getItem('user').then(user_id => {
         const socket = socketio('http://192.168.1.15:3333', {
            query: {user_id}
         });

         socket.on('booking_response', booking => {
            Alert.alert(`Sua Reserva em ${booking.spot.company} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'} `)
         });
      });
   }, []);

   useEffect(() => {
      AsyncStorage.getItem('techs').then(storageTech => {
         const techArray = storageTech.split(',').map(tech => tech.trim());

         setTechs(techArray);
      });
   }, []);

   return (
      <SafeAreaView style={styles.container}>
         <Image style={styles.logo} source={logo} />

         <ScrollView>
            {techs.map(tech => <SpotList key={tech} tech={tech}></SpotList>)}
         </ScrollView>
         
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1
   },

   logo: {
      height: 32,
      resizeMode: "contain",
      alignSelf: "center",
      marginTop: 10
   }
});