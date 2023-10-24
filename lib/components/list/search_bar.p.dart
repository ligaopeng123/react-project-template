import 'package:flutter/material.dart';

class SearchBarStore with ChangeNotifier {
  late List<dynamic> appDeviceStatBeanList = [];

  setList(value) {
    appDeviceStatBeanList = value;
    notifyListeners();
  }
}
