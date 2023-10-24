import 'package:flutter/material.dart';

class AppMainStore with ChangeNotifier {
  bool hideNavigationBar = false;

  /// Adds [item] to cart. This and [removeAll] are the only ways to modify the
  /// cart from the outside.
  void setFalse() {
    hideNavigationBar = false;
    notifyListeners();
  }

  /// Removes all items from the cart.
  void setTrue() {
    hideNavigationBar = true;
    // This call tells the widgets that are listening to this model to rebuild.
    notifyListeners();
  }
}
