import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const OrdersSuccess = () => {
    const navigate=useNavigation()
    return (
        <>
        <View style={{padding:10,marginTop:30,flexDirection:'row'}}>
        <Ionicons onPress={() => navigate.goBack()} name="arrow-back-sharp" size={24} color="black" />
        <Text style={{padding:4,fontWeight:'bold'}}>Home</Text>
        </View>
        <SafeAreaView style={{marginTop:50}}>
            <View style={{ borderRadius: 20 }}>
        <Image 
        source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMFllXa_yjXmbhvPtKXu8qIfbqiUoq_R2FVQ&usqp=CAU'}}
        style={{width:200,
            height:200,marginLeft:70, borderRadius:600}}
      />
      </View>
            <View style={{padding:10,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:20,fontWeight:'bold'}}>OrdersSuccess</Text>
            </View>
            <View style={{alignItems:'center',justifyContent:'center',marginTop:30}}>
              <TouchableOpacity onPress={()=>{navigate.replace('orders')}}><Text style={{fontSize:15,fontWeight:'bold'}}>To view You Orders Click here</Text></TouchableOpacity>
              </View>

        </SafeAreaView>
        </>
    )
}

export default OrdersSuccess

const styles = StyleSheet.create({})