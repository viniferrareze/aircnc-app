import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Image, AsyncStorage, ScrollView} from 'react-native';

import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';

export default function List(){
   const [techs, setTechs] = useState([]);

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