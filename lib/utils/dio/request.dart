import 'dart:convert';
import 'dart:io';
import 'package:dio/dio.dart';
import 'package:dio/io.dart';
import 'package:smart_iot_app/utils/index.dart';
import '../../config/app_config.dart';
import '../../pages/Login/user_util.dart';
import 'interceptors/header_interceptor.dart';
import 'interceptors/log_interceptor.dart';

Dio _initDio() {
  BaseOptions baseOpts = BaseOptions(
    connectTimeout: const Duration(seconds: 50000),
    responseType: ResponseType.plain, // 数据类型
    receiveDataWhenStatusError: true,
  );
  Dio dioClient = Dio(baseOpts); // 实例化请求，可以传入options参数
  dioClient.interceptors.addAll([
    HeaderInterceptors(),
    LogsInterceptors(),
  ]);

  if (AppConfig.usingProxy) {
    dioClient.httpClientAdapter = IOHttpClientAdapter()
      ..onHttpClientCreate = (HttpClient client) {
        client.findProxy = (uri) {
          // 设置Http代理
          return "PROXY ${AppConfig.proxyAddress}";
        };
        // https证书校验
        client.badCertificateCallback =
            (X509Certificate cert, String host, int port) => true;
        return client;
      };
  }
  return dioClient;
}

/// 底层请求方法说明
///
/// [options] dio请求的配置参数，默认get请求
///
/// [data] 请求参数
///
/// [cancelToken] 请求取消对象
///
///```dart
///CancelToken token = CancelToken(); // 通过CancelToken来取消发起的请求
///
///safeRequest(
///  "/test",
///  data: {"id": 12, "name": "xx"},
///  options: Options(method: "POST"),
/// cancelToken: token,
///);
///
///// 取消请求
///token.cancel("cancelled");
///```
Future<T> safeRequest<T>(
  String url, {
  Object? data,
  Options? options,
  Map<String, dynamic>? queryParameters,
  CancelToken? cancelToken,
}) async {
  try {
    return Request.dioClient
        .request(
          url,
          data: data,
          queryParameters: queryParameters,
          options: options,
          cancelToken: cancelToken,
        )
        .then((data) => jsonDecode(data.data as String) as T);
  } catch (e) {
    rethrow;
  }
}

class Request {
  static Dio dioClient = _initDio();

  /// get请求
  static Future<T> get<T>(
    String url, {
    Options? options,
    Map<String, dynamic>? queryParameters,
  }) async {
    return safeRequest<T>(
      url,
      options: options,
      queryParameters: queryParameters,
    );
  }

  /// post请求
  static Future<T> post<T>(
    String url, {
    Options? options,
    Object? data,
    Map<String, dynamic>? queryParameters,
  }) async {
    return safeRequest<T>(
      url,
      options: options?.copyWith(method: 'POST') ?? Options(method: 'POST'),
      data: data,
      queryParameters: queryParameters,
    );
  }

  /// put请求
  static Future<T> put<T>(
    String url, {
    Options? options,
    Object? data,
    Map<String, dynamic>? queryParameters,
  }) async {
    return safeRequest<T>(
      url,
      options: options?.copyWith(method: 'PUT') ?? Options(method: 'PUT'),
      data: data,
      queryParameters: queryParameters,
    );
  }

  /**
   * 检查返回值状态
   */
  static bool checkStatus(Map<String, dynamic> res) {
    return res['code'] == 200 || res['status'] == 200;
  }

  /**
   * 获取返回值信息
   */
  static String checkMsg(Map<String, dynamic> res) {
    if (!isTextEmpty(res['msg'])) {
      return res['msg'];
    } else if (!isTextEmpty(res['message'])) {
      return res['message'];
    } else if (!isTextEmpty(res['message'])) {
      return res['result'];
    }
    return '';
  }

  /**
   * 刷新token保持长时间登录
   */
  static void refreshToke() async {
    final token = await UserUtil.getToken();
    if (!isTextEmpty(token)) {
      await Request.post(
          '/ubs-iot-authority/api/ubs/iot/auth/token/v1/checkToken?refresh=true');
    }
  }
}
