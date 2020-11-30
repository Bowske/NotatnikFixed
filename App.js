import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';

import {library} from '@fortawesome/fontawesome-svg-core';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {faEnvelope, faLockOpen} from '@fortawesome/free-solid-svg-icons';
import SignIn from './components/SignIn';
import AsyncStorage from '@react-native-async-storage/async-storage';

library.add(faLockOpen, faEnvelope);

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
