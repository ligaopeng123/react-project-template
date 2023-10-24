import 'package:encrypt/encrypt.dart';
import 'package:flutter/services.dart' show rootBundle;

Future<String> encode(String str) async {
  final publicKeyStr = await rootBundle.loadString('asset/pem/public.pem');
  dynamic publicKey = RSAKeyParser().parse(publicKeyStr);
  final encrypter = Encrypter(RSA(publicKey: publicKey));
  return await encrypter.encrypt(str).base64;
}


Future<String> decode(String str) async{
  var privateKeyStr = await rootBundle.loadString('asset/pem/public.pem');
  dynamic privateKey =  RSAKeyParser().parse(privateKeyStr);
  final encrypter = Encrypter(RSA(privateKey: privateKey));
  return await encrypter.decrypt(Encrypted.fromBase64(str));
}