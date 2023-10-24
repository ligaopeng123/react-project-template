import 'package:dio/dio.dart';
import '../../../utils/index.dart';
import '../../utils/dio/request.dart' show Request;
import './login.m.dart' show LoginMobileCaptcha, LoginMobile, LoginMobileData;

/// 默认配置
const headers = {
  'clientId': 'ubs-iot-ai-app',
  'secret': 'bf0bcea9195f834604bf24e039a9ea7a'
};

/// 请求示例
Future<Object> getDemo() async {
  return Request.get(
    '/api',
    queryParameters: {'key': 'value'},
  );
}

Future<LoginMobileCaptcha> postCaptcha() async {
  final currentVal = await Request.post(
      '/ubs-iot-authority/api/ubs/iot/auth/token/v2/captcha',
      data: {'width': 80, 'height': 40, 'type': 1},
      options: Options(headers: headers));
  return LoginMobileCaptcha(
      image: currentVal['image'], imageId: currentVal['imageId']);
}

Future<LoginMobile?> postLogin(params) async {
  final res = await Request.post(
      '/ubs-iot-authority/api/ubs/iot/auth/token/v1/login',
      data: params,
      options: Options(headers: headers));

  if (res['code'] != 200 && res['code'] != 426)  {
    Tips.warn(Request.checkMsg(res));
    return null;
  }
  final userData = res['data'];
  return LoginMobile(
      code: res['code'],
      data: LoginMobileData(
        access_token: userData['access_token'],
        tenant: userData['tenant'],
        userId: userData['userId'],
        phone: userData['phone'],
        username: userData['username'],
        email: userData['email'],
        realName: userData['realName'],
        tenantName: userData['tenantName'],
        orgName: userData['orgName'],
        orgCode: userData['orgCode'],
        orgId: userData['orgId'],
        roleId: userData['roleId'],
        roleHighestLevel: userData['roleHighestLevel'],
        accountType: userData['accountType'],
        mainAccount: userData['mainAccount'],
      ),
      msg: res['msg']);
}
