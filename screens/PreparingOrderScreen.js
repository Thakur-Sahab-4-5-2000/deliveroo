import { View, Text, SafeAreaView } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";

const PreparingOrderScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 5000);
  }, []);
  return (
    <SafeAreaView style={tw`bg-white flex-1 justify-center items-center`}>
      <Animatable.Image
        source={require("../assets/punpun.gif")}
        iterationCount={1}
        style={tw`h-100 w-75 `}
      />
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        style={tw`text-lg my-10 text-black font-bold text-center`}
      >
        Waiting for restaurant to accept your order
      </Animatable.Text>

      <Animatable.Image
        source={require("../assets/loading.gif")}
        animation="slideInUp"
        iterationCount={1}
        style={tw`h-20 w-20`}
      />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
