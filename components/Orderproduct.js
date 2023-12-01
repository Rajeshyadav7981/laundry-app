import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Showadmin from './hiddenlinks';
import { auth, db } from './firebase';
import { Timestamp, doc, setDoc } from 'firebase/firestore';
const Orderproduct = ({ item }) => {
    const ordersArray = Object.values(item.orders);
    const [statuss, setstatus] = useState('')
    const user = auth.currentUser.uid
    const id = item.id
    const [date,setdate]=useState('')

    const handlestatus = () => {
        const orderconfigg = { orders: item.orders, total: item.total, orderat: item.orderat, user: item.user, email: item.email, shipto: item.shipto, status:statuss, shpdate: Timestamp.now().toDate() }
        setDoc(doc(db, "neworderss", item.id), orderconfigg);
    }
    useEffect(()=>{
        if (item.shpdate !== '') {
            const jsDate = item.shpdate.toDate();
            const year = jsDate.getFullYear();
            const month = jsDate.getMonth() + 1; // Months are 0-indexed, so add 1
            const day = jsDate.getDate();
            const hours = jsDate.getHours();
            const minutes = jsDate.getMinutes();
            const seconds = jsDate.getSeconds();
          
            setdate(`${year}-${month}-${day}  ${hours}:${minutes}:${seconds}`)
        }
    },[])
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.orderDetails}>
                    <Text style={styles.orderId}>Order ID: {item.id}</Text>
                    {ordersArray.map((items, index) => (
                        <View key={index} style={styles.itemContainer}>
                            <Text style={styles.itemName}>Item: {items.name}</Text>
                            <Text style={styles.itemQuantity}>Item Quantity: {items.quantity}</Text>
                            <Text style={styles.itemPrice}>Item Price: {items.price}</Text>
                        </View>
                    ))}
                    <View>
                        <Text style={styles.price}>Price: {item.total}</Text>
                        <Text style={{ fontSize: 16, marginLeft: 110 }}>Order Status:  <Text style={item.status==='Picked...' ?{ fontSize: 16, color: 'red' }:{ fontSize: 16, color: 'green' }}>{item.status}</Text></Text>
                        {date !== '' && <Text style={{ fontSize: 16, marginLeft: 50 }}>status date:  <Text style={{ fontSize: 16, color: 'red' }}></Text>{date}</Text>}
                        <Showadmin><TouchableOpacity><TextInput style={{ borderColor: 'gray', borderWidth: 0.8, borderRadius: 10 }} onChangeText={(text) => setstatus(text)}></TextInput>
                            <TouchableOpacity onPress={handlestatus} style={{ marginLeft: 150, backgroundColor: 'gray', borderRadius: 10, marginVertical: 10 }}><Text style={{ fontSize: 20, textAlign: 'center' }}>change status</Text></TouchableOpacity></TouchableOpacity></Showadmin>
                    </View>
                </View>
            </View>
        </ScrollView>
    ) 
}

export default Orderproduct

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    orderDetails: {
        marginVertical: 10,
    },
    orderId: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 16,
        marginLeft: 200
    },
    itemContainer: {
        marginTop: 10,
    },
    itemName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    itemQuantity: {
        fontSize: 14,
    },
    itemPrice: {
        fontSize: 14,
    },
})
