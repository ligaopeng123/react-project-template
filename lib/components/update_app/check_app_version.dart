import 'package:flutter/foundation.dart';
import '../../config/app_config.dart' show AppConfig;
import '../../config/common_config.dart' show commonConfig;
import '../../utils/index.dart'
    show PermUtil, SpUtil, compareVersion, forceUpgrade;
import 'package:flutter/material.dart';
import 'package:package_info_plus/package_info_plus.dart';
import '../../services/common_service.dart'; // 接口
import './update_app.dart';
import '../../config/app_env.dart' show appEnv;
import 'app_version.dart';

bool _showFlag = false;
const String spKey = 'checkAppVerTime'; // 缓存key
const String spWebKey = 'checkAppVerWeb';

Future<AppVersion> getAppVersion() async {
  // TODO:获取最新APP版本, 自定义getNewVersion接口获取
  var resData = await getNewVersion();
  PackageInfo packageInfo = await PackageInfo.fromPlatform();
  String webVersion = await SpUtil.getData<String>(
    spWebKey,
    defValue: packageInfo.version,
  );
  // APP版本号对比检查
  return AppVersion.fromJson({
    "forceUpdate": forceUpgrade(resData.version, packageInfo.version),
    "upgrade": compareVersion(resData.version, packageInfo.version),
    "newVersion": resData.version,
    "currentVersion": packageInfo.version,
    "webVersion": webVersion,
    "webUpgrade": compareVersion(resData.version, webVersion),
    "versionFeat": resData.info
  });
}

/// 检查最新版本APP更新
///
/// [seconds] app多久检查更新，默认12小时
///
/// [forceUpdate] 是否强制更新, 直接显示弹层，默认false

checkAppVersion({int seconds = 60 * 60 * 12, bool forceUpdate = false}) async {
  // 是否需要更新
  final appVersion = await getAppVersion();
  if (kIsWeb) {
    if (appVersion.webUpgrade) {
      showAppVersionDialog(appVersion, seconds: 2, forceUpdate: forceUpdate);
    } else {
      await SpUtil.setData(spWebKey, appVersion.newVersion);
    }
  } else {
    if (!AppConfig.isUpdateApp) return;
    if (!(await PermUtil.storagePerm())) return; // 权限申请
    showAppVersionDialog(appVersion,
        seconds: seconds, forceUpdate: forceUpdate);
  }
}

showAppVersionDialog(appVersion,
    {int seconds = 60 * 60 * 12, bool forceUpdate = false}) async {
  try {
    if (_showFlag) return;
    DateTime newTime = DateTime.now(); // 当前时间
    String oldTimeStr = await SpUtil.getData<String>(
      spKey,
      defValue: DateTime.now().add(const Duration(days: -10)).toString(),
    );

    DateTime oldTime = DateTime.parse(oldTimeStr);
    Duration diffTime = newTime.difference(oldTime);

    var _forceUpdate = forceUpdate == true ? forceUpdate : appVersion.forceUpdate;
    // 指定时间内不在触发检查更新APP
    if (!_forceUpdate) {
      if (diffTime.inSeconds < seconds) {
        _showFlag = false;
        return;
      }
    }

    // TODO:获取最新APP版本, 自定义getNewVersion接口获取
    var showUpgrade = kIsWeb ? appVersion.webUpgrade : appVersion.upgrade;
    // APP版本号对比检查
    if (!showUpgrade && !_forceUpdate) {
      return;
    }
    _showFlag = true;
    // 弹层更新
    // ignore: use_build_context_synchronously
    showGeneralDialog(
      context: commonConfig.getGlobalContext,
      // 是否点击其他区域消失
      barrierDismissible: !_forceUpdate,
      barrierLabel: "",
      barrierColor: Colors.black54,
      // 遮罩层背景色
      transitionDuration: const Duration(milliseconds: 150),
      // 弹出的过渡时长
      transitionBuilder: (
        BuildContext context,
        Animation<double> animation,
        Animation<double> secondaryAnimation,
        Widget child,
      ) {
        // 显示的动画组件
        return ScaleTransition(
          scale: Tween<double>(begin: 0, end: 1).animate(animation),
          child: child,
        );
      },
      pageBuilder: (context, animation, secondaryAnimation) {
        return Dialog(
          backgroundColor: Colors.transparent, // 背景颜色
          child: UpdateAppVersion(
            // TODO: 传入新版本APP相关参数、版本号、更新内容、下载地址等
            version: appVersion.newVersion, // 版本号
            info: (appVersion.versionFeat as List).cast<String>(), // 更新内容介绍
            // ios是苹果应用商店地址
            iosUrl: appEnv.appHelper['iosUrl'] as String,
            androidUrl: appEnv.appHelper['androidUrl'] as String,
          ),
        );
      },
    ).then((v) {
      _showFlag = false;
    });
    await SpUtil.setData(spKey, newTime.toString());
    await SpUtil.setData(spWebKey, appVersion.newVersion);
  } catch (e) {
    _showFlag = false;
  }
}
