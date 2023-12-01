import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {
    const navigate = useNavigation()
    const [email, setemail] = useState('')
    const [Password, setpassword] = useState('')
    const [Phone, setphone] = useState('')
    const [loading, setLoading] = useState(false)
    const handlesignup = () => {
        if (email === '' || Password === '' || Phone == '' || Phone.length<10 || Phone.length>10) {
            Alert.alert(

                'Empty or invalid Fields',
                'Please fill all the Fields...',
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
        else {
            setLoading(true)
            createUserWithEmailAndPassword(auth, email, Password)
                .then((userCredential) => {
                    setLoading(true)
                    const user = userCredential._tokenResponse.email;
                    const myuserid = auth.currentUser.uid;
                    setDoc(doc(db, 'users', `${myuserid}`), {
                        email: user,
                        phone: Phone
                    })
                    navigate.goBack()
                })
                .catch((error) => {
                    setLoading(false)
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage)
                    alert(errorMessage)
                });
        }
    } 
    return (
        <>
            {loading ? (<View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 150 }}>
                <Text>Loading..</Text>
                <ActivityIndicator size='large' color={'red'} />
            </View>) : (
                <SafeAreaView>
                    <View style={{ marginTop: 150 }}>
                        <View style={{ alignItems: 'center', marginBottom: 20 }}>
                            <Text style={{ fontWeight: 'bold', color: '#0000FF', fontSize: 20 }}>Sign Up</Text>
                            <Text style={{ fontSize: 15, marginTop: 10 }}>Sign up your account</Text>
                        </View>
                        <View style={{ backgroundColor: 'white', margin: 20, borderRadius: 10, padding: 40 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'space-between', marginBottom: 20 }}>
                                <MaterialIcons style={{ marginRight: 10, padding: 5 }} name="email" size={24} color="black" />
                                <TextInput onChangeText={(text) => setemail(text)} style={{ borderBottomColor: '#e1ddd2', width: 200, height: 40, borderBottomWidth: 1 }} placeholder='Enter Email' />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'space-between', marginBottom: 20 }}>
                                <FontAwesome style={{ marginRight: 10, padding: 5 }} name="phone-square" size={24} color="black" />
                                <TextInput onChangeText={(text) => setphone(text)} style={{ borderBottomColor: '#e1ddd2', width: 200, height: 40, borderBottomWidth: 1 }} placeholder='Enter phone' />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'space-between' }}>
                                <FontAwesome5 style={{ marginRight: 10, padding: 5 }} name="key" size={24} color="black" />
                                <TextInput onChangeText={(text) => setpassword(text)} style={{ borderBottomColor: '#e1ddd2', width: 200, height: 40, borderBottomWidth: 1 }} placeholder='Enter Password' />
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', marginTop: 20 }}>

                            <TouchableOpacity onPress={handlesignup}><Text style={{ backgroundColor: '#0090ca', fontSize: 20, width: 100, height: 30, textAlign: 'center', borderRadius: 10 }}>Sign Up</Text></TouchableOpacity>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                <Text style={{}}>Already a member?</Text>
                                <TouchableOpacity onPress={()=>navigate.goBack()}><Text style={{ textAlign: 'center', color: '#0000FF' }}>Login...</Text></TouchableOpacity>
                            </View>

                        </View>

                    </View>

                </SafeAreaView>)}
        </>
    )
}

export default Register

const styles = StyleSheet.create({})