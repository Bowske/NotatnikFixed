import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

const SignIn = () => {
  return (
    <View style={styles.wrapper}>
      <View style={{width: 300}}>
        <TextInput mode="outlined" style={{marginBottom: 20}} label="Email" />
        <TextInput mode="outlined" label="Password" />
      </View>
      <Button style={{margin: 20}} icon="login" mode="contained">
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
