import { StyleSheet, Text, View, SafeAreaView, Alert, Image, Pressable, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { SliderBox } from "react-native-image-slider-box";
import Sliderimage from './Sliderimage';
import Services from './Services';
import Product from './Product';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addproduct } from './ProductSlice';
import { useNavigation } from '@react-navigation/native';
export default function HomeScreen() {
    const navigate = useNavigation()
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart.cart)

    const productss = useSelector((state) => state.product.products)
    let total = 0
    for (let i of cart) {
        total += (i.price * i.quantity)
    }
    const [displayCurrentAddress, setdisplayCurrentAddress] = useState("we are loading your loaction")
    const [loactionServicesEnabled, setloactionServicesEnabled] = useState(false)
    useEffect(() => {
        checkIfLocationEnabled()
        getCurrentLoaction()
        if (productss.length > 0) return;
        else {
            const fetch = () => {
                services.map((service) => dispatch(addproduct(service)))

            }
            fetch()
        }
    }, [])
    const checkIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();
        if (!enabled) {
            Alert.alert(
                "Loacation services ara not enabled",
                "please enable the Loaction services", [
                {
                    text: "cancel",
                    onPress: () => console.log("ok pressed"),
                    style: "cancel"
                },
                { text: "ok", onPress: () => console.log("ok pressed") }
            ],
                { cancelable: false }
            )
        }
        else {

            setloactionServicesEnabled(enabled)

        }
    }

    const getCurrentLoaction = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()

        if (status !== "granted") {

            Alert.alert(
                "permission not graunted",
                "Allow app to use the Loaction services", [
                {
                    text: "cancel",
                    onPress: () => console.log("ok pressed"),
                    style: "cancel"
                },
                { text: "ok", onPress: () => console.log("ok pressed") }
            ],
                { cancelable: false }
            )

        }
        const { coords } = await Location.getCurrentPositionAsync()
        //console.log(coords)
        if (coords) {
            const { latitude, longitude } = coords
            let response = await Location.reverseGeocodeAsync({
                latitude,
                longitude
            })

            //console.log(response)

            for (let item of response) {
                let address = `${item.name},${item.city},${item.postalCode}`
                setdisplayCurrentAddress(address)
            }
        }
    };
    /*useEffect(() => {
        checklocationenable();
        getcurrentlocation();
    }, [])
    const checklocationenable = async () => {
        const enable = await Location.hasServicesEnabledAsync()
        if (!enable) {
            Alert.alert(

                'Location services not enabled',
                'please enable the location...',
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

        } else {
            setlocationenableservices(enable)
        }
    }
    const getcurrentlocation = async () => {
        const status = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            Alert.alert(

                'permission denied',
                'allow the app to use location services...',
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
        const { cords } = await Location.getCurrentPositionAsync()
        console.log(cords)
        if (cords) {
            const { latitude, longitude } = cords;
            let response = await Location.reverseGeocodeAsync({ latitude, longitude })
            console.log(response)
            for (let i of response) {
                let address = `${i.name} ${i.city} ${i.postalCode}`
                setaddress('address')
            }
        }

    }*/
    const services = [
        {
            id: "0",
            image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
            name: "shirt",
            quantity: 0,
            price: 10,
        },
        {
            id: "11",
            image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
            name: "T-shirt",
            quantity: 0,
            price: 10,
        },
        {
            id: "12",
            image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
            name: "dresses",
            quantity: 0,
            price: 10,
        },
        {
            id: "13",
            image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
            name: "jeans",
            quantity: 0,
            price: 10,
        },
        {
            id: "14",
            image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
            name: "Sweater",
            quantity: 0,
            price: 10,
        },
        {
            id: "15",
            image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
            name: "shorts",
            quantity: 0,
            price: 10,
        },
        {
            id: "16",
            image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
            name: "Sleeveless",
            quantity: 0,
            price: 10,
        },
    ];
    return (
        <>
            <ScrollView style={{ marginTop: 30, backgroundColor: '#0F0F0F0F' }} >
                {/*location..*/}
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                    <Ionicons name="location" size={30} color="red" />
                    <View>
                        <Text style={{ fontWeight: '600', fontSize: 18 }}>Home</Text>
                        <Text style={{}}>{displayCurrentAddress}</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigate.navigate('userhandle')} style={{ marginLeft: 'auto', marginRight: 7 }}>
                        <Image style={{ width: 40, height: 40, borderRadius: 20 }} source={{ uri: 'https://lh3.googleusercontent.com/ogw/AGvuzYbJk3QVrKnjxUKfGSR84dNvsG5T4xZEwPTN6bOu=s32-c-mo' }} />

                    </TouchableOpacity>
                </View>
                {/*input........*/}
                <View style={{ padding: 10, margin: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 0.7, borderColor: '#C0C0C0', borderRadius: 8 }}>
                    <TextInput placeholder='search for item or more...' />
                    <FontAwesome name="search" size={24} color="black" />

                </View>
                {/*image slider........*/}
                <Sliderimage />
                {/*services........*/}
                <Services />
                <View style={{ margin: 10 }}>
                    {/*Products........*/}
                    {productss.map((item, index) => (
                        <Product item={item} key={index} />
                    ))}


                </View>
            </ScrollView>

            {cart.length > 0 ? (
                <Pressable style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#90EE90', borderRadius: 6, padding: 4 }} >
                    <View>
                        <Text>Items: {cart.length}</Text>
                        <Text>Total Amount: ₹ {total}</Text>
                    </View>

                    <TouchableOpacity onPress={() => { navigate.navigate('pickup') }}><Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Proceed to pickup   </Text></TouchableOpacity>
                </Pressable>
            ) : (null)}

        </>
    )
}

const styles = StyleSheet.create({})