import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, Alert} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notepad = () => {
  const [note, setNote] = useState('');
  const [userNewPassword, setUserNewPassword] = useState('');

  useEffect(() => {
    getData('@note_Key');
    fetchMostUsed();
  }, []);

  const fetchMostUsed = () => {
    fetch('mostUsed.txt')
      .then((response) => response.text())
      .then((text) => console.log(text))
      .catch((e) => console.log(e));
  };

  const checkPassword = (pass) => {
    if (pass.length < 8) {
      Alert.alert('Password too short');
      return 0;
    }
    return 1;
  };

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
        onPress={() =>
          storeData('@note_Key', note).then(Alert.alert('Note Saved'))
        }>
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
          if (checkPassword(userNewPassword)) {
            storeData('@haslo_Key', userNewPassword).then(
              Alert.alert('Password changed successfully'),
            );
            setUserNewPassword('');
          }
        }}>
        Change Password
      </Button>
    </ScrollView>
  );
};

export default Notepad;

const styles = StyleSheet.create({});
