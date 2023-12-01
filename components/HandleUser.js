import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import Showadmin from './hiddenlinks';
const HandleUser = () => {
    const navigate=useNavigation()
    const HandleUser=()=>{
        signOut(auth).then(()=>{
            navigate.replace('login')
        })
    }
    return (
        <View style={styles.view1}>
            <Text style={styles.text}>User</Text>
            <TouchableOpacity  onPress={HandleUser} style={{marginTop:30}}><Text>Sign Out</Text></TouchableOpacity>
            <Showadmin><TouchableOpacity  onPress={()=>navigate.navigate('adminorders')} style={{marginTop:30}}><Text>Admin order change</Text></TouchableOpacity></Showadmin>
            <TouchableOpacity onPress={()=>navigate.navigate('orders')}   style={{marginTop:30}}><Text>Orders</Text></TouchableOpacity>
        </View>
    )
}

export default HandleUser

const styles = StyleSheet.create({
    text: { textAlign: 'center', fontWeight: 'bold', fontSize: 28 },
    view1: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 150
    }
})