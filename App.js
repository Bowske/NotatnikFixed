import React, {useState, useEffect} from 'react';
import {StyleSheet, StatusBar, Alert} from 'react-native';
import {library} from '@fortawesome/fontawesome-svg-core';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {faEnvelope, faLockOpen} from '@fortawesome/free-solid-svg-icons';
import SignIn from './components/SignIn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from './components/context';
import Notepad from './components/Notepad';
import encryptionFuncs from './utils/encryptionFuncs.js';

library.add(faLockOpen, faEnvelope);
const Stack = createStackNavigator();

const App = () => {
  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value) {
        return value;
      }
    } catch (e) {
      Alert.alert('Error', value);
    }
  };

  //TODO:  NOTYFIKACJE O UDANYCH PROBACH
  const authContext = React.useMemo(
    () => ({
      signIn: (paswd, navigation) => {
        getData('@haslo_Key').then((value) => {
          if (value) {
            encryptionFuncs.generateKey(paswd, '123', 5000, 256).then((key) => {
              encryptionFuncs.encryptData(paswd, key).then(({cipher, iv}) => {
                encryptionFuncs
                  .decryptData2({value, iv}, key)
                  .then((text) => {
                    if (text == paswd) {
                      navigation.navigate('Notepad');
                    }
                  })
                  .catch((error) => {
                    Alert.alert('Wrong Password');
                  });
              });
            });
          } else {
            navigation.navigate('Notepad');
          }
        });
      },
    }),
    [],
  );

  return (
    <>
      <AuthContext.Provider value={authContext}>
        <StatusBar barStyle="dark-content" backgroundColor="#7929ED" />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{
                title: 'Login',
                headerStyle: {
                  backgroundColor: '#7929ED',
                },
                headerTitleAlign: 'center',
              }}></Stack.Screen>
            <Stack.Screen
              name="Notepad"
              component={Notepad}
              options={{
                title: 'Notepad',
                headerStyle: {
                  backgroundColor: '#7929ED',
                },
                headerTitleAlign: 'center',
              }}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
