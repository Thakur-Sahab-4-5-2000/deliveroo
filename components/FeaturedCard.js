import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import tw from "twrnc";
import { LocationMarkerIcon, StarIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

const FeaturedCard = ({
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
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={tw`bg-white mr-3 shadow`}
      onPress={() => {
        navigation.navigate("Details", {
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
        });
      }}
    >
      <Image
        source={{ uri: urlFor(imgUrl).url() }}
        style={tw`h-45 w-55 rounded`}
      />
      <View style={tw`pb-4`}>
        <Text style={tw`font-bold text-lg pt-2`}> {title}</Text>
        <View style={tw`flex-row items-center`}>
          <StarIcon size={22} color="green" opacity={0.5} />
          <Text style={tw`text-xs text-gray-500 ml-1`}>{rating}</Text>
          <Text style={tw`text-green-500 font-bold text-sm ml-1`}>{genre}</Text>
        </View>
        <View style={tw`flex-row items-center`}>
          <LocationMarkerIcon color="gray" opacity={0.4} size={22} />
          <Text style={tw`text-xs text-gray-500`}>Nearby . {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FeaturedCard;
