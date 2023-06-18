import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../utils/colors';

type ButtonProps = {
  text: string;
  onPress: () => void;
  type: 'login' | 'signOut';
};

export default function Button({text, onPress, type}: ButtonProps) {
  const buttonStyle =
    type === 'login'
      ? styles.buttonTypeLogin
      : type === 'signOut'
      ? styles.buttonTypesignOut
      : {};

  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.txtbtn]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    alignItems: 'center',
    paddingVertical: 16,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
  },
  buttonTypeLogin: {
    backgroundColor: colors.DELFOSTI,
  },
  buttonTypesignOut: {
    backgroundColor: 'red',
  },
  txtbtn: {
    fontWeight: '600',
    color: colors.WHITE,
  },
});
