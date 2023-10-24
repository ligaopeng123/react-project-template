import 'package:flutter/material.dart';

class ServerHomeStore with ChangeNotifier {
  late List data = [];

  setList(value) {
    data = value;
    notifyListeners();
  }
}
