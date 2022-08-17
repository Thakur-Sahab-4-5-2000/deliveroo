import { View, Text, SafeAreaView, Image } from "react-native";
import { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { setRestaurant, restaurantItems } from "../features/restaurantSlice";
import {
  decrement,
  removeAll,
  selectedBasketItems,
  selectedBasketTotals,
} from "../features/basketSlice";
import { useDispatch } from "react-redux";
import tw from "twrnc";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(restaurantItems);
  const items = useSelector(selectedBasketItems);
  const dispatch = useDispatch();
  const [groupedItemsBasket, setGroupedItemsBasket] = useState([]);
  const basketToal = useSelector(selectedBasketTotals);

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView style={tw`flex-1 bg-white mt-8`}>
      <StatusBar style="light" backgroundColor="black" />
      <View style={tw`flex-1 bg-gray-100 ml-2`}>
        <View style={tw`p-5 border-b border-teal-300 bg-white shadow-sm`}>
          <View>
            <Text style={tw`text-lg font-bold text-center`}>Basket</Text>
            <Text style={tw`text-center text-gray-400`}>
              {restaurant.title}
            </Text>
          </View>

          <XCircleIcon
            color="#00CCBB"
            height={50}
            width={50}
            style={tw`rounded-full bg-gray-100 absolute top-5 right-5`}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={tw`flex-row items-center bg-white my-5 px-4 py-3`}>
          <Image
            source={{
              uri: "http://links.papareact.com/wru",
            }}
            syle={tw`h-7 w-7 bg-gray-300 p-4 rounded-full`}
          />
          <Text style={tw`flex-1 mx-2`}>Deliver in 30-50 mins</Text>
          <TouchableOpacity>
            <Text style={tw`text-teal-300 mx-2`}>Change</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {Object.entries(groupedItemsBasket).map(([key, items]) => (
            <View
              key={key}
              style={tw`flex-row items-center bg-white py-2 px-5`}
            >
              <Text>{items.length}x</Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                style={tw`h-12 w-12 rounded-full ml-3`}
              />
              <Text style={tw`flex-1 ml-3`}>{items[0]?.name}</Text>
              <Text style={tw`text-gray-600`}>
                <Currency quantity={items[0]?.price} currency="USD" />
              </Text>

              <TouchableOpacity>
                <Text
                  style={tw`text-red-500 text-sm shadow-sm ml-3`}
                  onPress={() => dispatch(decrement({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View style={tw`p-5 bg-white mt-5`}>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-gray-400`}>SubTotal</Text>
            <Text style={tw`text-gray-400`}>
              <Currency quantity={basketToal} currency="USD" />
            </Text>
          </View>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-gray-400`}>Delivery Fee</Text>
            <Text style={tw`text-gray-400`}>
              <Currency quantity={5.99} currency="USD" />
            </Text>
          </View>
          <View style={tw`flex-row justify-between`}>
            <Text>Order Total</Text>
            <Text style={tw`font-extrabold`}>
              <Currency quantity={basketToal + 5.99} currency="USD" />
            </Text>
          </View>
          <TouchableOpacity
            style={tw`rounded-lg bg-teal-300 p-4 mt-2`}
            onPress={() => navigation.navigate("PreparingOrderScreen")}
          >
            <Text
              style={tw`text-center text-white text-lg font-bold`}
              onPress={() => dispatch(removeAll())}
            >
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
