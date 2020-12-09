import {NativeModules} from 'react-native';
let Aes = NativeModules.Aes;

const encryptionFuncs = {
  generateKey: function (password, salt, cost, length) {
    return Aes.pbkdf2(password, salt, cost, length);
  },
  encryptData: function (text, key) {
    let iv = key.substring(32, 64);
    return Aes.encrypt(text, key, iv).then((cipher) => ({
      cipher,
      iv,
    }));
  },
  decryptData: function (encryptedData, key) {
    return Aes.decrypt(encryptedData.cipher, key, encryptedData.iv);
  },
  generateSalt: function () {
    return Aes.randomKey(16);
  },
};

export default encryptionFuncs;
