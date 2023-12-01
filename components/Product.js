import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { add, decrease, increase } from './Cartslice'
import { addproduct, addproductqu, decreaseproducts, increaseproduct } from './ProductSlice'
import { useSelector } from 'react-redux'
const Product = ({ item }) => {
  const dispatch = useDispatch()
  const cart=useSelector((state)=>state.cart.cart)
  const handle = () => {
    dispatch(add(item))
    dispatch(addproduct(item))

  }
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
      <View>
        <Image source={{ uri: item.image }} style={{ width: 70, height: 70 }} />
      </View>
      <View styl={{}}>
        <Text style={{ width: 80, fontWeight: '600', fontSize: 15 }}>{item.name}</Text>
        <Text>₹ {item.price}</Text>
      </View>
      {cart.some((c)=>c.id===item.id) ?(
      
        <Pressable style={{flexDirection:'row',paddingHorizontal:10,paddingVertical:5}}>
       <TouchableOpacity onPress={handledecrease}  style={{width:26,height:26,alignContent:'center',justifyContent:'center'}}>
        <Text style={{ borderColor: 'gray', borderWidth: 0.7, borderRadius: 8, textAlign: 'center', fontSize: 17}} >-</Text>
       </TouchableOpacity>
        <Text style={{borderRadius:8,width:30,textAlign:'center',marginTop:4, fontWeight: 'bold'}}>{item.quantity}</Text>
        <TouchableOpacity style={{width:26,height:26,alignContent:'center',justifyContent:'center'}} onPress={handleincrease}>
        <Text style={{ borderColor: 'gray', borderWidth: 0.7, borderRadius: 8, textAlign: 'center', fontSize: 17}} >+</Text>
       </TouchableOpacity>
        </Pressable>
      ):(
       <TouchableOpacity onPress={handle} style={{ width: 80 }}>
       <Text style={{ borderColor: 'gray', borderWidth: 0.7, borderRadius: 8, textAlign: 'center', padding: 5, fontSize: 17, fontWeight: 'bold' }}>Add</Text>
     </TouchableOpacity>)}
      
    </View>
  )
}

export default Product

const styles = StyleSheet.create({})