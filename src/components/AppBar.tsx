import {SafeAreaView, StyleSheet, Text} from 'react-native';
import React from 'react';
import colors from '../utils/colors';

const AppBar = ({userName}: {userName: string}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Bienvenido! - <Text style={styles.user}>{userName}</Text>
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.DELFOSTI,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.WHITE,
  },
  user: {fontSize: 20, fontWeight: 'bold'},
});

export default AppBar;
