import { View, Text, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import { Image } from "react-native";
import tw from "twrnc";
import {
  AdjustmentsIcon,
  ChevronDownIcon,
  SearchIcon,
  UserIcon,
} from "react-native-heroicons/solid";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Category from "../components/Category";
import Featured from "../components/Featured";
import client from "../sanity";
import Spinner from "react-native-loading-spinner-overlay";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    client
      .fetch(
        `*[_type == "featured"]{
        ...,
        restaurants[]->{
          ...,
          dishes[]->{
          }
        }
      }`
      )
      .then((data) => {
        setFeatured(data);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoader(false);
  }),
    [];
  return (
    <SafeAreaView style={tw`mt-5 bg-white pt-5`}>
      <StatusBar translucent={true} />
      <View style={tw`flex-row pb-3 items-center mx-2 p-2`}>
        <Image
          source={{
            uri: "http://links.papareact.com/wru",
          }}
          style={tw`h-10 w-10 bg-gray-300 rounded-full`}
        />
        <View style={tw`ml-1.5 flex-1`}>
          <Text style={tw`font-bold text-gray-400 text-xs`}>Deliver Now</Text>
          <Text style={tw`font-bold text-xl`}>
            Current Location
            <ChevronDownIcon size={22} color="#00CCBB" />
          </Text>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>
      <View style={tw`flex-row items-center px-4 p-4`}>
        <View
          style={tw`mr-1 flex-row flex-1 items-center bg-gray-200 rounded-full`}
        >
          <SearchIcon size={22} color="black" style={tw`ml-2.5`} />
          <TextInput
            placeholder="Search Best hotels"
            style={tw`text-black p-4 flex-1 mr-2 rounded-full`}
            keyboardType="default"
          ></TextInput>
        </View>
        <AdjustmentsIcon size={22} color="#00CCBB" style={tw`mr-1.5`} />
      </View>
      {loader ? (
        <Spinner
          visible={loader}
          textContent={"Loading..."}
          style={tw`text-black`}
        />
      ) : (
        <ScrollView
          style={tw`bg-gray-100`}
          contentContainerStyle={{ paddingBottom: 160 }}
        >
          <Category />

          {featured?.map((item) => (
            <Featured
              key={item._id}
              id={item._id}
              title={item.name}
              desc={item.short_description}
            />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Home;
