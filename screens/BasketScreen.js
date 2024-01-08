import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import Currency from 'react-currency-formatter';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from '../features/basketSlice';
import { selectRestaurant } from '../features/restaurantSlice';
import { urlFor } from '../sanity';

export default function BasketScreen() {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    });

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon color="00CCBB" height={50} width={50} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{
              uri: 'https://i.pinimg.com/564x/01/9b/ae/019bae205f88ece53acc960ded948490.jpg',
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">
            Deliver in 50-75 min.
            <TouchableOpacity>
              <Text className="text-[#00CCBB]">Change</Text>
            </TouchableOpacity>
          </Text>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {/* {Object.entries(groupedItemsInBasket).map(([key, items]) => {
            if (!items) {
              return null;
            }
            return ( */}
          {items.map((item) => (
            <View
              key={item.id}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-[#00CCBB]">{items.length} x</Text>
              {items[0]?.image && (
                <Image
                  source={{
                    uri: urlFor(items[0]?.image).url(),
                  }}
                  className="h-12 w-12 rounded-full"
                />
              )}
              <Text className="flex-1">{item.name} </Text>
              <Image source={{ uri: urlFor(item.image).url() }} />
              <Text className="text-gray-600">
                {items.length > 0 && (
                  <Currency quantity={items[0]?.price} currency="EUR" />
                )}
              </Text>

              <TouchableOpacity>
                <Text
                  onPress={() => dispatch(removeFromBasket({ id: item.id }))}
                  className="text-[#00CCBB] text-xs"
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">
              <Currency quantity={basketTotal} currency="EUR" />
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">
              <Currency quantity={2.99} currency="EUR" />
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text>Order Total</Text>
            <Text className="font-extrabold">
              <Currency quantity={basketTotal + 2.99} currency="EUR" />
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('PreparingOrderScreen')}
            className="rounded-lg bg-[#00CCBB] p-4"
          >
            <Text className="text-center text-white text-lg font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
