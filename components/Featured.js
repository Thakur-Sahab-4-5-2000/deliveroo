import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
import { ArrowRightIcon } from "react-native-heroicons/solid";
import { ScrollView } from "react-native-gesture-handler";
import FeaturedCard from "./FeaturedCard";
import { useEffect, useState } from "react";
import client from "../sanity";

const Featured = ({ id, title, desc }) => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    client
      .fetch(
        `*[_type == "featured" && _id == $id]{
        ...,
        restaurants[]->{
          ...,
          dishes[]->,
          type->{
              name
          }
        },
      }[0]`,
        { id }
      )
      .then((data) => {
        setRestaurants(data?.restaurants);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <View>
      <View style={tw`mt-4 flex-row items-center justify-between px-4`}>
        <Text style={tw`font-bold text-lg`}>{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>
      <Text style={tw`text-xs text-gray-500 px-4`}>{desc}</Text>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        style={tw`pt-4`}
      >
        {restaurants?.map((item) => (
          <FeaturedCard
            key={item._id}
            id={item._id}
            imgUrl={item.image}
            title={item.name}
            rating={item.rating}
            genre={item.type?.name}
            address={item.address}
            short_desc={item.short_description}
            dishes={item.dishes}
            lang={item.long}
            lat={item.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Featured;
