import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CategoriesCard from "./CategoriesCard";
import { useEffect, useState } from "react";
import client from "../sanity";
import { urlFor } from "../sanity";

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "category"]`)
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }),
    [];
  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {categories?.map((item) => (
        <CategoriesCard
          key={item._id}
          id={item._id}
          img={urlFor(item.image).width(200).url()}
          title={item.name}
        />
      ))}
    </ScrollView>
  );
};

export default Category;
