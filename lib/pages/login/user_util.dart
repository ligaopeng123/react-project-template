import './login.m.dart' show LoginMobileData;
import '../../utils/tool/sp_util.dart';

const userInfoKey = 'userInfoKey';

class UserUtil {
  /// 获取缓存用户信息
  static Future<LoginMobileData> getUserInfo() async {
    var cacheData = await SpUtil.getMap(userInfoKey, defValue: {});
    return LoginMobileData.fromJson(cacheData.cast<String, dynamic>());
  }

  /// 保存用户信息
  static Future<void> saveUserInfo(LoginMobileData data) async {
    // data.avatar = data.avatar?.replaceAll(RegExp(r'http://'), 'https://');
    SpUtil.setMapData(userInfoKey, data.toJson());
  }

  /// 清除用户信息缓存
  static Future<bool> cleanUserInfo() async {
    return await SpUtil.remove(userInfoKey);
  }

  /// 获取token
  static Future<String> getToken() async {
    var userInfo = await getUserInfo();
    return userInfo.access_token ?? '';
  }

  /// 获取token
  static Future<String> getTenant() async {
    var userInfo = await getUserInfo();
    return userInfo.tenant ?? '';
  }
  /// 获取headers
  static Future<Map<String, String>> getHeaders() async {
    final token = await UserUtil.getToken();
    final tenant = await UserUtil.getTenant();
    return {'token': token, 'Authorization': 'Bearer $token', 'tenant': tenant};
  }

  /// 设置token
  static Future<void> setToken(String value) async {
    var userInfo = await getUserInfo();
    userInfo.access_token = value;
    saveUserInfo(userInfo);
  }

  /// 清除token
  static Future<void> cleanToKen() async {
    var userInfo = await getUserInfo();
    userInfo.access_token = '';
    saveUserInfo(userInfo);
  }
}
