import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { decrease, increase } from './Cartslice'
import { decreaseproducts, increaseproduct } from './ProductSlice'

const CartProduct = ({item}) => {
    const dispatch=useDispatch()
    const handleincrease=()=>{
        dispatch(increase(item))
        dispatch(increaseproduct(item))
      }
      const handledecrease=()=>{
        dispatch(decrease(item))
        dispatch(decreaseproducts(item))
      }
  return (
    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: 10, borderRadius: 10 }}>
      <View styl={{}}>
        <Text style={{ width: 80, fontWeight: '600', fontSize: 15 }}>{item.name}</Text>
      </View>
      <Text>₹ {item.price*item.quantity}</Text>
        <Pressable style={{flexDirection:'row',paddingHorizontal:10,paddingVertical:5}}>
       <TouchableOpacity style={{width:26,height:26,alignContent:'center',justifyContent:'center'}} onPress={handledecrease}>
        <Text style={{ borderColor: 'gray', borderWidth: 0.7, borderRadius: 8, textAlign: 'center', fontSize: 17}}>-</Text>
       </TouchableOpacity>
        <Text style={{borderRadius:8,width:30,textAlign:'center',marginTop:4, fontWeight: 'bold'}}>{item.quantity}</Text>
        <TouchableOpacity  onPress={handleincrease} style={{width:26,height:26,alignContent:'center',justifyContent:'center'}}>
        <Text style={{ borderColor: 'gray', borderWidth: 0.7, borderRadius: 8, textAlign: 'center', fontSize: 17}} >+</Text>
       </TouchableOpacity>
        </Pressable>
      
    </View>
  )
}

export default CartProduct

const styles = StyleSheet.create({})