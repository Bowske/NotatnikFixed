import React, {useState, useEffect} from 'react';
import {ScrollView, Alert} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import encryptionFuncs from './../utils/encryptionFuncs';

//TODO:  PODAJ KLUCZ W PROPSACH Z LOGINU DO NOTATKI
const Notepad = ({route, navigation}) => {
  const [note, setNote] = useState('');
  const [userNewPassword, setUserNewPassword] = useState('');
  const [clickableValue, setClickableValue] = useState(true);
  const {pbkey} = route.params;

  useEffect(() => {
    const fetchAndDecryptNote = async () => {
      if (pbkey) {
        const cipher = await getData('@note_Key');
        const iv = encryptionFuncs.getIV(pbkey);
        const decryptedNote = await encryptionFuncs.decryptData(
          {cipher, iv},
          pbkey,
        );
        setNote(decryptedNote);
      }
    };
    const isPassInStorage = async () => {
      const pass = await getData('@haslo_Key');
      if (pass) {
        setClickableValue(true);
      } else {
        setClickableValue(false);
      }
    };
    isPassInStorage();
    fetchAndDecryptNote();
  }, []);

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
      console.log(e);
    }
  };

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
  const storeNote = () => {
    encryptionFuncs.encryptData(note, pbkey).then(({cipher, iv}) => {
      storeData('@note_Key', cipher).then(Alert.alert('Note Saved'));
    });
  };

  const newPasswordProcessing = async () => {
    try {
      if (checkPassword(userNewPassword)) {
        let salt = await encryptionFuncs.generateSalt();
        await storeData('@salt_Key', salt);
        encryptionFuncs
          .generateKey(userNewPassword, salt, 5000, 256)
          .then((key) => {
            if (note) {
              encryptionFuncs.encryptData(note, key).then(({cipher}) => {
                storeData('@note_Key', cipher);
              });
            }
            encryptionFuncs
              .encryptData(userNewPassword, key)
              .then(({cipher}) => {
                storeData('@haslo_Key', cipher).then(
                  Alert.alert('Password changed successfully'),
                  setClickableValue(true),
                  navigation.navigate('SignIn'),
                );
                setUserNewPassword('');
              })
              .catch((error) => {
                console.log(error);
              });
          });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ScrollView>
      <TextInput
        label="Note"
        multiline
        disabled={!clickableValue}
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
        disabled={!clickableValue}
        onPress={() => storeNote()}>
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
        onPress={() => newPasswordProcessing()}>
        Change Password
      </Button>
    </ScrollView>
  );
};

export default Notepad;
