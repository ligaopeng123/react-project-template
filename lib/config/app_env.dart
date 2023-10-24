import 'dart:io';

import 'package:flutter/foundation.dart';

import '../utils/index.dart' show LogUtil;

/// 环境类型
enum ENV {
  DEV,
  TEST,
  PRE,
  PROD,
}

// dio请求前缀
final Map<ENV, String> _baseUrl = {
  ENV.DEV: 'https://ai-api-test.sany.com.cn',
  ENV.TEST: 'https://ai-api-test.sany.com.cn',
  ENV.PRE: 'https://ub-xingluo-m.sany.com.cn',
  ENV.PROD: 'https://ub-xingluo-m.sany.com.cn',
};

final Map<ENV, Map<String, String>> _appHelper = {
  ENV.DEV: {
    'androidUrl':
        'https://ubsense-iot-1254375538.cos.ap-beijing.myqcloud.com/ub-web/apk-test/xingluo-latest.apk',
    'iosUrl': 'itms-apps://itunes.apple.com/cn/app/id414478124?mt=8',
    'appVersionApi':
        'https://ub-xingluo-test.sany.com.cn/appInfoApi/APP_VERSION_LATEST/?appId=app_c24ec5fb0b7bd311'
  },
  ENV.TEST: {
    'androidUrl':
        'https://ubsense-iot-1254375538.cos.ap-beijing.myqcloud.com/ub-web/apk-test/xingluo-latest.apk',
    'iosUrl': 'itms-apps://itunes.apple.com/cn/app/id414478124?mt=8',
    'appVersionApi':
        'https://ub-xingluo-test.sany.com.cn/appInfoApi/APP_VERSION_LATEST/?appId=app_c24ec5fb0b7bd311',
  },
  ENV.PRE: {
    'androidUrl':
        'https://ubsense-iot-1254375538.cos.ap-beijing.myqcloud.com/ub-web/apk/xingluo-latest.apk',
    'iosUrl': 'itms-apps://itunes.apple.com/cn/app/id414478124?mt=8',
    'appVersionApi':
        'https://ub-xingluo-m.sany.com.cn/appInfoApi/APP_VERSION_LATEST/?appId=app_f59fe4b2c2dd53f9'
  },
  ENV.PROD: {
    'androidUrl':
        'https://ubsense-iot-1254375538.cos.ap-beijing.myqcloud.com/ub-web/apk/xingluo-latest.apk',
    'iosUrl': 'itms-apps://itunes.apple.com/cn/app/id414478124?mt=8',
    'appVersionApi':
        'https://ub-xingluo-m.sany.com.cn/appInfoApi/APP_VERSION_LATEST/?appId=app_f59fe4b2c2dd53f9'
  },
};

class AppEnv {
  /// 当前环境变量
  ENV currentEnv = ENV.DEV;

  /// 安卓渠道名称
  String _androidChannel = '';

  void init() {
    const envStr = String.fromEnvironment("INIT_ENV", defaultValue: "prod");
    if (!kIsWeb && Platform.isAndroid) {
      _androidChannel =
          const String.fromEnvironment("ANDROID_CHANNEL", defaultValue: "");
    }
    switch (envStr) {
      case "dev":
        currentEnv = ENV.DEV;
        break;
      case "test":
        currentEnv = ENV.TEST;
        break;
      case "pre":
        currentEnv = ENV.PRE;
        break;
      case "prod":
        currentEnv = ENV.PROD;
        break;
      default:
        currentEnv = ENV.PROD;
    }
    LogUtil.d('当前环境$currentEnv');
  }

  /// 获取app渠道名称
  String getAppChannel() => _androidChannel;

  /// 设置当前环境
  set setEnv(ENV env) {
    currentEnv = env;
  }

  /// 获取url前缀
  String get baseUrl {
    return _baseUrl[currentEnv] ?? '';
  }

  Map<String, String> get appHelper {
    return _appHelper[currentEnv] ?? {};
  }
}

AppEnv appEnv = AppEnv();
