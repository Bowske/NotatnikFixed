import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, Alert} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from './context';

const Notepad = ({navigation}) => {
  const [note, setNote] = useState('');
  const [userNewPassword, setUserNewPassword] = useState('');

  useEffect(() => {
    getData('@note_Key');
  }, []);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      Alert.alert('Error', value);
    }
  };
  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value) {
        setNote(value);
      }
    } catch (e) {
      Alert.alert('Error', value);
    }
  };

  return (
    <ScrollView>
      <TextInput
        label="Note"
        multiline
        onChangeText={setNote}
        value={note}
        style={{
          fontSize: 30,
          margin: 20,
        }}
        numberOfLines={8}
      />
      <Button
        style={{marginHorizontal: 20, marginBottom: 60}}
        mode="contained"
        onPress={() => storeData('@note_Key', note)}>
        Save Note
      </Button>
      <TextInput
        style={{marginHorizontal: 20, marginBottom: 20}}
        mode="outlined"
        label="New Password"
        secureTextEntry
        value={userNewPassword}
        onChangeText={setUserNewPassword}
      />
      <Button
        style={{marginHorizontal: 20}}
        mode="contained"
        onPress={() => {
          storeData('@haslo_Key', userNewPassword);
          setUserNewPassword('');
        }}>
        Change Password
      </Button>
    </ScrollView>
  );
};

export default Notepad;

const styles = StyleSheet.create({});
