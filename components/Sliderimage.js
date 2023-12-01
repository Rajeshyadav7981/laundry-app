import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';

const Sliderimage = () => {
  const images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTym3Hx432C-bF_WiNyl3C03WIwaHe7RIV76Q&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2xCT-_-NBbniED1j8ZiJD35O3ryTt952mIA&usqp=CAU',
  ];

  return (
    <View >
      <SliderBox
        images={images}
        autoPlay
        circleLoop
        dotColor="red"
        inactiveDotColor="black"
        ImageComponentStyle={{ borderRadius: 6, width: 325 }}
      />
    </View>
  );
};

export default Sliderimage;

const styles = StyleSheet.create({
});
