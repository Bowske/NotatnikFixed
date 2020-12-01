import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {AuthContext} from './context';

const SignIn = ({navigation}) => {
  const [userPassword, setUserPassword] = useState('');
  const {signIn, checkData} = React.useContext(AuthContext);
  return (
    <View style={styles.wrapper}>
      <View style={{width: 300}}>
        <TextInput
          mode="outlined"
          label="Password"
          value={userPassword}
          onChangeText={setUserPassword}
          secureTextEntry
        />
      </View>
      <Button
        style={{margin: 20}}
        icon="login"
        mode="contained"
        onPress={() => {
          signIn(userPassword, navigation);
        }}>
        Log in
      </Button>
      <Button
        style={{margin: 20}}
        icon="login"
        mode="contained"
        onPress={() => {
          checkData();
        }}>
        Check
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
