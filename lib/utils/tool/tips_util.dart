import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

class Tips {
  /// tosat常规提示
  static Future<void> info(String text, {ToastGravity? gravity}) async {
    Fluttertoast.showToast(
      msg: text,
      toastLength: Toast.LENGTH_SHORT,
      gravity: gravity ?? ToastGravity.TOP,
      // 提示位置
      webPosition: 'center',
      webShowClose: true,
      fontSize: 18, // 提示文字大小webPosition
    );
  }

  static Future<void> warn(String text, {ToastGravity? gravity}) async {
    Fluttertoast.showToast(
      msg: text,
      textColor: Colors.red,
      toastLength: Toast.LENGTH_SHORT,
      gravity: gravity ?? ToastGravity.TOP,
      // 提示位置
      webPosition: 'center',
      fontSize: 18, // 提示文字大小webPosition
    );
  }
}
