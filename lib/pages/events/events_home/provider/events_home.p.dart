import 'package:flutter/material.dart';

class Events_homeStore with ChangeNotifier {
  late List<dynamic> appEventStatTodayList = [];

  setList(value) {
    appEventStatTodayList = value;
    notifyListeners();
  }
}
