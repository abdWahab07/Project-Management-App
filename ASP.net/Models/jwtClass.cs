using System;
using System.Security.Cryptography;

public static class KeyGenerator
{
    public static string GenerateSecretKey(int size = 32)
    {
        using (var rng = new RNGCryptoServiceProvider())
        {
            var key = new byte[size];
            rng.GetBytes(key);
            return Convert.ToBase64String(key);
        }
    }
}
