import 'package:flutter/material.dart';
import '../pages/app_main/app_main_web.dart';
import '../pages/events/events.dart';
import 'route_name.dart';
import '../pages/error_page/error_page.dart';
import '../pages/app_main/app_main.dart';
import '../pages/splash/splash.dart';
import '../pages/test_demo/test_demo.dart';
import '../pages/Login/Login.dart';
import '../pages/change_password/change_password_page.dart';

final String initialRoute = RouteName.splashPage; // 初始默认显示的路由

final Map<String,
        StatefulWidget Function(BuildContext context, {dynamic params})>
    routesData = {
  // 页面路由定义...
  RouteName.appMain: (context, {params}) => AppMain(params: params),
  RouteName.appMainWeb: (context, {params}) => AppMainWeb(params: params),
  /// 事件路由
  RouteName.events: (context, {params}) => Events(params: params),
  RouteName.splashPage: (context, {params}) => SplashPage(),
  RouteName.error: (context, {params}) => ErrorPage(params: params),
  RouteName.testDemo: (context, {params}) => TestDemo(params: params),
  RouteName.login: (context, {params}) => Login(params: params),
  RouteName.changePassword: (context, {params}) => ChangePassWordPage(),
};
