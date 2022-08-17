import { View, Text, Image } from "react-native";
import Currency from "react-currency-formatter";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import tw from "twrnc";
import { urlFor } from "../sanity";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  selectedBasketItemsWithId,
  decrement,
} from "../features/basketSlice";

const DishRow = ({ id, name, desc, price, image }) => {
  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector((state) => selectedBasketItemsWithId(state, id));

  const addItemToBasket = () => {
    dispatch(increment({ id, name, desc, price, image }));
  };

  const removeItemFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(decrement({ id }));
  };

  return (
    <>
      <TouchableOpacity
        style={tw`bg-white mb-2`}
        onPress={() => setIsPressed(!isPressed)}
      >
        <View style={tw`flex-row items-center pr-4 pb-2`}>
          <View style={tw`flex-1`}>
            <Text style={tw`text-lg mb-1`}>{name}</Text>
            <Text style={tw`text-gray-400 mr-2`}>{desc}</Text>
            <Text style={tw`text-gray-400 mt-2`}>
              <Currency quantity={price} currency="INR" />
            </Text>
          </View>
          <View>
            <Image
              source={{ uri: urlFor(image).url() }}
              style={tw`h-20 w-20 bg-gray-300 p-4`}
            />
          </View>
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View style={tw`bg-white px-4`}>
          <View style={tw`flex-row items-center pb-3`}>
            <TouchableOpacity
              onPress={removeItemFromBasket}
              disabled={!items.length}
            >
              <MinusCircleIcon
                size={40}
                color={items.length > 0 ? "#00CCBB" : "gray"}
              />
            </TouchableOpacity>
            <Text> {items.length} </Text>
            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon size={40} color="#00CCBB" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
