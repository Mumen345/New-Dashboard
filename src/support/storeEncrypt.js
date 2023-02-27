import CryptoJS from "crypto-js";

export default {
    encrypt: (payload, cipher = 'da452') => {
        return CryptoJS.AES.encrypt(JSON.stringify(payload), cipher).toString();
    },

    decrypt: (payload, cipher = 'da452') => {
        return JSON.parse(CryptoJS.AES.decrypt(payload, cipher).toString(CryptoJS.enc.Utf8));
    }
}