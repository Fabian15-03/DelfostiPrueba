import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../utils/colors';

export default function ProductCard({
  image,
  title,
  isFavorite,
  price,
  subtitle,
}: {
  image: any;
  title: any;
  isFavorite: any;
  price: any;
  subtitle: any;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.containerImg}>
        <Image source={image} style={styles.image} />
      </View>
      <View style={styles.containertitle}>
        <Text style={styles.title}>{title}</Text>
        <Text>{subtitle}</Text>
      </View>
      <View style={styles.favorite}>
        <MaterialCommunity
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={22}
          color={colors.DELFOSTI}
        />
        <Text style={styles.price}>S/.{price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    marginHorizontal: 20,
    height: 70,
    flexDirection: 'row',
    paddingLeft: 12,
    borderRadius: 20,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    marginVertical: 7,
  },
  containerImg: {
    width: 65,
    height: 65,
    borderRadius: 35,
    overflow: 'hidden',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  containertitle: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: 12,
    width: '50%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  favorite: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    paddingTop: 15,
    fontSize: 16,
    fontWeight: '700',
  },
});
