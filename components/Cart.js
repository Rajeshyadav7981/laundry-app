import { StyleSheet, Text, View, SafeAreaView, Pressable, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import CartProduct from './CartProduct';
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import {clearcart } from './Cartslice';
import { clearproduct } from './ProductSlice';
import { address, date, days, time } from './shipslice';

const Cart = () => {
  const navigate = useNavigation()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const cart = useSelector((state) => state.cart.cart)
  const userid = auth.currentUser.uid
  const useremail = auth.currentUser.email
  let total = 0
  for (let i of cart) {
    total += (i.price * i.quantity)
  }
  const datee=useSelector(date)
  const timee=useSelector(time)
  const dayss=useSelector(days)
  const addresss=useSelector(address)
  const pickupaddress={datee,addresss,timee,dayss}
  const handleorder = async () => {
    setLoading(true)
    const orderconfig={orders:{...cart},total:total,orderat:Timestamp.now().toDate(),user:userid}
    const orderconfigg={orders:{...cart},total:total,orderat:Timestamp.now().toDate(),user:userid,email:useremail,shipto:pickupaddress,status:'Picked...',shpdate:''}
    await  addDoc(collection(db,'userorderss'),orderconfig) 
    await  addDoc(collection(db,'neworderss'),orderconfigg) 
    dispatch(clearcart())
    dispatch(clearproduct())
    navigate.replace('ordersuccess')
    setLoading(false)
  }
  return (
    <>
      {loading ? (
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 150 }}>
          <Text>Placing order........</Text>
          <ActivityIndicator size='large' color={'red'} />
        </View>) : (<>
          <SafeAreaView style={{ marginTop: 30, padding: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <Ionicons onPress={() => navigate.goBack()} name="arrow-back-sharp" size={24} color="black" />
              <Text style={{ padding: 3, fontWeight: 'bold' }}>Your Bucket</Text>
            </View>
            {cart.length == 0 ? (<Pressable>
              <View style={{marginTop:90,alignItems:'center',justifyContent:'center'}}>
              <Text style={{fontSize:25,fontWeight:'bold',marginBottom:30}}>Bucket is Empty</Text>
              <TouchableOpacity onPress={()=>{navigate.goBack()}}><Text style={{fontSize:15,fontWeight:'bold'}}>Press to go back home</Text></TouchableOpacity>
              </View>

            </Pressable>) : (<ScrollView style={{ margin: 10 }}>

              {/*cart Products........*/}
              {cart.map((item, index) => (
                <CartProduct item={item} key={index} />
              ))}

              <View style={{}}>
                <Text style={{ fontWeight: 'bold',marginTop:10,marginBottom:10 }}>Billing Details</Text>
                <View style={{ backgroundColor: 'white', borderRadius: 7, padding: 10 }}>
                  <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text style={{ width: 220 }}>Item Total :</Text>
                    <Text>₹{cart.length}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text style={{ width: 220 }}>Delivery | 1.2 KM:</Text>
                    <Text style={{ color: '#90EE90' }}>Free</Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text style={{ width: 220 }}>Selected Date</Text>
                    <Text style={{}}>22 sept 2023</Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text style={{ width: 220 }}>Number Of Days</Text>
                    <Text style={{ color: '#90EE90' }}>2-3 Days</Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text style={{ width: 220 }}>Selected Pick Up Time</Text>
                    <Text style={{ color: '#90EE90' }}>11:00 AM</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: 'white', borderRadius: 7, padding: 10, marginTop: 20 }}>
                  <Text style={{ width: 220, fontWeight: 'bold' }}>Total:</Text>
                  <Text style={{ fontWeight: 'bold' }}>₹{total}</Text>
                </View>

              </View>

            </ScrollView>)}
          </SafeAreaView>
          {cart.length == 0 ? (null) :
            <Pressable style={{ padding: 10, margin: 10, marginTop: 'auto', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#90EE90', borderRadius: 6, padding: 4 }} >
              <View>
                <Text>Items: {cart.length}</Text>
                <Text>Total Amount: ₹ {total}</Text>
              </View>

              <TouchableOpacity onPress={handleorder}><Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Proceed to Order  </Text></TouchableOpacity>
            </Pressable>
          }</>)}
    </>
  )
}

export default Cart

const styles = StyleSheet.create({})