import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { auth, db } from './firebase'
import { Ionicons } from '@expo/vector-icons';
import Orderproduct from './Orderproduct';
import { useNavigation } from '@react-navigation/native';
import Showadmin from './hiddenlinks';
const Orders = () => {
    const userid = auth.currentUser.uid
    const  [itemss,setitemss]=useState([])
    const [dataa,setdataa]=useState([])
    const navigate=useNavigation()
    const[email,setemail]=useState('')
    const [neworders,setneworders]=useState([])
    useEffect(() => {
        const database = collection(db, 'neworderss');
        const q= query(database, orderBy('orderat', 'desc'), where('user', '==', userid));
        onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setitemss(data)
        });
    }, [])
    return (
        <>
        <SafeAreaView style={{marginBottom:160}}>
            <View style={{ padding: 10, marginTop: 30, flexDirection: 'row' }}>
                <Ionicons onPress={() => navigate.goBack()} name="arrow-back-sharp" size={24} color="black" />
                <Text style={{ padding: 4, fontWeight: 'bold' }}>Home</Text>
            </View>
            <ScrollView style={{ padding: 10 }}>
                {itemss.map((item,index)=>(<Orderproduct item={item} key={index}/>))}
                
            </ScrollView>
            <Text style={{ textAlign: 'center',fontWeight:'bold',fontSize:20,padding:10 }}>Thank You!!</Text>

        </SafeAreaView>
        </>
    )
}

export default Orders

const styles = StyleSheet.create({})