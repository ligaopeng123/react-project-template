import 'package:flutter/material.dart';
import 'package:persistent_bottom_nav_bar_v2/persistent-tab-view.dart';
// PersistentTabController  PageController
class GlobalStore<T> extends ChangeNotifier {
  late T barTabsController;
  bool _grayTheme = false;

  /// 保存页面控制器
  void saveController(T barTabsCont) =>
      barTabsController = barTabsCont;

  /// 获取BarTabs的Controller控制器
  T get getBarTabsCont => barTabsController;

  /// 是否显示灰度模式主题，true为灰度, false显示原有主题颜色
  bool setGrayTheme([bool flag = false]) {
    _grayTheme = flag;
    notifyListeners();
    return _grayTheme;
  }

  /// 是否是灰度模式
  bool get getGrayTheme => _grayTheme;
}
