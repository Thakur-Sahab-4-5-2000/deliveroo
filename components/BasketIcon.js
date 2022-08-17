import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  selectedBasketTotals,
  selectedBasketItems,
} from "../features/basketSlice";
import { TouchableOpacity } from "react-native-gesture-handler";
import tw from "twrnc";
import Currency from "react-currency-formatter";

const BasketIcon = () => {
  const items = useSelector(selectedBasketItems);
  const navigation = useNavigation();
  const total = useSelector(selectedBasketTotals);
  if (items.length === 0) return null;

  return (
    <View style={tw`absolute bottom-10 w-full z-50`}>
      <TouchableOpacity
        onPress={() => navigation.navigate("BasketScreen")}
        style={tw`mx-5 bg-cyan-500 p-4 rounded-lg flex-row items-center`}
      >
        <Text
          style={tw`text-white font-extrabold text-lg bg-teal-300 py-1 px-2`}
        >
          {items.length}
        </Text>
        <Text
          style={tw`ml-1.5 flex-1 text-white font-extrabold text-lg text-center`}
        >
          View Basket
        </Text>
        <Text style={tw`text-lg text-white font-extrabold ml-1.5`}>
          <Currency quantity={total} currency="USD" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
