import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import sanityClient, { urlFor } from '../sanity';
import CategoryCard from './CategoryCard';

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
      *[_type == "category"]
      `,
      )
      .then((data) => {
        setCategories(data);
      });
  });

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {/*Category Card */}

      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          imgUrl={urlFor(category.image).width(200).url()}
          title={category.name}
        />
      ))}
    </ScrollView>
  );
}
