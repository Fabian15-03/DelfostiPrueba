import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

//Import Components
import AppBar from '../components/AppBar';
import ProductCard from '../components/ProductCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import colors from '../utils/colors';

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  subitle: string;
}

const products: Product[] = [
  {
    _id: '1',
    name: 'Guantes',
    image: require('./../assets/guantes.jpeg'),
    price: 119.99,
    subitle: 'Deportes',
  },
  {
    _id: '2',
    name: 'Producto 2',
    image: require('./../assets/bicicleta.jpeg'),
    price: 699.99,
    subitle: 'Deportes',
  },
  {
    _id: '3',
    name: 'Casco de box ',
    image: require('./../assets/cascodebox.jpeg'),
    price: 80.95,
    subitle: 'Deportes',
  },
  {
    _id: '4',
    name: 'iPhone 14 pro',
    image: require('./../assets/iphone14.jpeg'),
    price: 4199.99,
    subitle: 'Celulares',
  },
  {
    _id: '5',
    name: 'Mando Xbox',
    image: require('./../assets/mandoxbox.jpeg'),
    price: 329.95,
    subitle: 'Entretenimiento',
  },
  {
    _id: '6',
    name: 'Polo Adidas',
    image: require('./../assets/poloadidas.jpeg'),
    price: 59.99,
    subitle: 'Vestimenta',
  },
  {
    _id: '7',
    name: 'Play Station 5',
    image: require('./../assets/ps5.jpeg'),
    price: 2219.99,
    subitle: 'Entretenimiento',
  },
  {
    _id: '8',
    name: 'Saco de box',
    image: require('./../assets/sacoleone.jpeg'),
    price: 129.99,
    subitle: 'Deportes',
  },
  {
    _id: '9',
    name: 'Scooter',
    image: require('./../assets/scooter.jpeg'),
    price: 879.99,
    subitle: 'Gadgets',
  },
  {
    _id: '10',
    name: 'Skate',
    image: require('./../assets/skate.jpeg'),
    price: 109.99,
    subitle: 'Deportes',
  },
];

const itemsPerPage = 6;

export default function Home() {
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [username, setUsername] = useState('');
  // Obtiene los elementos correspondientes a la página actual
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = products.slice(startIndex, endIndex);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadFavorites();
    }
  }, [isFocused]);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername !== null) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.log('Error retrieving username from AsyncStorage:', error);
      }
    };

    fetchUsername();
  }, []);

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

  const saveFavorites = async (updatedFavorites: Product[]) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.log('Error saving favorites to AsyncStorage:', error);
    }
  };

  const toggleFavorite = (productId: string) => {
    const isFavorite = favorites.some(item => item._id === productId);
    if (isFavorite) {
      const updatedFavorites = favorites.filter(item => item._id !== productId);
      setFavorites(updatedFavorites);
      saveFavorites(updatedFavorites);
    } else {
      const product = products.find(item => item._id === productId);
      if (product) {
        const updatedFavorites = [...favorites, product];
        setFavorites(updatedFavorites);
        saveFavorites(updatedFavorites);
      }
    }
  };

  return (
    <SafeAreaView>
      <AppBar userName={username} />
      <View style={styles.header}>
        <Text style={styles.text1}>Encuentra los</Text>
        <Text style={styles.text2}>Mejores Productos</Text>
      </View>
      <ScrollView>
        {itemsToDisplay.map(product => (
          <TouchableOpacity
            onPress={() => toggleFavorite(product._id)}
            key={product._id}>
            <ProductCard
              image={product.image}
              title={product.name}
              price={product.price}
              subtitle={product.subitle}
              isFavorite={favorites.some(item => item._id === product._id)}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          onPress={() => setPage(1)}
          disabled={page === 1}
          style={[styles.pageButton, page === 1 && styles.disabledButton]}>
          <Text style={styles.pageButtonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setPage(2)}
          disabled={endIndex > products.length}
          style={[
            styles.pageButton,
            endIndex > products.length && styles.disabledButton,
          ]}>
          <Text style={styles.pageButtonText}>2</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  pageButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.GRAY,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  disabledButton: {
    backgroundColor: colors.BLACK,
  },
  pageButtonText: {
    color: colors.WHITE,
    fontWeight: 'bold',
    fontSize: 16,
  },
  header: {marginVertical: 20, marginLeft: 15},
  text1: {fontSize: 20, fontWeight: '700'},
  text2: {fontSize: 26, fontWeight: 'bold', color: colors.DELFOSTI},
});
