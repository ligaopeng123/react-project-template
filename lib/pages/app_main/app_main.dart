import 'package:ana_page_loop/observer/ana_controller_obs.dart';
import 'package:ana_page_loop/observer/analytics_obs.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/rendering.dart';
import '../devices/device.dart';
import '../events/events.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:jh_debug/jh_debug.dart';
import 'package:provider/provider.dart';
import '../../routes/generate_route.dart';
import '../../routes/route_name.dart';
import '../../components/update_app/check_app_version.dart'
    show checkAppVersion;
import '../../config/app_env.dart' show appEnv, ENV;
import '../../config/app_config.dart';
import '../../components/exit_app_interceptor/exit_app_interceptor.dart';
import '../../provider/global.p.dart';
import '../../utils/tool/water_mark.dart';
import 'dashboard/dashboard.dart';
import 'my_all/my_all.dart';
import 'package:persistent_bottom_nav_bar_v2/persistent-tab-view.dart';
import './app_amin.p.dart';

/// [params] 别名路由传递的参数
/// [params.pageId] 跳转到指定tab页面（0第一页），如果不是别名路由跳转的话，又想实现跳转到指定tab页面，推荐别名路由跳转方式。
///```dart
/// // 手动传入参数跳转路由方式如下：
/// Navigator.of(context).push(
///   MaterialPageRoute(
///     builder: (context) => BarTabs(
///       params: {'pageId': 2}, // 跳转到tabs的第三个页面
///     ),
///   )
/// );
///
/// // 别名路由跳转方式如下：
/// Navigator.pushNamed(context, '/testDemo', arguments: {
///   'pageId': 2,
/// });
/// ```
class AppMain extends StatefulWidget {
  final dynamic params;

  const AppMain({
    Key? key,
    this.params,
  }) : super(key: key);

  @override
  State<AppMain> createState() => _AppMainState();

  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties.add(DiagnosticsProperty('params', params));
  }
}

// final _AppMainStore = AppMainStore();

class MyNavigatorObserver extends NavigatorObserver {
  @override
  void didPush(Route<dynamic> route, Route<dynamic>? previousRoute) {
    print('didPush: ${route.settings.name}');
    if (route.settings.name == '/appMain') {
      // _AppMainStore.setFalse();
    } else {
      // _AppMainStore.setTrue();
    }
  }

  @override
  void didPop(Route<dynamic> route, Route<dynamic>? previousRoute) {
    print('didPop: ${route.settings.name}');
  }

  @override
  void didRemove(Route<dynamic> route, Route<dynamic>? previousRoute) {
    print('didRemove: ${route.settings}');
  }

  @override
  void didReplace({Route<dynamic>? newRoute, Route<dynamic>? oldRoute}) {
    print(
        'didReplace: ${oldRoute?.settings.name} -> ${newRoute?.settings.name}');
  }
}

class _AppMainState extends State<AppMain> with AutomaticKeepAliveClientMixin {
  int currentIndex = 0; // 接收bar当前点击索引
  bool physicsFlag = true; // 是否禁止左右滑动跳转tab
  late GlobalStore appPageStore;
  late PersistentTabController pageController;

  @override
  bool get wantKeepAlive => true;

  // app主页底部bar
  final List<Map<String, dynamic>> appBottomBar = [
    {
      'title': '首页',
      'icon': CupertinoIcons.house_alt,
      'switcher_icon': CupertinoIcons.house_alt_fill,
      'body': Dashboard(),
    },
    {
      'title': '设备',
      'icon': CupertinoIcons.photo_camera,
      'switcher_icon': CupertinoIcons.photo_camera_solid,
      'body': Device(),
    },
    {
      'title': '事件',
      'icon': CupertinoIcons.search_circle,
      'switcher_icon': CupertinoIcons.search_circle_fill,
      'body': Events(),
    },
    {
      'title': '我的',
      'icon': CupertinoIcons.person_circle,
      'switcher_icon': CupertinoIcons.person_circle_fill,
      'body': My_all(),
    },
  ];

  bool hideNavigationBar = false;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
  }

  @override
  void initState() {
    super.initState();
    // _AppMainStore.addListener(() {
    //   setState(() {
    //     print(_AppMainStore.hideNavigationBar);
    //     hideNavigationBar = _AppMainStore.hideNavigationBar;
    //   });
    // });
    handleCurrentIndex();
    initTools();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      appPageStore.saveController(pageController);

      if (AppConfig.showJhDebugBtn) {
        jhDebug.showDebugBtn(); // jhDebug 调试按钮
      }

      checkAppVersion(); // 更新APP版本检查

      /// 调试阶段，直接跳过此组件
      if (AppConfig.notSplash &&
          AppConfig.directPageName.isNotEmpty &&
          AppConfig.directPageName != RouteName.appMain) {
        Navigator.pushNamed(context, AppConfig.directPageName);
      }
    });
  }

  @override
  void dispose() {
    pageController.dispose();
    FocusScope.of(context).requestFocus(FocusNode()); // 选择焦点，收起键盘效果
    super.dispose();
  }

  /// 处理tab默认显示索引
  handleCurrentIndex() {
    if (widget.params != null) {
      // 默认加载页面
      if ((widget.params["pageId"] ?? 0) as int >= appBottomBar.length) {
        currentIndex = (appBottomBar.length - 1);
      } else {
        currentIndex = widget.params['pageId'] as int;
      }
    }
    // 初始化tab控制器
    pageController = PersistentTabController(initialIndex: currentIndex);
  }

  /// 初始化第三方插件插件
  initTools() {
    // jhDebug插件初始化
    jhDebug.init(
      context: context,
      btnTitle1: '开发',
      btnTap1: () {
        appEnv.setEnv = ENV.DEV;
        AppConfig.host = appEnv.baseUrl;
      },
      btnTitle2: '调试',
      btnTap2: () {},
      btnTitle3: '生产',
      btnTap3: () {
        appEnv.setEnv = ENV.PROD;
        AppConfig.host = appEnv.baseUrl;
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    super.build(context);
    appPageStore = Provider.of<GlobalStore>(context);
    // ColorFiltered 导致圆环不圆
    return kIsWeb
        ? _scaffoldBody()
        : ColorFiltered(
            colorFilter: ColorFilter.mode(
              appPageStore.getGrayTheme
                  ? const Color(0xff757575)
                  : Colors.transparent,
              BlendMode.color,
            ),
            child: _scaffoldBody(),
          );
  }

  /// 页面Scaffold层组件
  Widget _scaffoldBody() {
    buildWhiteWatermark(context);
    return Scaffold(
      body: Stack(
        alignment: Alignment.bottomCenter,
        children: <Widget>[
          PersistentTabView(
            context,
            controller: pageController,
            screens: bodyWidget(),
            items: _navBarsItems(),
            hideNavigationBar: hideNavigationBar,
            confineInSafeArea: true,
            backgroundColor: Colors.white,
            // Default is Colors.white.
            handleAndroidBackButtonPress: true,
            // Default is true.
            resizeToAvoidBottomInset: true,
            // This needs to be true if you want to move up the screen when keyboard appears. Default is true.
            stateManagement: true,
            // Default is true.
            hideNavigationBarWhenKeyboardShows: true,
            // Recommended to set 'resizeToAvoidBottomInset' as true while using this argument. Default is true.
            decoration: NavBarDecoration(
              borderRadius: BorderRadius.circular(10.0),
              colorBehindNavBar: Colors.white,
            ),
            popAllScreensOnTapOfSelectedTab: true,
            popActionScreens: PopActionScreensType.all,
            itemAnimationProperties: ItemAnimationProperties(
              // Navigation Bar's items animation properties.
              duration: Duration(milliseconds: 200),
              curve: Curves.ease,
            ),
            screenTransitionAnimation: ScreenTransitionAnimation(
              // Screen transition animation on change of selected tab.
              animateTabTransition: true,
              curve: Curves.ease,
              duration: Duration(milliseconds: 200),
            ),
            navBarStyle: NavBarStyle.style8,
            onItemSelected: (v) {
              print(v);
            }, // Choose the nav bar style with this property.
          ),
          const Positioned(
            bottom: 30,
            child: ExitAppInterceptor(),
          ),
        ],
      ),
    );
  }

  /// tab视图内容区域
  List<Widget> bodyWidget() {
    try {
      return appBottomBar
          .map((itemData) => itemData['body'] as Widget)
          .toList();
    } catch (e) {
      throw Exception('appBottomBar变量缺少body参数，errorMsg:$e');
    }
  }

  List<PersistentBottomNavBarItem> _navBarsItems() {
    try {
      return appBottomBar
          .asMap()
          .entries
          .map<PersistentBottomNavBarItem>((item) {
        dynamic itemData = item.value;
        return PersistentBottomNavBarItem(
            icon: Icon(itemData['icon']),
            title: itemData['title'],
            activeColorPrimary: CupertinoColors.activeBlue,
            inactiveColorPrimary: CupertinoColors.systemGrey,
            routeAndNavigatorSettings: RouteAndNavigatorSettings(
                defaultTitle: itemData['title'],
                routes: itemData['routes'],
                initialRoute: '/appMain',
                navigatorObservers: [MyNavigatorObserver()],
                onGenerateRoute: generateRoute));
      }).toList();
    } catch (e) {
      throw Exception('appBottomBar数据缺少参数、或字段类型不匹配, errorMsg:$e');
    }
  }
}
