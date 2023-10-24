import 'package:flutter/material.dart';

class Device_homeStore with ChangeNotifier {
  late List<dynamic> appDeviceStatBeanList = [];

  setList(value) {
    appDeviceStatBeanList = value;
    notifyListeners();
  }
}
