import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  AdjustmentsIcon,
  ChevronDownIcon,
  SearchIcon,
  UserIcon,
} from 'react-native-heroicons/outline';

const styles = StyleSheet.create({
  text: {
    color: 'red',
  },
  imageStyle: {
    width: 50, // Set the width and height for your image
    height: 50,
    padding: 7,
    borderRadius: 25,
  },
});

export default function HomeScreen() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // Reference the image using require from the assets directory
  const localImage = require('../assets/photo1.png'); // Replace with the actual image path

  return (
    <SafeAreaView style={{ backgroundColor: 'white', paddingTop: 5 }}>
      <Text style={styles.text}>
        <View className="flex-row pb-3 items-center mx-4 space-x-2">
          <Image
            source={localImage} // Use the imported local image as the source
            style={styles.imageStyle} // Apply the styles using the style prop
          />
          <View className="flex-1">
            <Text className="font-bold text-gray-400 text-xs">
              Deliver Now!
            </Text>
            <Text className="font-bold text-xl">
              Current Location
              <ChevronDownIcon size={20} color="#00CCBB" />
            </Text>
          </View>
          <UserIcon size={35} color="#00CCBB" />
        </View>

        {/* Search */}
        <View className="flex-row items-center space-x-2 pb-2 mx-4">
          {/* <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
            <SearchIcon color="gray" size={20} />
            <TextInput
              placeholder="Restaurants and cuisines"
              keyboardType="default"
            />
          </View> */}
          {/* <AdjustmentsIcon style="#00CCBB" /> */}
        </View>
      </Text>
    </SafeAreaView>
  );
}
