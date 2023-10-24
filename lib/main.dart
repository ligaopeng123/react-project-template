import 'package:bruno/bruno.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:package_info_plus/package_info_plus.dart';
import 'package:smart_iot_app/components/layouts/basic_layout.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:provider/provider.dart';
import 'package:jh_debug/jh_debug.dart' show DebugMode, jhDebug, jhDebugMain;
import 'package:smart_iot_app/utils/dio/request.dart';
import 'routes/generate_route.dart' show generateRoute;
import 'routes/router_observers.dart';
import 'routes/routes_data.dart'; // 路由配置
import 'providers_config.dart' show providersConfig; // providers配置文件
import 'provider/theme_store.p.dart'; // 全局主题
import 'config/common_config.dart' show commonConfig;
import 'utils/app_setup/index.dart' show appSetupInit;

void main(context) {
  WidgetsFlutterBinding.ensureInitialized();
  jhDebugMain(
    appChild: MultiProvider(
      providers: providersConfig,
      child: const MyApp(),
    ),
    debugMode: DebugMode.inConsole,
    errorCallback: (details) {},
  );
  // SystemChrome.setEnabledSystemUIOverlays([]);
  // SystemChrome.setEnabledSystemUIOverlays([SystemUiOverlay.top]);
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    jhDebug.setGlobalKey = commonConfig.getGlobalKey;
    appSetupInit();
    ScreenUtil.init(
      context,
      designSize: Size(750, 1334),
      // allowFontScaling: false,
    );
    PackageInfo.fromPlatform();
    Request.refreshToke();
    return Consumer<ThemeStore>(
      builder: (context, themeStore, child) {
        return BasicLayout(
          child: MaterialApp(
            navigatorKey: jhDebug.getNavigatorKey,
            showPerformanceOverlay: false,
            locale: const Locale('zh', 'CH'),
            localizationsDelegates: [
              GlobalMaterialLocalizations.delegate,
              GlobalWidgetsLocalizations.delegate,
              GlobalCupertinoLocalizations.delegate,
              BrnLocalizationDelegate.delegate,
            ],
            supportedLocales: const [
              Locale('zh', 'CH'),
              Locale('en', 'US'),
            ],
            theme: themeStore.getTheme,
            initialRoute: initialRoute,
            onGenerateRoute: generateRoute,
            // 路由处理
            // debugShowCheckedModeBanner: false,
            navigatorObservers: [...routersObserver],
          ),
        );
      },
    );
  }
}
