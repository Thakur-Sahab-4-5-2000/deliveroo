import {
  View,
  Text,
  SafeAreaView,
  Image,
  ProgressBarAndroid,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import { XIcon } from "react-native-heroicons/solid";
import { TouchableOpacity } from "react-native-gesture-handler";
import { restaurantItems } from "../features/restaurantSlice";
import { StatusBar } from "expo-status-bar";
import * as Animatable from "react-native-animatable";

const Delivery = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(restaurantItems);

  return (
    <View style={tw`mt-5 bg-cyan-500`}>
      <StatusBar backgroundColor="#06b6d4" bar-style="dark-content" />
      <SafeAreaView style={tw`mt-5 bg-cyan-500 z-50`}>
        <View style={tw`flex-row justify-between items-center p-5`}>
          <TouchableOpacity>
            <XIcon
              color="white"
              size={30}
              onPress={() => navigation.navigate("Home")}
            />
          </TouchableOpacity>
          <Text style={tw`font-light text-white text-lg`}>Order Help</Text>
        </View>
        <View style={tw`bg-white mx-2 my-2 rounded-md p-6 z-50 shadow-md`}>
          <View style={tw`flex-row justify-between`}>
            <View>
              <Text style={tw`text-gray-400 text-lg`}>Estimated Arrival</Text>
              <Text style={tw`font-bold text-4xl`}>30-50</Text>
            </View>
            <Image
              source={{ uri: "http://links.papareact.com/fls" }}
              style={tw`h-20 w-20`}
            />
          </View>
          <ProgressBarAndroid
            styleAttr="Horizontal"
            color="#00CCBB"
            style={tw`h-10 w-35 rounded-full`}
          />
          <Text style={tw`mt-2 text-gray-500`}>
            Your order at {restaurant.title} is being prepared{" "}
          </Text>
        </View>
      </SafeAreaView>
      <Animatable.Image
        source={require("../assets/billu.gif")}
        iterationCount={1}
        style={tw`h-140 w-75 ml-10 `}
      />
    </View>
  );
};

export default Delivery;
