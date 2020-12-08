import {NativeModules} from 'react-native';
var Aes = NativeModules.Aes;

const encryptionFuncs = {
  generateKey: function (password, salt, cost, length) {
    return Aes.pbkdf2(password, salt, cost, length);
  },
  encryptData: function (text, key) {
    return Aes.randomKey(16).then((iv) => {
      return Aes.encrypt(text, key, iv).then((cipher) => ({
        cipher,
        iv,
      }));
    });
  },
  decryptData: function (encryptedData, key) {
    return Aes.decrypt(encryptedData.cipher, key, encryptedData.iv);
  },
};

export default encryptionFuncs;
