import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from './firebase'
import { Ionicons } from '@expo/vector-icons';
import Orderproduct from './Orderproduct';
import { useNavigation } from '@react-navigation/native';

const AdminOrders = () => {
   
    const [search,setsearch]=useState('')
    const [items,setitems]=useState([])
    const navigate=useNavigation()
    useEffect(() => {
        const database = collection(db, 'neworderss');
        const q= query(database, orderBy('orderat', 'desc'), where('email', '==', search));
        onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setitems(data)
        });
    }, [search])
  return (
    <SafeAreaView style={{marginBottom:160}}>
    <View style={{ padding: 10, marginTop: 30, flexDirection: 'row' }}>
        <Ionicons onPress={() => navigate.goBack()} name="arrow-back-sharp" size={24} color="black" />
        <Text style={{ padding: 4, fontWeight: 'bold' }}>Home</Text>
    </View>
    <ScrollView style={{ padding: 10 }}>
        <TextInput style={{borderColor:'gray',borderWidth:1,borderRadius:10}} onChangeText={(text)=>setsearch(text)}/>
                {items.map((item,index)=>(<Orderproduct item={item} key={index}/>))}
                
            </ScrollView>
    <Text style={{ textAlign: 'center',fontWeight:'bold',fontSize:20,padding:10 }}>Thank You!!</Text>

</SafeAreaView>
  )
}

export default AdminOrders

const styles = StyleSheet.create({
    text:{
        borderColor:'gray',
        borderWidth:0.8,
        borderRadius:10
    }
})