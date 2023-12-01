import { StyleSheet, Text, View, SafeAreaView, TextInput, ScrollView, Pressable, Alert, TouchableOpacity } from 'react-native'
import React from 'react'
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setaddress, setdeliverydays, settdate, settime } from './shipslice';

const PickupScreen = () => {
    const dispatch=useDispatch()
    const [selectedDate, setSelectedDate] = useState(null)
    const [selecteaddress, setSelectedaddress] = useState("")
    const navigate=useNavigation()
    const [selectedtime, setselctedtime] = useState('')
    const [selectedday, setselctedday] = useState('')
    const cart = useSelector((state) => state.cart.cart)
    let total=0
    for (let i of cart){
        total+=(i.price*i.quantity)
    }
    const times = [
        { id: '0', time: '11:00 AM' },
        { id: '1', time: '1:00 PM' },
        { id: '3', time: '2:00 PM' },
        { id: '4', time: '4:00 PM' },
        { id: '5', time: '5:00 PM' },
        { id: '6', time: '6:00 PM' }
    ];
    const days = [
        { id: '0', day: '2-3 days' },
        { id: '1', day: '3-4 days' },
        { id: '3', day: '4-5 days' },
        { id: '4', day: '5-6 days' },
        { id: '5', day: 'tomorrow' }
    ];
    const handlecartrender=()=>{
        if (!selectedDate || !selectedday || !selectedtime || !selecteaddress){
            Alert.alert(
              
                'Empty or Invalid Fields',
                'Please fill the Corresponding fields...',
                [
                  { text: 'Yes', onPress: () => console.log('Yes Pressed') },
                  {
                    text: 'No',
                    onPress: () => console.log('No Pressed'),
                    style: 'cancel',
                  },
                ],
                { cancelable: false }
              );
        }
        if (selectedDate && selectedday && selectedtime && selecteaddress){
            dispatch(setaddress(selecteaddress))
            dispatch(settdate(String(selectedDate)))
            dispatch(settime(selectedtime))
            dispatch(setdeliverydays(selectedday))
            navigate.replace('cart')
        }

    }


    return (
        <>
        <ScrollView style={{ marginTop: 30 }}>
            <View style={{ margin: 10 }}>
                <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Pick up Address</Text>
                <TextInput editable
                    multiline
                    numberOfLines={6}
                    maxLength={600} placeholder='Enter Address' style={{ borderColor: 'gray', padding: 10, borderWidth: 0.7, borderRadius: 10 }} onChangeText={(text)=>setSelectedaddress(text)} />
            </View>
            <Text style={{ padding: 10, fontWeight: 'bold' }}>Pick up Date</Text>
            <HorizontalDatepicker
                mode="gregorian"
                startDate={new Date('2023-09-10')}
                endDate={new Date('2023-09-30')}
                initialSelectedDate={new Date('2020-08-22')}
                onSelectedDateChange={(date) => setSelectedDate(date)}
                selectedItemWidth={170}
                unselectedItemWidth={38}
                itemHeight={38}
                itemRadius={10}
                selectedItemTextStyle={styles.selectedItemTextStyle}
                unselectedItemTextStyle={styles.selectedItemTextStyle}
                selectedItemBackgroundColor="#222831"
                unselectedItemBackgroundColor="#ececec"
                flatListContainerStyle={styles.flatListContainerStyle}
            />
             <Text style={{ padding: 10, fontWeight: 'bold' }}>Pick up Time</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {times.map((item, index) => (
                    <Pressable key={index} onPress={()=>setselctedtime(item.time)} style={ selectedtime.includes(item.time)?{ padding: 10, margin: 5, borderWidth: 0.7, borderRadius: 7,borderColor:'red',backgroundColor:'white'}:{padding: 10, margin: 5, borderWidth: 0.7, borderRadius: 7,borderColor:'gray'}}>
                        <Text>{item.time}</Text>
                    </Pressable>
                ))}

            </ScrollView>
            <Text style={{ padding: 10, fontWeight: 'bold' }}>Pick up Day</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {days.map((item, index) => (
                    <Pressable key={index} onPress={()=>setselctedday(item.day)} style={ selectedday.includes(item.day)?{ padding: 10, margin: 5, borderWidth: 0.7, borderRadius: 7,borderColor:'red',backgroundColor:'white'}:{padding: 10, margin: 5, borderWidth: 0.7, borderRadius: 7,borderColor:'gray'}}>
                        <Text>{item.day}</Text>
                    </Pressable>
                ))}

            </ScrollView>
        </ScrollView>
        {cart.length > 0 ? (
                <Pressable style={{padding:10,margin:10, marginTop:'auto',flexDirection:'row',justifyContent:'space-between',backgroundColor:'#90EE90',borderRadius:6,padding:4}} >
                    <View>
                    <Text>Items: {cart.length}</Text>
                    <Text>Total Amount: ₹ {total}</Text>
                    </View>
                    
                    <TouchableOpacity onPress={handlecartrender}><Text style={{textAlign:'center',fontWeight:'bold'}}>Proceed to Cart  </Text></TouchableOpacity>
                </Pressable>
            ) : (null)}
        </>
    )
}

export default PickupScreen

const styles = StyleSheet.create({})