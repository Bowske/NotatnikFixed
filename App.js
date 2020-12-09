import React from 'react';
import {StatusBar} from 'react-native';
import {library} from '@fortawesome/fontawesome-svg-core';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {faEnvelope, faLockOpen} from '@fortawesome/free-solid-svg-icons';
import SignIn from './components/SignIn';
import Notepad from './components/Notepad';

library.add(faLockOpen, faEnvelope);
const Stack = createStackNavigator();

const App = () => {
  //TODO:  PODAJ KLUCZ W PROPSACH Z LOGINU DO NOTATKI

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
    </>
  );
};

export default App;
