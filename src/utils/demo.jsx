 function doEncrypt(pwd) {
        var keyX = '9D18DCF9A4C04E12FFFF68A5A43AE321D56E2E693B4DBAB6CBE263EA156B81B9';
        var keyY = '68864B894038382F7649B088733CB9F4DE322953CC81C58FC76F28BC96D43AE7';

       

        var msgData = CryptoJS.enc.Utf8.parse(pwd);
        var cipherMode = SM2CipherMode.C1C3C2;
        var cipher = new SM2Cipher(cipherMode);
        if( keyX && keyY){
            var userKey = cipher.CreatePoint(keyX, keyY);
        } else{
            loadPublicKey();
             var userKey = cipher.CreatePoint(keyX, keyY);
        }
        msgData = cipher.GetWords(msgData.toString());
        var encryptData = cipher.Encrypt(userKey, msgData);
        return encryptData.toUpperCase();
    }