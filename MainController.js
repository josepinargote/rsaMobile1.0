var Modulo = angular.module('Modulo1',[])

Modulo.controller('Controlador1', function($scope) {

    $scope.claveEncriptada = "";    

    function RsaEncrypt() {
        //a public key generated from their sample.
        //your should generate yours and stamp it here
        debugger;     

        // Text to encrypt and decrypt.
        var text = "mavila";
        // Use OAEP padding (PKCS#1 v2).
        var doOaepPadding = true;
        // RSA 512-bit key: Public (Modulus), Private (D) and CRT (P, Q, DP, DQ, InverseQ).
        var xmlParams =
            "<RSAKeyValue>" +
                "<Modulus>s6lpjspk+3o2GOK5TM7JySARhhxE5gB96e9XLSSRuWY2W9F951MfistKRzVtg0cjJTdSk5mnWAVHLfKOEqp8PszpJx9z4IaRCwQ937KJmn2/2VyjcUsCsor+fdbIHOiJpaxBlsuI9N++4MgF/jb0tOVudiUutDqqDut7rhrB/oc=</Modulus>" +
                "<Exponent>AQAB</Exponent>" +
                "<P>3J2+VWMVWcuLjjnLULe5TmSN7ts0n/TPJqe+bg9avuewu1rDsz+OBfP66/+rpYMs5+JolDceZSiOT+ACW2Neuw==</P>" +
                "<Q>0HogL5BnWjj9BlfpILQt8ajJnBHYrCiPaJ4npghdD5n/JYV8BNOiOP1T7u1xmvtr2U4mMObE17rZjNOTa1rQpQ==</Q>" +
                "<DP>jbXh2dVQlKJznUMwf0PUiy96IDC8R/cnzQu4/ddtEe2fj2lJBe3QG7DRwCA1sJZnFPhQ9svFAXOgnlwlB3D4Gw==</DP>" +
                "<DQ>evrP6b8BeNONTySkvUoMoDW1WH+elVAH6OsC8IqWexGY1YV8t0wwsfWegZ9IGOifojzbgpVfIPN0SgK1P+r+kQ==</DQ>" +
                "<InverseQ>LeEoFGI+IOY/J+9SjCPKAKduP280epOTeSKxs115gW1b9CP4glavkUcfQTzkTPe2t21kl1OrnvXEe5Wrzkk8rA==</InverseQ>" +
                "<D>HD0rn0sGtlROPnkcgQsbwmYs+vRki/ZV1DhPboQJ96cuMh5qeLqjAZDUev7V2MWMq6PXceW73OTvfDRcymhLoNvobE4Ekiwc87+TwzS3811mOmt5DJya9SliqU/ro+iEicjO4v3nC+HujdpDh9CVXfUAWebKnd7Vo5p6LwC9nIk=</D>" +
            "</RSAKeyValue>";
        // ------------------------------------------------
        // RSA Keys
        // ------------------------------------------------
        var rsa = new System.Security.Cryptography.RSACryptoServiceProvider();
        // Import parameters from XML string.
        rsa.FromXmlString(xmlParams);
        // Export RSA key to RSAParameters and include:
        //    false - Only public key required for encryption.
        //    true  - Private key required for decryption.
        // Export parameters and include only Public Key (Modulus + Exponent) 
        // required for encryption.
        var rsaParamsPublic = rsa.ExportParameters(false);
        // Export Public Key (Modulus + Exponent) and include Private Key (D) 
        // required for decryption.
        var rsaParamsPrivate = rsa.ExportParameters(true);
        // ------------------------------------------------
        // Encrypt
        // ------------------------------------------------
        var decryptedBytes = System.Text.Encoding.UTF8.GetBytes(text);
        // Create a new instance of RSACryptoServiceProvider.
        rsa = new System.Security.Cryptography.RSACryptoServiceProvider();
        // Import the RSA Key information.
        rsa.ImportParameters(rsaParamsPublic);
        // Encrypt byte array.
        var encryptedBytes = rsa.Encrypt(decryptedBytes, doOaepPadding);
        // Convert bytes to base64 string.
        var encryptedString = System.Convert.ToBase64String(encryptedBytes);
        // ------------------------------------------------
        // Decrypt
        // ------------------------------------------------
        // Convert base64 string back to bytes.
        encryptedBytes = System.Convert.FromBase64String(encryptedString);
        // Create a new instance of RSACryptoServiceProvider.
        rsa = new System.Security.Cryptography.RSACryptoServiceProvider();
        // Import the RSA Key information.
        rsa.ImportParameters(rsaParamsPrivate);
        // Decrypt byte array.
        decryptedBytes = rsa.Decrypt(encryptedBytes, doOaepPadding);
        // Get decrypted data.
        text = System.Text.Encoding.UTF8.GetString(decryptedBytes);
        // ------------------------------------------------
        // Generate new RSA Key pair
        // ------------------------------------------------
        // Specify RSA key size.
        var keySize = 512;
        // Create a new instance of RSACryptoServiceProvider.
        rsa = new System.Security.Cryptography.RSACryptoServiceProvider(keySize);
        // Export the RSA Key information as XML string.
        //    false - Only public key required for encryption.
        //    true  - Private key required for decryption.
        xmlParams = rsa.ToXmlString(true);

        $scope.claveEncriptada = encryptedString;
        $scope.claveDesencriptada = text;
        
    }    

    function StringBuilder() {
        var strings = [];

        this.append = function (string) {
            string = verify(string);
            if (string.length > 0) strings[strings.length] = string;
        };

        this.appendLine = function (string) {
            string = verify(string);
            if (this.isEmpty()) {
                if (string.length > 0) strings[strings.length] = string;
                else return;
            }
            else strings[strings.length] = string.length > 0 ? "\r\n" + string : "\r\n";
        };

        this.clear = function () { strings = []; };

        this.isEmpty = function () { return strings.length == 0; };

        this.toString = function () { return strings.join(""); };

        var verify = function (string) {
            if (!defined(string)) return "";
            if (getType(string) != getType(new String())) return String(string);
            return string;
        };

        var defined = function (el) {
            // Changed per Ryan O'Hara's comment:
            return el != null && typeof (el) != "undefined";
        };

        var getType = function (instance) {
            if (!defined(instance.constructor)) throw Error("Unexpected object type");
            var type = String(instance.constructor).match(/function\s+(\w+)/);

            return defined(type) ? type[1] : "undefined";
        };
    };

    RsaEncrypt();

});

