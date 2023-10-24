import 'package:dio/dio.dart';
import 'package:jh_debug/jh_debug.dart' show DebugMode, jhDebug, jhDebugMain;
import '../../../config/app_config.dart';
import '../../../utils/index.dart' show SpUtil, Tips;
import '../../../pages/login/user_util.dart' show UserUtil;

/*
 * header拦截器
 */
class HeaderInterceptors extends InterceptorsWrapper {
  bool _isJumpingToLogin = false;

  // 请求拦截
  @override
  onRequest(RequestOptions options, handler) async {
    options.connectTimeout = const Duration(seconds: 15000);
    if (options.uri?.toString()?.startsWith('http') == true) {
      return handler.next(options);
    }
    final _baseUrl = await AppConfig.serverIp();
    // 设置baseUrl
    options.baseUrl = _baseUrl;
    final headers = await UserUtil.getHeaders();
    options.headers?.addAll(headers);
    return handler.next(options);
  }

  // 响应拦截
  @override
  onResponse(response, handler) {
    // Do something with response data
    _isJumpingToLogin = false;
    return handler.next(response); // continue
  }

  // 请求失败拦截
  @override
  onError(err, handler) async {
    if (err.response?.statusCode == 401 && _isJumpingToLogin == false) {
      Tips.info('长时间未登录，请重新登录');
      _isJumpingToLogin = true;
      jhDebug.getNavigatorKey.currentState!
          .pushNamedAndRemoveUntil(
            '/login',
            (route) => false,
          )
          .then((value) {});
    } else {
      if ('$err'.indexOf('[connection error]') != -1) {
        Tips.info('网络连接失败，请检查网络后重试');
      }
    }
    return handler.next(err); //continue
  }
}
