/* eslint-disable @typescript-eslint/no-shadow */
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import ProductCard from '../components/ProductCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import Button from '../components/Button';

interface Product {
  _id: string;
  name: string;
  image: any;
  price: number;
  subitle: string;
}

export default function Favorites() {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadFavorites();
    }
  }, [isFocused]);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.log('Error loading favorites from AsyncStorage:', error);
    }
  };

  const removeFavorite = async (productId: string) => {
    const updatedFavorites = favorites.filter(item => item._id !== productId);
    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
  };

  const saveFavorites = async (favorites: Product[]) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.log('Error saving favorites to AsyncStorage:', error);
    }
  };

  return (
    <SafeAreaView>
      <Text style={styles.text}>Tus Favoritos</Text>
      <ScrollView style={styles.scroll}>
        {favorites.map((product, index) => (
          <TouchableOpacity
            key={product._id}
            onPress={() => removeFavorite(product._id)}>
            <ProductCard
              key={index}
              image={product.image}
              title={product.name}
              price={product.price}
              subtitle={product.subitle}
              isFavorite={true}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.btn}>
        <Button
          type="signOut"
          text="Cerrar Sesion"
          onPress={() => {
            console.log('Cerrar sesion , go login');
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 25,
  },
  scroll: {marginVertical: 20, height: '75%'},
  btn: {marginTop: 5, marginHorizontal: 40},
});
