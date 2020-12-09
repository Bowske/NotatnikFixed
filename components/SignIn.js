import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import encryptionFuncs from '../utils/encryptionFuncs.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = ({navigation}) => {
  const textRef = useRef();
  const [userPassword, setUserPassword] = useState('');
  const [disabledInput, setDisabledInput] = useState(false);

  useEffect(() => {
    const isPassInStorage = async () => {
      const pass = await getData('@haslo_Key');
      if (pass) {
        setDisabledInput(false);
      } else {
        setDisabledInput(true);
      }
    };
    const unsubscribe = navigation.addListener('focus', () => {
      isPassInStorage();
    });

    return unsubscribe;
  }, [navigation]);

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value) {
        return value;
      }
    } catch (e) {
      console.log('There is no data to get');
    }
  };

  const signIn = (paswd, navigation) => {
    getData('@haslo_Key').then(async (value) => {
      if (value) {
        let salt = await getData('@salt_Key');
        encryptionFuncs.generateKey(paswd, salt, 5000, 256).then((key) => {
          console.log('Key from sign in: ', key);
          encryptionFuncs.encryptData(paswd, key).then(({cipher, iv}) => {
            cipher = value;
            encryptionFuncs
              .decryptData({cipher, iv}, key)
              .then((text) => {
                if (text == paswd) {
                  navigation.navigate('Notepad', {
                    pbkey: key,
                  });
                }
              })
              .catch((error) => {
                Alert.alert('Wrong Password');
              });
          });
        });
      } else {
        navigation.navigate('Notepad', {
          pbkey: '',
        });
      }
    });
  };

  return (
    <View style={styles.wrapper}>
      <View style={{width: 300}}>
        <TextInput
          ref={textRef}
          mode="outlined"
          label="Password"
          value={userPassword}
          onChangeText={setUserPassword}
          secureTextEntry
          disabled={disabledInput}
        />
      </View>
      <Button
        style={{margin: 20}}
        icon="login"
        mode="contained"
        onPress={() => {
          signIn(userPassword, navigation);
          setUserPassword('');
        }}>
        Log in
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignIn;
