import { ActivityIndicator, Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

const Login = () => {
    const [email, setemail] = useState('')
    const [Password, setpassword] = useState('')
    const navigate = useNavigation()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        const user = auth.onAuthStateChanged((authuser) => {
            if (!authuser) {
                setLoading(false)
            }
            if (authuser) {
                navigate.replace('Home')
            }
        })
        setLoading(false)


    }, [])
    const handlelogin = () => {
        if (email === '' || Password === '') {
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
            signInWithEmailAndPassword(auth, email, Password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    navigate.replace('Home')
                })
                .catch((error) => {
                    setLoading(false)
                   
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorMessage);
                    console.log(errorMessage)
                });

        }
    }
    return (
        <>
            {loading ? (
            <View style={{alignItems:'center',justifyContent:'center',marginTop:150}}>
             <Text>Loading..</Text>
             <ActivityIndicator  size='large' color={'red'}/>
            </View>) : (<SafeAreaView>
                <View style={{ marginTop: 150 }}> 
                    <View style={{ alignItems: 'center', marginBottom: 20 }}>
                        <Text style={{ fontWeight: 'bold', color: '#0000FF', fontSize: 20 }}>Sign In</Text>
                        <Text style={{ fontSize: 15, marginTop: 10 }}>Sign in your account</Text>
                    </View>
                    <View style={{ backgroundColor: 'white', margin: 20, borderRadius: 10, padding: 40 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'space-between', marginBottom: 20 }}>
                            <MaterialIcons style={{ marginRight: 10, padding: 5 }} name="email" size={24} color="black" />
                            <TextInput onChangeText={(text) => setemail(text)} style={{ borderBottomColor: '#e1ddd2', width: 200, height: 40, borderBottomWidth: 1 }} placeholder='Enter Email' />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'space-between' }}>
                            <FontAwesome5 style={{ marginRight: 10, padding: 5 }} name="key" size={24} color="black" />
                            <TextInput onChangeText={(text) => setpassword(text)} style={{ borderBottomColor: '#e1ddd2', width: 200, height: 40, borderBottomWidth: 1 }} placeholder='Enter Password' />
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 20 }}>

                        <TouchableOpacity onPress={handlelogin}><Text style={{ backgroundColor: '#0090ca', fontSize: 20, width: 100, height: 30, textAlign: 'center', borderRadius: 10 }}>Login</Text></TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                            <Text style={{}}>Don't have an Account?</Text>
                            <TouchableOpacity onPress={() => navigate.navigate('register')}><Text style={{ textAlign: 'center', color: '#0000FF' }}>  Register...</Text></TouchableOpacity>
                        </View>

                    </View>

                </View>

            </SafeAreaView>)}
        </>
    )
}

export default Login
