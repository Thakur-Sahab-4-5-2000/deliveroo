import { View, Text, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import tw from "twrnc";

const CategoriesCard = ({ img, title }) => {
  return (
    <TouchableOpacity style={tw`relative mr-2`}>
      <Image source={{ uri: img }} style={tw`h-25 w-30 rounded`} />
      <Text style={tw`absolute bottom-1 left-2 text-white font- text-lg`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoriesCard;
