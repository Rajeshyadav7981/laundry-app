import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native';
import React from 'react';

const Services = () => {
  const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/3003/3003984.png",
      name: "Washing",
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/2975/2975175.png",
      name: "Laundry",
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9753/9753675.png",
      name: "Wash & Iron",
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/995/995016.png",
      name: "Cleaning",
    },
  ];

  return (
    <View style={{ padding: 20}}>
      <Text style={{marginBottom:10,fontWeight:'800'}}>Services Available</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {services.map((item, index) => (
          <Pressable
            key={item.id} // Use the unique "id" as the key
            style={{ backgroundColor: 'white', padding: 20, borderRadius: 10,marginRight:10 }}
          >
            <Image source={{ uri: item.image }} style={{ width: 70, height: 70 }} />
            <Text>{item.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

export default Services;

const styles = StyleSheet.create({});
