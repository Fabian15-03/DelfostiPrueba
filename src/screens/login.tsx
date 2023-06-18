import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isEmpty} from 'lodash';

//Importando Utils y Components.
import colors from '../utils/colors';
import Button from '../components/Button';

interface LoginProps {
  onLogin: (auth: boolean) => void;
}

interface ListUser {
  username: string;
  password: string;
  nombresApellidos: string;
}

const ListaUsuario: ListUser[] = [
  {
    username: 'user_one',
    password: '123456',
    nombresApellidos: 'Usuario Número 1',
  },
  {
    username: 'user_two',
    password: '987654',
    nombresApellidos: 'Usuario Número 2',
  },
];

const Login = ({onLogin}: LoginProps) => {
  const [user, setuser] = useState('');
  const [pass, setpass] = useState('');
  const [show, setshow] = useState(true);

  // Iniciar sesion y validaciones
  const IniciarSesion = () => {
    const foundUser = ListaUsuario.find(
      usuarios => usuarios.username === user && usuarios.password === pass,
    );
    if (!foundUser) {
      if (isEmpty(user) || isEmpty(pass)) {
        Alert.alert('Debe ingresar los valores de usuario y contraseña');
      }
      if (user !== user.toLowerCase() || pass !== pass.toLowerCase()) {
        Alert.alert(
          'Error',
          'El usuario y la contraseña no deben contener mayusculas.',
        );
      } else {
        Alert.alert('El usuario o la contraseña con incorrectos');
      }
    } else {
      onLogin(true);
      AsyncStorage.setItem('username', foundUser.nombresApellidos);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Image
          source={require('../assets/Logos/delfostiLogo.png')}
          style={styles.logo}
        />
        <Text style={styles.topText}>Bienvenido!</Text>
        <Text style={styles.bottomText}>
          Inicia sesión con tus credenciales.
        </Text>
      </View>
      <View style={styles.bottom}>
        <View style={styles.user}>
          <MaterialCommunity name="account" size={28} />
          <TextInput
            placeholder="Ingresa tu Usuario"
            style={styles.input}
            secureTextEntry={false}
            onChangeText={text => {
              setuser(text);
            }}
            value={user}
          />
        </View>
        <View style={styles.password}>
          <MaterialCommunity name="lock" size={28} />
          <TextInput
            placeholder="Ingresa tu contraseña"
            style={styles.input2}
            secureTextEntry={show}
            onChangeText={text => {
              setpass(text);
            }}
            value={pass}
          />
          <MaterialCommunity
            name={show ? 'eye-outline' : 'eye-off-outline'}
            size={28}
            style={{marginLeft: 15}}
            color={colors.SECUNDARIO}
            onPress={() => setshow(!show)}
          />
        </View>
        {/*<View style={styles.onRegister}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => IniciarSesion()}>
              <Text style={styles.text}>INGRESAR</Text>
              </TouchableOpacity>
          </View>*/}

        <View style={{marginTop: 60}}>
          <Button
            text="Iniciar Sesión"
            type="login"
            onPress={() => IniciarSesion()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  card: {
    height: '100%',
    borderRadius: 20,
    backgroundColor: colors.WHITE,
    marginHorizontal: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
  },
  top: {
    marginTop: 60,
    paddingHorizontal: 30,
  },
  topText: {
    color: colors.BLACK,
    fontWeight: 'bold',
    fontSize: 36,
    marginTop: 12,
  },
  bottomText: {
    color: colors.BLACK,
    fontWeight: '400',
    fontSize: 18,
    marginTop: 12,
  },
  bottom: {
    paddingHorizontal: 28,
  },
  user: {
    width: '95%',
    marginTop: 40,
    alignSelf: 'center',
    borderBottomColor: colors.BLACK,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  password: {
    width: '95%',
    marginTop: 40,
    alignSelf: 'center',
    borderBottomColor: colors.BLACK,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  input: {
    width: '70%',
    height: 30,
    marginLeft: 12,
  },
  input2: {
    width: '70%',
    height: 30,
    marginLeft: 12,
  },
  logo: {
    width: 120,
    height: 60,
    resizeMode: 'cover',
  },
});
