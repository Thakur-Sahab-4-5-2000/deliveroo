import { View, Text, ScrollView, Image, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import tw from "twrnc";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  ArrowLeftIcon,
  StarIcon,
  LocationMarkerIcon,
  QuestionMarkCircleIcon,
  ChevronDownIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch, useSelector } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";
import { StatusBar } from "expo-status-bar";

const Details = () => {
  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      address,
      short_desc,
      dishes,
      long,
      lat,
      genre,
    },
  } = useRoute();

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        title,
        rating,
        address,
        short_desc,
        dishes,
        long,
        lat,
        genre,
      })
    );
  }, [dispatch]);

  return (
    <>
      <BasketIcon />
      <ScrollView style={tw`bg-white`}>
        <View style={tw`relative bg-white`}>
          <Image
            source={{ uri: urlFor(imgUrl).url() }}
            style={tw`w-full h-60 bg-gray-300 p-4`}
            resizeMode="cover"
          />
          <ArrowLeftIcon
            size={22}
            color="#00CCBB"
            style={tw`absolute top-14 left-5 bg-gray-100 p-4.5 rounded-full rounded-full`}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={tw`bg-white`}>
          <View style={tw`px-4 pt-4`}>
            <Text style={tw`text-3xl font-bold`}>{title}</Text>
            <View style={tw`flex-row my-1`}>
              <View style={tw`flex-row items-center mx-1`}>
                <StarIcon color="green" size={22} opacity={0.5} />
                <Text style={tw`text-xs text-gray-500`}>
                  <Text style={tw`text-green-500`}>{rating}</Text> . {genre}
                </Text>
              </View>
              <View style={tw`flex-row items-center mx-1`}>
                <LocationMarkerIcon color="gray" size={22} opacity={0.4} />
                <Text style={tw`text-xs text-gray-500`}>Near . {address}</Text>
              </View>
            </View>
            <Text style={tw`text-gray-500 mt-2 pb-4`}>{short_desc}</Text>
          </View>
          <TouchableOpacity
            style={tw`flex-row items-center p-4 border-y border-gray-500`}
          >
            <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
            <Text style={tw`pl-2 flex-1 text-base font-bold`}>
              Have a food allergy?
            </Text>
            <ChevronDownIcon color="#00CCBB" />
          </TouchableOpacity>
        </View>
        <View style={tw`ml-4 bg-white pb-25`}>
          <Text style={tw`pt-6 mb-3 font-bold text-xl`}>Menu</Text>
          {dishes?.map((item) => (
            <DishRow
              key={item._id}
              id={item._id}
              name={item.name}
              desc={item.short_description}
              price={item.price}
              image={item.image}
            />
          ))}
        </View>
      </ScrollView>
      <StatusBar translucent={true} />
    </>
  );
};

export default Details;
